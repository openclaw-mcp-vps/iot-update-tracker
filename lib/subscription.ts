import { createHmac, timingSafeEqual } from "crypto";

import { type NextRequest, NextResponse } from "next/server";

import { listSubscriptions, saveSubscriptions } from "@/lib/storage";
import type { SubscriptionRecord } from "@/lib/types";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const ACCESS_COOKIE_NAME = "iot_update_tracker_access";

function getSigningSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET || "dev-only-secret-change-this";
}

function sign(value: string) {
  return createHmac("sha256", getSigningSecret()).update(value).digest("hex");
}

export function createAccessToken(email: string) {
  const payload = `${email.toLowerCase()}|${Date.now()}`;
  const signature = sign(payload);

  return Buffer.from(`${payload}|${signature}`, "utf8").toString("base64url");
}

export function verifyAccessToken(token?: string | null) {
  if (!token) {
    return { valid: false as const };
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [email, timestampString, signature] = decoded.split("|");

    if (!email || !timestampString || !signature) {
      return { valid: false as const };
    }

    const payload = `${email}|${timestampString}`;
    const expected = Buffer.from(sign(payload), "utf8");
    const actual = Buffer.from(signature, "utf8");

    if (expected.length !== actual.length) {
      return { valid: false as const };
    }

    if (!timingSafeEqual(expected, actual)) {
      return { valid: false as const };
    }

    return { valid: true as const, email };
  } catch {
    return { valid: false as const };
  }
}

export function hasAccessFromRequest(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  return verifyAccessToken(token).valid;
}

export function grantAccess(response: NextResponse, email: string) {
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: createAccessToken(email),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS
  });

  return response;
}

export async function markSubscriptionPaid(
  email: string,
  source: SubscriptionRecord["source"],
  sourceReference: string
) {
  const normalizedEmail = email.trim().toLowerCase();
  const records = await listSubscriptions();

  if (
    records.some(
      (record) =>
        record.email.toLowerCase() === normalizedEmail &&
        record.sourceReference === sourceReference
    )
  ) {
    return;
  }

  records.push({
    email: normalizedEmail,
    paidAt: new Date().toISOString(),
    source,
    sourceReference
  });

  await saveSubscriptions(records);
}

export async function isPaidSubscriber(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const records = await listSubscriptions();

  return records.some((record) => record.email.toLowerCase() === normalizedEmail);
}

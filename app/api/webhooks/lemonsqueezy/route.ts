import { createHmac, timingSafeEqual } from "crypto";

import { NextResponse } from "next/server";

import { markSubscriptionPaid } from "@/lib/subscription";

interface LemonWebhookPayload {
  meta?: {
    event_name?: string;
    custom_data?: {
      user_email?: string;
      email?: string;
    };
  };
  data?: {
    id?: string;
    attributes?: {
      user_email?: string;
    };
  };
}

function validateSignature(rawBody: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const actualBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function POST(request: Request) {
  const signature = request.headers.get("x-signature");
  const body = await request.text();
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (secret && signature && !validateSignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid LemonSqueezy signature" }, { status: 400 });
  }

  const payload = JSON.parse(body) as LemonWebhookPayload;

  const eventName = payload.meta?.event_name ?? "";

  if (eventName.includes("order") || eventName.includes("subscription")) {
    const email =
      payload.data?.attributes?.user_email ||
      payload.meta?.custom_data?.user_email ||
      payload.meta?.custom_data?.email;

    if (email) {
      await markSubscriptionPaid(email, "lemonsqueezy", payload.data?.id ?? eventName);
    }
  }

  return NextResponse.json({ received: true });
}

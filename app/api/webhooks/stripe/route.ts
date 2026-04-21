import { createHmac, timingSafeEqual } from "crypto";

import { NextResponse } from "next/server";

import { markSubscriptionPaid } from "@/lib/subscription";

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object?: {
      id?: string;
      customer_email?: string;
      customer_details?: {
        email?: string;
      };
    };
  };
}

function verifyStripeSignature(payload: string, signatureHeader: string, secret: string) {
  const elements = signatureHeader.split(",");
  const timestamp = elements.find((element) => element.startsWith("t="))?.slice(2);
  const signatures = elements
    .filter((element) => element.startsWith("v1="))
    .map((element) => element.slice(3));

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");

  return signatures.some((signature) => {
    const expectedBuffer = Buffer.from(expected, "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, signatureBuffer);
  });
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const payload = await request.text();

  if (!verifyStripeSignature(payload, signature, secret)) {
    return NextResponse.json({ error: "Invalid Stripe signature" }, { status: 400 });
  }

  const event = JSON.parse(payload) as StripeEvent;

  if (
    event.type === "checkout.session.completed" ||
    event.type === "payment_link.payment_completed"
  ) {
    const email =
      event.data.object?.customer_email || event.data.object?.customer_details?.email || "";

    if (email) {
      await markSubscriptionPaid(email, "stripe", event.data.object?.id || event.id);
    }
  }

  return NextResponse.json({ received: true });
}

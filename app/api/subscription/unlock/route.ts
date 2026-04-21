import { NextResponse } from "next/server";
import { z } from "zod";

import { grantAccess, isPaidSubscriber } from "@/lib/subscription";

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const paid = await isPaidSubscriber(parsed.data.email);
  const devBypass =
    process.env.NODE_ENV !== "production" && process.env.ALLOW_DEV_UNLOCK === "true";

  if (!paid && !devBypass) {
    return NextResponse.json(
      {
        error:
          "No active subscription found for that email yet. If you just paid, wait a minute for webhook processing and retry."
      },
      { status: 403 }
    );
  }

  const response = NextResponse.json({ ok: true });
  grantAccess(response, parsed.data.email);

  return response;
}

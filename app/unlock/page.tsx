import Link from "next/link";

import { UnlockForm } from "@/components/UnlockForm";

export default function UnlockPage() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/30">
        <h1 className="text-2xl font-semibold text-zinc-100">Unlock your workspace</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Enter the email used at checkout. Access is granted with a secure cookie after verification.
        </p>

        <div className="mt-5">
          <UnlockForm />
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Need a subscription?{" "}
          <a href={stripePaymentLink} className="text-emerald-300 hover:text-emerald-200">
            Open Stripe checkout
          </a>
          {" "}or{" "}
          <Link href="/" className="text-zinc-300 hover:text-zinc-100">
            return to pricing
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

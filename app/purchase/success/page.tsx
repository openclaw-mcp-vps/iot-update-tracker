import Link from "next/link";

export default function PurchaseSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-7">
        <h1 className="text-2xl font-semibold text-zinc-100">Payment received</h1>
        <p className="mt-3 text-sm text-zinc-300">
          If your payment has cleared, open the unlock screen and enter the same checkout email. The webhook will mark your subscription and grant access to the tracker dashboard.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/unlock"
            className="inline-flex h-10 items-center rounded-md bg-emerald-500 px-4 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Unlock Access
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md border border-zinc-700 px-4 text-sm font-semibold text-zinc-100 hover:bg-zinc-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

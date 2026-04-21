import Link from "next/link";
import { CheckCircle2, ChevronRight, Radar, ShieldAlert, ShieldCheck, Timer } from "lucide-react";

const faqs = [
  {
    question: "How does discovery work in locked-down corporate networks?",
    answer:
      "You can run segmented scans by VLAN or subnet and manually register devices that sit behind ACL boundaries. The tracker merges both sources into one risk view."
  },
  {
    question: "How quickly are new vulnerabilities reflected?",
    answer:
      "The monitor checks configured feeds on a recurring schedule and re-evaluates every tracked firmware version against known CVEs and vendor patch baselines."
  },
  {
    question: "Can MSPs separate clients and sites?",
    answer:
      "Yes. Device records can be grouped by location and scanned in batches, which gives MSP teams a single queue of remediation actions across all managed environments."
  },
  {
    question: "What happens after purchase?",
    answer:
      "Checkout runs on Stripe hosted payment pages. Once payment is confirmed through webhook, enter your checkout email in the unlock screen and access is granted by secure cookie."
  }
];

export default function HomePage() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

  return (
    <main>
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
              <Radar className="h-3.5 w-3.5 text-emerald-300" />
              Security tools for teams with 50+ IoT endpoints
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl">
              Track security updates for your IoT devices before attackers do.
            </h1>
            <p className="mt-5 max-w-xl text-base text-zinc-300 sm:text-lg">
              IoT Update Tracker continuously discovers routers, cameras, smart-home panels, and industrial controllers, then maps firmware versions to known CVEs and patch releases.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={stripePaymentLink}
                className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Buy Access - $9/mo
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/unlock"
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-700 px-6 text-sm font-semibold text-zinc-200 hover:bg-zinc-800"
              >
                I already purchased
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">What you monitor</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <ShieldAlert className="mt-0.5 h-4 w-4 text-red-300" />
                Firmware versions currently exposed to known CVEs
              </li>
              <li className="flex items-start gap-2">
                <Timer className="mt-0.5 h-4 w-4 text-amber-300" />
                Devices lagging behind vendor security patch releases
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                Remediation playbooks to close risk quickly
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-zinc-100">The problem teams face</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
              <h3 className="text-sm font-semibold text-zinc-100">Patch blind spots</h3>
              <p className="mt-2 text-sm text-zinc-300">
                IoT devices are often installed once and forgotten. Firmware updates never reach operations teams until a breach happens.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
              <h3 className="text-sm font-semibold text-zinc-100">Daily CVE churn</h3>
              <p className="mt-2 text-sm text-zinc-300">
                New vulnerabilities are published constantly. Manual checks across dozens of vendors do not scale for small security teams.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
              <h3 className="text-sm font-semibold text-zinc-100">No remediation context</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Even when risk is discovered, teams need clear upgrade paths and compensating controls to reduce exposure immediately.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-zinc-100">How IoT Update Tracker solves it</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
              <h3 className="text-sm font-semibold text-zinc-100">1. Discover devices continuously</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Scan by subnet and maintain a live inventory across routers, cameras, smart systems, and industrial endpoints.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
              <h3 className="text-sm font-semibold text-zinc-100">2. Match firmware to vulnerabilities</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Every firmware version is checked against known CVE patterns and latest vendor patch baselines.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
              <h3 className="text-sm font-semibold text-zinc-100">3. Send actionable alerts</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Security alerts include severity, affected CVEs, and clear remediation guidance so teams can prioritize quickly.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-zinc-100">Pricing</h2>
          <div className="mt-6 max-w-md rounded-2xl border border-emerald-900 bg-emerald-950/20 p-6">
            <p className="text-sm uppercase tracking-wide text-emerald-300">Security-Tools Plan</p>
            <p className="mt-3 text-4xl font-semibold text-zinc-100">
              $9<span className="text-base font-normal text-zinc-400">/month</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Unlimited device inventory tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                CVE exposure scoring and patch guidance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Automated scan and monitoring workflow
              </li>
            </ul>
            <a
              href={stripePaymentLink}
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Start Protecting Devices
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-zinc-100">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
                <h3 className="text-sm font-semibold text-zinc-100">{faq.question}</h3>
                <p className="mt-2 text-sm text-zinc-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { AcknowledgeAlertButton } from "@/components/AcknowledgeAlertButton";
import { AppHeader } from "@/components/AppHeader";
import { VulnerabilityAlert } from "@/components/VulnerabilityAlert";
import { listAlerts } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function AlertsPage() {
  const alerts = await listAlerts();

  return (
    <main className="min-h-screen">
      <AppHeader />

      <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-2xl font-semibold text-zinc-100">Security Alerts</h1>
          <p className="text-sm text-zinc-400">
            Prioritized remediation queue for known firmware vulnerabilities and missing patches.
          </p>
        </section>

        {alerts.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-8 text-center text-sm text-zinc-400">
            No alerts detected yet. Trigger a scan to generate a current risk baseline.
          </div>
        ) : (
          <section className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="space-y-2">
                <VulnerabilityAlert alert={alert} />
                {!alert.acknowledged ? <AcknowledgeAlertButton alertId={alert.id} /> : null}
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

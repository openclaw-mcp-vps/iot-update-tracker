import { TriangleAlert } from "lucide-react";

import { AppHeader } from "@/components/AppHeader";
import { NetworkScanPanel } from "@/components/NetworkScanPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeBackgroundJobs } from "@/lib/background-jobs";
import { getDashboardSnapshot } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  initializeBackgroundJobs();
  const snapshot = await getDashboardSnapshot();
  const recentAlerts = snapshot.alerts.slice(0, 5);

  return (
    <main className="min-h-screen">
      <AppHeader />

      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400">Total Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-100">{snapshot.metrics.totalDevices}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400">Vulnerable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-red-300">{snapshot.metrics.vulnerableDevices}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400">Outdated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-amber-300">{snapshot.metrics.outdatedDevices}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400">Avg Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-zinc-100">{snapshot.metrics.averageExposure}/100</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <NetworkScanPanel />
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {recentAlerts.length === 0 ? (
                <p className="text-sm text-zinc-400">No alerts yet. Run a scan to begin monitoring exposure.</p>
              ) : (
                <ul className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <li
                      key={alert.id}
                      className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-zinc-100">{alert.deviceName}</p>
                        <p className="mt-1 text-xs text-zinc-400">{alert.title}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-md border border-red-900 bg-red-950/40 px-2 py-1 text-xs text-red-200">
                        <TriangleAlert className="h-3.5 w-3.5" />
                        {alert.severity.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

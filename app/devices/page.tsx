import { AddDeviceDialog } from "@/components/AddDeviceDialog";
import { AppHeader } from "@/components/AppHeader";
import { DeviceCard } from "@/components/DeviceCard";
import { listDevices } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function DevicesPage() {
  const devices = await listDevices();

  return (
    <main className="min-h-screen">
      <AppHeader />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">Device Inventory</h1>
            <p className="text-sm text-zinc-400">
              Track firmware posture and vulnerability exposure for all monitored IoT endpoints.
            </p>
          </div>
          <AddDeviceDialog />
        </section>

        {devices.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-8 text-center text-sm text-zinc-400">
            No devices are registered yet. Add a device manually or run a network scan from the dashboard.
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

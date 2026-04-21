import { AlertTriangle, Cpu, Network, ShieldCheck, ShieldX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IoTDevice } from "@/lib/types";

function statusBadge(status: IoTDevice["status"]) {
  switch (status) {
    case "secure":
      return <Badge variant="default">Secure</Badge>;
    case "outdated":
      return <Badge variant="outline">Outdated</Badge>;
    case "vulnerable":
      return <Badge variant="destructive">Vulnerable</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

export function DeviceCard({ device }: { device: IoTDevice }) {
  const riskIcon =
    device.status === "secure" ? (
      <ShieldCheck className="h-4 w-4 text-emerald-300" />
    ) : (
      <ShieldX className="h-4 w-4 text-red-300" />
    );

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <CardTitle className="text-base">{device.name}</CardTitle>
          {statusBadge(device.status)}
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Cpu className="h-3.5 w-3.5" />
          {device.vendor} {device.model}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-zinc-300">
        <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">
          <span className="flex items-center gap-2 text-xs text-zinc-400">
            <Network className="h-3.5 w-3.5" />
            Address
          </span>
          <code className="text-xs text-zinc-200">{device.ipAddress}</code>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2">
            <p className="text-zinc-500">Firmware</p>
            <p className="mt-1 font-medium text-zinc-100">{device.firmwareVersion}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2">
            <p className="text-zinc-500">Latest</p>
            <p className="mt-1 font-medium text-zinc-100">{device.latestFirmwareVersion}</p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3">
          <p className="mb-1 text-xs text-zinc-500">Exposure Score</p>
          <p className="text-lg font-semibold text-zinc-100">{device.exposureScore}/100</p>
        </div>

        {device.vulnerabilities.length > 0 ? (
          <div className="rounded-lg border border-red-950 bg-red-950/20 p-3">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-red-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              CVE Exposure ({device.vulnerabilities.length})
            </p>
            <ul className="space-y-1 text-xs text-red-200">
              {device.vulnerabilities.slice(0, 3).map((vulnerability) => (
                <li key={vulnerability.id}>{vulnerability.id}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

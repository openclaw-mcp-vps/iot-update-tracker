import { NextResponse } from "next/server";
import { z } from "zod";

import { initializeBackgroundJobs } from "@/lib/background-jobs";
import { discoverDevices } from "@/lib/device-scanner";
import { runMonitoringCycle } from "@/lib/monitor";
import { listDevices, saveDevices } from "@/lib/storage";

const scanSchema = z.object({
  networkRange: z.string().min(3).max(64)
});

export async function POST(request: Request) {
  initializeBackgroundJobs();

  const payload = await request.json().catch(() => ({ networkRange: "192.168.1.0/24" }));
  const parsed = scanSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid scan request" }, { status: 400 });
  }

  const scannedDevices = await discoverDevices(parsed.data.networkRange);
  const existing = await listDevices();

  const map = new Map(existing.map((device) => [`${device.ipAddress}:${device.macAddress}`, device]));

  for (const scannedDevice of scannedDevices) {
    map.set(`${scannedDevice.ipAddress}:${scannedDevice.macAddress}`, scannedDevice);
  }

  const merged = Array.from(map.values()).sort((a, b) =>
    a.ipAddress.localeCompare(b.ipAddress, undefined, { numeric: true })
  );

  await saveDevices(merged);

  const monitoringResult = await runMonitoringCycle();
  const vulnerableCount = merged.filter((device) => device.status === "vulnerable").length;

  return NextResponse.json({
    message: `Scan complete. ${merged.length} devices tracked, ${vulnerableCount} currently vulnerable, ${monitoringResult.newAlerts} new alerts created.`,
    summary: {
      discovered: merged.length,
      vulnerable: vulnerableCount,
      newAlerts: monitoringResult.newAlerts
    }
  });
}

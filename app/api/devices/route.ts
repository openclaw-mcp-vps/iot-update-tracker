import { randomUUID } from "crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { initializeBackgroundJobs } from "@/lib/background-jobs";
import { listDevices, saveDevices } from "@/lib/storage";
import type { IoTDevice } from "@/lib/types";
import { assessDeviceRisk } from "@/lib/vulnerability-db";

const createDeviceSchema = z.object({
  name: z.string().min(2),
  vendor: z.string().min(2),
  model: z.string().min(2),
  category: z.enum(["router", "camera", "smart-home", "industrial", "sensor", "other"]),
  ipAddress: z.string().min(7),
  macAddress: z.string().min(6),
  firmwareVersion: z.string().min(1)
});

export async function GET() {
  initializeBackgroundJobs();
  const devices = await listDevices();

  return NextResponse.json({ devices });
}

export async function POST(request: Request) {
  initializeBackgroundJobs();

  const payload = await request.json();
  const parsed = createDeviceSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid device payload",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const risk = await assessDeviceRisk(parsed.data);

  const device: IoTDevice = {
    id: randomUUID(),
    name: parsed.data.name,
    vendor: parsed.data.vendor,
    model: parsed.data.model,
    category: parsed.data.category,
    ipAddress: parsed.data.ipAddress,
    macAddress: parsed.data.macAddress,
    firmwareVersion: parsed.data.firmwareVersion,
    latestFirmwareVersion: risk.latestFirmwareVersion,
    status: risk.status,
    exposureScore: risk.exposureScore,
    vulnerabilities: risk.vulnerabilities,
    remediation: risk.remediation,
    lastSeen: new Date().toISOString(),
    lastScanned: new Date().toISOString()
  };

  const devices = await listDevices();
  const deduped = devices.filter((entry) => entry.ipAddress !== device.ipAddress);

  await saveDevices([device, ...deduped]);

  return NextResponse.json({ device }, { status: 201 });
}

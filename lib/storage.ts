import { promises as fs } from "fs";
import path from "path";

import type { IoTDevice, SecurityAlert, SubscriptionRecord } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DEVICES_FILE = path.join(DATA_DIR, "devices.json");
const ALERTS_FILE = path.join(DATA_DIR, "alerts.json");
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, "subscriptions.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeJson(filePath, fallback);
      return fallback;
    }

    throw error;
  }
}

async function writeJson<T>(filePath: string, value: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function listDevices(): Promise<IoTDevice[]> {
  return readJson<IoTDevice[]>(DEVICES_FILE, []);
}

export async function saveDevices(devices: IoTDevice[]): Promise<void> {
  await writeJson(DEVICES_FILE, devices);
}

export async function listAlerts(): Promise<SecurityAlert[]> {
  return readJson<SecurityAlert[]>(ALERTS_FILE, []);
}

export async function saveAlerts(alerts: SecurityAlert[]): Promise<void> {
  await writeJson(ALERTS_FILE, alerts);
}

export async function listSubscriptions(): Promise<SubscriptionRecord[]> {
  return readJson<SubscriptionRecord[]>(SUBSCRIPTIONS_FILE, []);
}

export async function saveSubscriptions(records: SubscriptionRecord[]): Promise<void> {
  await writeJson(SUBSCRIPTIONS_FILE, records);
}

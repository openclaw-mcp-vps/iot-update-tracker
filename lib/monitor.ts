import { randomUUID } from "crypto";

import { sendAlertDigest } from "@/lib/email-alerts";
import { listAlerts, listDevices, saveAlerts, saveDevices } from "@/lib/storage";
import type { IoTDevice, SecurityAlert, Severity } from "@/lib/types";
import { assessDeviceRisk } from "@/lib/vulnerability-db";

function highestSeverity(vulnerabilities: IoTDevice["vulnerabilities"]): Severity {
  if (vulnerabilities.some((entry) => entry.severity === "critical")) {
    return "critical";
  }

  if (vulnerabilities.some((entry) => entry.severity === "high")) {
    return "high";
  }

  if (vulnerabilities.some((entry) => entry.severity === "medium")) {
    return "medium";
  }

  return "low";
}

function buildAlert(device: IoTDevice): SecurityAlert {
  return {
    id: randomUUID(),
    deviceId: device.id,
    deviceName: device.name,
    createdAt: new Date().toISOString(),
    severity: highestSeverity(device.vulnerabilities),
    title:
      device.vulnerabilities.length > 0
        ? `${device.vulnerabilities.length} known vulnerabilities require patching`
        : "Firmware is behind latest security release",
    description:
      device.vulnerabilities.length > 0
        ? `Device firmware ${device.firmwareVersion} is exposed to published CVEs.`
        : `Device firmware ${device.firmwareVersion} is older than ${device.latestFirmwareVersion}.`,
    remediation: device.remediation,
    acknowledged: false,
    cves: device.vulnerabilities.map((entry) => entry.id)
  };
}

export async function runMonitoringCycle() {
  const devices = await listDevices();

  if (devices.length === 0) {
    return { updatedDevices: 0, newAlerts: 0 };
  }

  const alerts = await listAlerts();
  const existingUnacknowledged = new Set(
    alerts.filter((alert) => !alert.acknowledged).map((alert) => `${alert.deviceId}:${alert.title}`)
  );

  const updatedDevices: IoTDevice[] = [];
  const newAlerts: SecurityAlert[] = [];

  for (const device of devices) {
    const assessment = await assessDeviceRisk(device);

    const updatedDevice: IoTDevice = {
      ...device,
      latestFirmwareVersion: assessment.latestFirmwareVersion,
      status: assessment.status,
      exposureScore: assessment.exposureScore,
      vulnerabilities: assessment.vulnerabilities,
      remediation: assessment.remediation,
      lastSeen: new Date().toISOString(),
      lastScanned: new Date().toISOString()
    };

    if (updatedDevice.status === "vulnerable" || updatedDevice.status === "outdated") {
      const candidateAlert = buildAlert(updatedDevice);
      const dedupeKey = `${candidateAlert.deviceId}:${candidateAlert.title}`;

      if (!existingUnacknowledged.has(dedupeKey)) {
        newAlerts.push(candidateAlert);
        existingUnacknowledged.add(dedupeKey);
      }
    }

    updatedDevices.push(updatedDevice);
  }

  await saveDevices(updatedDevices);

  if (newAlerts.length > 0) {
    await saveAlerts([...
      newAlerts,
      ...alerts
    ]);

    await sendAlertDigest(newAlerts);
  }

  return {
    updatedDevices: updatedDevices.length,
    newAlerts: newAlerts.length
  };
}

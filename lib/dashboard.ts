import { listAlerts, listDevices } from "@/lib/storage";

export async function getDashboardSnapshot() {
  const [devices, alerts] = await Promise.all([listDevices(), listAlerts()]);

  const vulnerableDevices = devices.filter((device) => device.status === "vulnerable").length;
  const outdatedDevices = devices.filter((device) => device.status === "outdated").length;
  const secureDevices = devices.filter((device) => device.status === "secure").length;

  const criticalAlerts = alerts.filter(
    (alert) => !alert.acknowledged && alert.severity === "critical"
  ).length;

  const unacknowledgedAlerts = alerts.filter((alert) => !alert.acknowledged).length;

  const averageExposure =
    devices.length > 0
      ? Math.round(
          devices.reduce((sum, device) => sum + device.exposureScore, 0) / devices.length
        )
      : 0;

  return {
    devices,
    alerts,
    metrics: {
      totalDevices: devices.length,
      vulnerableDevices,
      outdatedDevices,
      secureDevices,
      criticalAlerts,
      unacknowledgedAlerts,
      averageExposure
    }
  };
}

export type DeviceCategory =
  | "router"
  | "camera"
  | "smart-home"
  | "industrial"
  | "sensor"
  | "other";

export type Severity = "critical" | "high" | "medium" | "low";

export type DeviceStatus = "secure" | "outdated" | "vulnerable" | "unknown";

export interface Vulnerability {
  id: string;
  severity: Severity;
  summary: string;
  fixedIn: string;
  reference: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  vendor: string;
  model: string;
  category: DeviceCategory;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  latestFirmwareVersion: string;
  status: DeviceStatus;
  exposureScore: number;
  vulnerabilities: Vulnerability[];
  remediation: string;
  lastSeen: string;
  lastScanned: string;
}

export interface SecurityAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  createdAt: string;
  severity: Severity;
  title: string;
  description: string;
  remediation: string;
  acknowledged: boolean;
  cves: string[];
}

export interface SubscriptionRecord {
  email: string;
  paidAt: string;
  source: "stripe" | "lemonsqueezy";
  sourceReference: string;
}

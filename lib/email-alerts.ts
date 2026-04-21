import nodemailer from "nodemailer";

import type { SecurityAlert } from "@/lib/types";

function resolveRecipients() {
  const env = process.env.SECURITY_ALERT_RECIPIENTS;

  if (!env) {
    return [];
  }

  return env
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT) {
    return nodemailer.createTransport({ jsonTransport: true });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        : undefined
  });
}

export async function sendAlertDigest(alerts: SecurityAlert[]) {
  const recipients = resolveRecipients();

  if (alerts.length === 0 || recipients.length === 0) {
    return;
  }

  const transporter = buildTransport();

  const criticalCount = alerts.filter((alert) => alert.severity === "critical").length;
  const highCount = alerts.filter((alert) => alert.severity === "high").length;

  const body = [
    "New IoT security update alerts were generated:",
    "",
    `Critical: ${criticalCount}`,
    `High: ${highCount}`,
    "",
    ...alerts.map(
      (alert) =>
        `- [${alert.severity.toUpperCase()}] ${alert.deviceName}: ${alert.title} (${alert.cves.join(", ") || "No CVE ID"
        })`
    ),
    "",
    "Open the dashboard to review remediation guidance."
  ].join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "iot-update-tracker@localhost",
    to: recipients.join(","),
    subject: `[IoT Update Tracker] ${alerts.length} new security alert${alerts.length > 1 ? "s" : ""}`,
    text: body
  });
}

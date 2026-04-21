import { NextResponse } from "next/server";
import { z } from "zod";

import { listAlerts, saveAlerts } from "@/lib/storage";

const acknowledgeSchema = z.object({
  alertId: z.string().min(1)
});

export async function GET() {
  const alerts = await listAlerts();
  return NextResponse.json({ alerts });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const parsed = acknowledgeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const alerts = await listAlerts();
  const updatedAlerts = alerts.map((alert) =>
    alert.id === parsed.data.alertId ? { ...alert, acknowledged: true } : alert
  );

  await saveAlerts(updatedAlerts);

  return NextResponse.json({ ok: true });
}

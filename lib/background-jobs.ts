import { CronJob } from "cron";

import { runMonitoringCycle } from "@/lib/monitor";

declare global {
  var __iot_update_tracker_job: CronJob | undefined;
  var __iot_update_tracker_started: boolean | undefined;
}

export function initializeBackgroundJobs() {
  if (globalThis.__iot_update_tracker_started) {
    return;
  }

  const job = new CronJob(
    "0 */2 * * * *",
    async () => {
      await runMonitoringCycle();
    },
    null,
    false,
    "UTC"
  );

  job.start();
  globalThis.__iot_update_tracker_job = job;
  globalThis.__iot_update_tracker_started = true;
}

"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

export function AcknowledgeAlertButton({ alertId }: { alertId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      size="sm"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await fetch("/api/alerts", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ alertId })
          });

          window.location.reload();
        });
      }}
    >
      {isPending ? "Saving..." : "Acknowledge"}
    </Button>
  );
}

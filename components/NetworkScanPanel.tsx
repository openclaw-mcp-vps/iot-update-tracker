"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanProgress } from "@/components/ScanProgress";

const networkSchema = z.object({
  networkRange: z
    .string()
    .min(3, "Network range is required")
    .max(64, "Network range is too long")
});

type NetworkForm = z.infer<typeof networkSchema>;

interface ScanResponse {
  message: string;
  summary: {
    discovered: number;
    vulnerable: number;
  };
}

export function NetworkScanPanel() {
  const [scanState, setScanState] = useState({
    isScanning: false,
    scanned: 0,
    discovered: 0,
    vulnerable: 0,
    message: "No scan running"
  });

  const form = useForm<NetworkForm>({
    resolver: zodResolver(networkSchema),
    defaultValues: {
      networkRange: "192.168.1.0/24"
    }
  });

  const runScan = form.handleSubmit(async ({ networkRange }) => {
    setScanState((state) => ({
      ...state,
      isScanning: true,
      message: "Discovery in progress. Scanning local subnet for IoT hosts..."
    }));

    const response = await fetch("/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ networkRange })
    });

    const result = (await response.json()) as ScanResponse | { error: string };

    if (!response.ok) {
      setScanState((state) => ({
        ...state,
        isScanning: false,
        message: "Scan failed. Check network privileges and try again."
      }));
      return;
    }

    if ("error" in result) {
      setScanState((state) => ({
        ...state,
        isScanning: false,
        message: "Scan failed. Check network privileges and try again."
      }));
      return;
    }

    setScanState({
      isScanning: false,
      scanned: result.summary.discovered,
      discovered: result.summary.discovered,
      vulnerable: result.summary.vulnerable,
      message: result.message
    });

    window.location.reload();
  });

  return (
    <div className="space-y-4">
      <form onSubmit={runScan} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
        <label htmlFor="networkRange" className="mb-2 block text-xs text-zinc-400">
          Network Range (CIDR)
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id="networkRange"
            placeholder="192.168.1.0/24"
            {...form.register("networkRange")}
          />
          <Button type="submit" disabled={scanState.isScanning} className="sm:w-fit">
            <Search className="h-4 w-4" />
            Run Security Scan
          </Button>
        </div>
        {form.formState.errors.networkRange ? (
          <p className="mt-2 text-xs text-red-300">{form.formState.errors.networkRange.message}</p>
        ) : null}
      </form>

      <ScanProgress {...scanState} />
    </div>
  );
}

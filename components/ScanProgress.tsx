"use client";

import { Loader2, Radar, ShieldCheck, ShieldAlert } from "lucide-react";

interface ScanProgressProps {
  isScanning: boolean;
  scanned: number;
  discovered: number;
  vulnerable: number;
  message: string;
}

export function ScanProgress({
  isScanning,
  scanned,
  discovered,
  vulnerable,
  message
}: ScanProgressProps) {
  const progress = discovered === 0 ? 0 : Math.min(100, Math.round((scanned / discovered) * 100));

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-200">Active Network Scan</p>
        {isScanning ? (
          <span className="inline-flex items-center gap-2 rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Scanning
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-md bg-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
            Idle
          </span>
        )}
      </div>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mb-4 text-xs text-zinc-400">{message}</p>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-zinc-300">
          <div className="mb-2 flex items-center gap-2 text-zinc-400">
            <Radar className="h-3.5 w-3.5" />
            Discovered
          </div>
          <p className="text-lg font-semibold text-zinc-100">{discovered}</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-zinc-300">
          <div className="mb-2 flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Assessed
          </div>
          <p className="text-lg font-semibold text-zinc-100">{scanned}</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-zinc-300">
          <div className="mb-2 flex items-center gap-2 text-zinc-400">
            <ShieldAlert className="h-3.5 w-3.5" />
            At Risk
          </div>
          <p className="text-lg font-semibold text-red-300">{vulnerable}</p>
        </div>
      </div>
    </div>
  );
}

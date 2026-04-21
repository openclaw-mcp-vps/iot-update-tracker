import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="text-sm font-semibold tracking-wide text-zinc-100">
          IoT Update Tracker
        </Link>
        <nav className="flex items-center gap-4 text-xs text-zinc-400 sm:text-sm">
          <Link href="/dashboard" className="hover:text-zinc-100">
            Dashboard
          </Link>
          <Link href="/devices" className="hover:text-zinc-100">
            Devices
          </Link>
          <Link href="/alerts" className="hover:text-zinc-100">
            Alerts
          </Link>
        </nav>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IoT Update Tracker — Track Security Updates for Your IoT Devices",
  description: "Monitor IoT device firmware versions against security databases and receive automated alerts for CVEs and available updates."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">
        {children}
      </body>
    </html>
  );
}

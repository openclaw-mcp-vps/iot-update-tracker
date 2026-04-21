import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"]
});

const siteUrl = "https://iot-update-tracker.example.com";

export const metadata: Metadata = {
  title: "IoT Update Tracker | Track security updates for your IoT devices",
  description:
    "Automatically discover IoT devices, monitor firmware security updates, and receive CVE-based remediation alerts across all locations.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "IoT Update Tracker",
    description:
      "Track firmware risk, vulnerability exposure, and patch coverage for routers, cameras, smart-home and industrial IoT devices.",
    url: siteUrl,
    siteName: "IoT Update Tracker",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "IoT Update Tracker",
    description:
      "Monitor IoT firmware security posture and get patch alerts before attackers exploit known CVEs."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-[#0d1117] font-[var(--font-space-grotesk)] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}

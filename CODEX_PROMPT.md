# Build Task: iot-update-tracker

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: iot-update-tracker
HEADLINE: Track security updates for your IoT devices
WHAT: None
WHY: None
WHO PAYS: None
NICHE: security-tools
PRICE: $$9/mo

ARCHITECTURE SPEC:
A Next.js web app that monitors IoT device firmware versions against security databases and sends automated alerts. Users add their devices, and the system continuously checks for available security updates and CVE notifications.

PLANNED FILES:
- app/page.tsx
- app/dashboard/page.tsx
- app/devices/page.tsx
- app/api/devices/route.ts
- app/api/webhooks/lemonsqueezy/route.ts
- app/api/cron/check-updates/route.ts
- components/device-form.tsx
- components/device-list.tsx
- components/update-alerts.tsx
- lib/device-scanner.ts
- lib/cve-checker.ts
- lib/email-notifications.ts
- lib/lemonsqueezy.ts
- prisma/schema.prisma

DEPENDENCIES: next, react, typescript, tailwindcss, prisma, @prisma/client, postgres, @lemonsqueezy/lemonsqueezy.js, resend, zod, lucide-react, node-cron, axios

REQUIREMENTS:
- Next.js 15 with App Router (app/ directory)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (npx shadcn@latest init, then add needed components)
- Dark theme ONLY — background #0d1117, no light mode
- Lemon Squeezy checkout overlay for payments
- Landing page that converts: hero, problem, solution, pricing, FAQ
- The actual tool/feature behind a paywall (cookie-based access after purchase)
- Mobile responsive
- SEO meta tags, Open Graph tags
- /api/health endpoint that returns {"status":"ok"}

ENVIRONMENT VARIABLES (create .env.example):
- NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID
- NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID
- LEMON_SQUEEZY_WEBHOOK_SECRET

After creating all files:
1. Run: npm install
2. Run: npm run build
3. Fix any build errors
4. Verify the build succeeds with exit code 0

Do NOT use placeholder text. Write real, helpful content for the landing page
and the tool itself. The tool should actually work and provide value.


PREVIOUS ATTEMPT FAILED WITH:
Codex exited 1: Reading additional input from stdin...
OpenAI Codex v0.121.0 (research preview)
--------
workdir: /tmp/openclaw-builds/iot-update-tracker
model: gpt-5.3-codex
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: none
reasoning summaries: none
session id: 019d94fb-747d-7051-90f2-8020d00e10da
--------
user
# Build Task: iot-update-tracker

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: iot-update-tracker
HEADLINE: Track security updates fo
Please fix the above errors and regenerate.
/**
 * instrumentation-client.ts
 *
 * Next.js 16 client instrumentation — runs before any app code on the client.
 * This is the correct place to initialize analytics in Next.js 16 (App Router).
 *
 * HOW TO ACTIVATE GOOGLE ANALYTICS:
 * 1. Go to analytics.google.com and create a GA4 property
 * 2. Copy your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Replace "G-XXXXXXXXXX" below with your real ID
 * 4. Uncomment the three lines marked UNCOMMENT BELOW
 * 5. Redeploy the site — analytics will begin tracking immediately
 *
 * See /setup for full step-by-step instructions.
 */

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your real GA4 ID

export function register() {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return; // Skip if not configured

  // UNCOMMENT BELOW once you have a real Measurement ID:
  // const script = document.createElement("script");
  // script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  // script.async = true;
  // document.head.appendChild(script);

  // window.dataLayer = window.dataLayer || [];
  // function gtag(...args: unknown[]) { (window as { dataLayer: unknown[] }).dataLayer.push(args); }
  // gtag("js", new Date());
  // gtag("config", GA_MEASUREMENT_ID);
}

export function onRouteChange() {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;

  // This fires on every client-side navigation — tracks pageviews automatically.
  // UNCOMMENT BELOW once you have a real Measurement ID:
  // const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  // if (gtag) {
  //   gtag("event", "page_view", { page_path: window.location.pathname });
  // }
}

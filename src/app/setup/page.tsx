import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Site Setup Guide",
  description: "Complete setup instructions for TEDxHuntingValley — Google Analytics, social feeds, Vercel deployment, and content updates.",
  robots: { index: false, follow: false },
};

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5 py-8 border-b border-[#f0f0f0] last:border-0">
      <div className="flex-shrink-0 w-10 h-10 bg-[#e62b1e] text-white text-sm font-bold flex items-center justify-center rounded-sm">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#0a0a0a] text-base mb-3">{title}</h3>
        <div className="text-[#555555] text-sm leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#0a0a0a] text-[#9a9a9a] text-xs p-4 overflow-x-auto my-3 rounded-sm font-mono leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 md:py-20 border-b border-[#e0e0e0]">
      <div className="mb-10">
        <span className="inline-flex items-center gap-3 mb-4">
          <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
            {label}
          </span>
        </span>
        <h2
          className="font-extrabold text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Badge({ color, children }: { color: "green" | "yellow" | "red"; children: React.ReactNode }) {
  const colors = {
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    red: "bg-red-50 text-[#e62b1e] border-red-200",
  };
  return (
    <span className={`inline-block text-[0.6rem] font-bold tracking-wider uppercase border px-2 py-0.5 rounded-sm ${colors[color]}`}>
      {children}
    </span>
  );
}

export default function SetupPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0a0a0a] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                Admin
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Site Setup Guide
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Everything you need to finish configuring the site: Google Analytics, live social
              feeds, Vercel deployment, and how to update content as the event approaches.
            </p>
            <p className="text-white/30 text-xs mt-6">
              This page is not indexed by search engines. It is for organizer use only.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white border-b border-[#e0e0e0]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-8">
          <FadeIn>
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-5">
              Setup status
            </p>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Site structure and all pages", status: "Done", color: "green" as const },
                { label: "Google Analytics", status: "Needs ID", color: "yellow" as const },
                { label: "Live social feed", status: "Needs API", color: "yellow" as const },
                { label: "Vercel deployment", status: "Ready to deploy", color: "yellow" as const },
                { label: "Speaker content", status: "Placeholders", color: "yellow" as const },
                { label: "Speaker photos", status: "Placeholders", color: "yellow" as const },
                { label: "Custom domain", status: "Optional", color: "yellow" as const },
                { label: "Application PDF", status: "Done", color: "green" as const },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <div className="bg-[#f9f9f9] border border-[#e0e0e0] p-4">
                    <Badge color={item.color}>{item.status}</Badge>
                    <p className="text-xs font-semibold text-[#0a0a0a] mt-2 leading-snug">{item.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </div>

      {/* Jump links */}
      <div className="bg-[#f9f9f9] border-b border-[#e0e0e0] sticky top-16 z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <nav aria-label="Setup sections" className="flex overflow-x-auto gap-0 py-0">
            {[
              { href: "#running-locally", label: "Run Locally" },
              { href: "#google-analytics", label: "Google Analytics" },
              { href: "#social-feed", label: "Social Feed" },
              { href: "#vercel", label: "Vercel Deploy" },
              { href: "#speakers", label: "Update Speakers" },
              { href: "#content", label: "Update Content" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-shrink-0 px-4 py-4 text-xs font-semibold text-[#555555] hover:text-[#e62b1e] border-b-2 border-transparent hover:border-[#e62b1e] transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">

        {/* ── Running Locally ── */}
        <Section id="running-locally" label="Local Development" title="Running the site on your computer">
          <Step number="1" title="Install dependencies">
            <p>Open a terminal, navigate to the project folder, and run:</p>
            <CodeBlock>cd /Users/cmartin27/Downloads/Tedx/tedx-site
npm install</CodeBlock>
            <p>This installs everything the project needs. It only needs to be done once (or again after pulling new changes).</p>
          </Step>

          <Step number="2" title="Start the development server">
            <CodeBlock>npm run dev</CodeBlock>
            <p>The site will be available at <strong className="text-[#0a0a0a]">http://localhost:3000</strong></p>
            <p>The dev server hot-reloads — any file you save is reflected in the browser immediately without a restart.</p>
          </Step>

          <Step number="3" title="Build for production (optional local check)">
            <CodeBlock>npm run build
npm start</CodeBlock>
            <p>This builds an optimized production version and serves it locally. Use this to verify the production build before deploying.</p>
          </Step>

          <div className="mt-6 p-5 bg-[#f9f9f9] border border-[#e0e0e0]">
            <p className="text-xs font-semibold text-[#0a0a0a] mb-1">Requirements</p>
            <p className="text-xs text-[#555555]">Node.js 18.17 or later. To check your version: <code className="bg-[#e0e0e0] px-1 py-0.5 rounded text-xs">node --version</code></p>
          </div>
        </Section>

        {/* ── Google Analytics ── */}
        <Section id="google-analytics" label="Analytics" title="Setting up Google Analytics">
          <p className="text-[#555555] text-sm leading-relaxed mb-8">
            The site is pre-wired for Google Analytics 4. You just need a Measurement ID.
            The setup uses Next.js 16&apos;s <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">instrumentation-client.ts</code> file,
            which is the correct approach for this version and fires before any app code on the client.
          </p>

          <Step number="1" title="Create a Google Analytics 4 property">
            <p>Go to <strong className="text-[#0a0a0a]">analytics.google.com</strong> and sign in with a Google account.</p>
            <p>Click Admin (bottom left gear icon), then Create Property.</p>
            <p>Name it &ldquo;TEDxHuntingValley&rdquo;, set the time zone to Eastern Time, currency to USD.</p>
            <p>Select &ldquo;Web&rdquo; as the platform, enter your domain (or tedxhuntingvalley.com), and create the data stream.</p>
            <p>Copy the Measurement ID — it looks like: <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs font-mono">G-XXXXXXXXXX</code></p>
          </Step>

          <Step number="2" title="Add your Measurement ID to the instrumentation file">
            <p>Open this file in your code editor:</p>
            <CodeBlock>instrumentation-client.ts  {/* in the project root */}</CodeBlock>
            <p>Replace <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs font-mono">G-XXXXXXXXXX</code> with your real ID on line 15.</p>
            <p>Then uncomment the code blocks marked with &ldquo;UNCOMMENT BELOW&rdquo; — there are two of them (one in <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">register()</code> and one in <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">onRouteChange()</code>).</p>
          </Step>

          <Step number="3" title="Verify it's working">
            <p>Deploy the site (see Vercel section below), then go to your GA4 property.</p>
            <p>Click Reports, then Realtime. Visit the live site — your session should appear within a few seconds.</p>
          </Step>

          <div className="mt-6 p-5 bg-[#f9f9f9] border border-[#e0e0e0]">
            <p className="text-xs font-semibold text-[#0a0a0a] mb-1">What gets tracked automatically</p>
            <ul className="text-xs text-[#555555] space-y-1 list-disc list-inside">
              <li>Page views (including client-side navigation between pages)</li>
              <li>Session duration, bounce rate, and user geography</li>
              <li>Device and browser breakdown</li>
              <li>Traffic sources (direct, social, search)</li>
            </ul>
          </div>
        </Section>

        {/* ── Social Feed ── */}
        <Section id="social-feed" label="Social" title="Connecting a live Instagram and X feed">
          <p className="text-[#555555] text-sm leading-relaxed mb-8">
            The social sections on the Home page and Social page currently show representative placeholder
            posts. To replace them with real, live posts, you have two options:
          </p>

          <Step number="A" title="Option A — Embed a third-party widget (fastest, no code)">
            <p>Services like <strong className="text-[#0a0a0a]">Elfsight</strong>, <strong className="text-[#0a0a0a]">SnapWidget</strong>, or <strong className="text-[#0a0a0a]">Behold.so</strong> generate an embed code that pulls your real Instagram posts and renders them on any website.</p>
            <p><strong className="text-[#0a0a0a]">Steps:</strong></p>
            <p>1. Sign up for one of those services and connect your @tedxhuntingvalley Instagram account.</p>
            <p>2. Customize the layout (grid, 3 columns, no captions, match your color scheme).</p>
            <p>3. Copy the embed script they provide.</p>
            <p>4. In <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">src/components/sections/SocialSection.tsx</code> and <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">src/app/social/page.tsx</code>, replace the placeholder grid with a <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">{"<script>"}</code> or <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">{"<div>"}</code> containing the embed code.</p>
            <p className="text-[#9a9a9a] text-xs">Most of these have a free tier with a small logo. Paid tiers remove branding.</p>
          </Step>

          <Step number="B" title="Option B — Instagram Basic Display API (real integration, requires review)">
            <p>Instagram&apos;s official API lets you pull your own posts programmatically. This is more work but gives you full control over layout and no third-party branding.</p>
            <p><strong className="text-[#0a0a0a]">Steps (high-level):</strong></p>
            <p>1. Go to <strong className="text-[#0a0a0a]">developers.facebook.com</strong>, create an App, and add the Instagram Basic Display product.</p>
            <p>2. Add the @tedxhuntingvalley account as a test user and generate a long-lived token.</p>
            <p>3. Store the token as an environment variable in Vercel: <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs font-mono">INSTAGRAM_TOKEN</code></p>
            <p>4. Create a Next.js Route Handler (<code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">src/app/api/instagram/route.ts</code>) that fetches from the Instagram Graph API and returns the data.</p>
            <p>5. Update the <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">SocialSection</code> component to fetch from that endpoint.</p>
            <CodeBlock>{`// Example API route (src/app/api/instagram/route.ts)
import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN;
  const res = await fetch(
    \`https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=\${token}\`
  );
  const data = await res.json();
  return NextResponse.json(data);
}`}</CodeBlock>
          </Step>

          <Step number="C" title="Option C — X (Twitter) embed">
            <p>Twitter/X no longer offers a free API for timeline embeds. The simplest approach:</p>
            <p>1. Go to <strong className="text-[#0a0a0a]">publish.twitter.com</strong>, enter your @tedxhuntingvalley handle, and select &ldquo;Embedded Timeline.&rdquo;</p>
            <p>2. Click Set customization options, set a dark theme or light theme, and copy the generated HTML.</p>
            <p>3. Add a <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">{"<div dangerouslySetInnerHTML={{ __html: embedCode }} />"}</code> to the social sections.</p>
          </Step>

          <div className="mt-6 p-5 bg-[#f9f9f9] border border-[#e0e0e0]">
            <p className="text-xs font-semibold text-[#0a0a0a] mb-1">Our recommendation</p>
            <p className="text-xs text-[#555555]">Start with Option A (Elfsight or Behold.so). It takes about 10 minutes to set up, looks professional, and you can swap it out later if you want full API control. For a school event at this stage, a clean widget is the right call.</p>
          </div>
        </Section>

        {/* ── Vercel ── */}
        <Section id="vercel" label="Deployment" title="Deploying to Vercel">
          <p className="text-[#555555] text-sm leading-relaxed mb-8">
            The site is already optimized for Vercel. Deployment takes about 5 minutes. You will need
            a GitHub account and a Vercel account (both free).
          </p>

          <Step number="1" title="Push your project to GitHub">
            <p>If you haven&apos;t already, create a repository on github.com and push the project:</p>
            <CodeBlock>{`git init
git add .
git commit -m "Initial commit — TEDxHuntingValley site"
git remote add origin https://github.com/YOUR_USERNAME/tedx-site.git
git push -u origin main`}</CodeBlock>
          </Step>

          <Step number="2" title="Import the project into Vercel">
            <p>Go to <strong className="text-[#0a0a0a]">vercel.com</strong> and sign in (or sign up — it&apos;s free).</p>
            <p>Click &ldquo;Add New Project,&rdquo; then &ldquo;Import Git Repository.&rdquo;</p>
            <p>Select your GitHub repository. Vercel will auto-detect that it&apos;s a Next.js project.</p>
            <p>Click Deploy. Your site will be live at a <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">*.vercel.app</code> URL within about 60 seconds.</p>
          </Step>

          <Step number="3" title="Connect your custom domain (tedxhuntingvalley.com)">
            <p>In your Vercel project dashboard, go to Settings, then Domains.</p>
            <p>Add <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">tedxhuntingvalley.com</code> and <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">www.tedxhuntingvalley.com</code>.</p>
            <p>Vercel will give you DNS records to add at your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).</p>
            <p>Add the records, wait up to 24 hours for DNS propagation, and your custom domain will work with automatic HTTPS.</p>
          </Step>

          <Step number="4" title="Set environment variables in Vercel">
            <p>If you add Google Analytics or an Instagram API token, add them in Vercel under Settings, then Environment Variables. Do not hardcode tokens in your source code.</p>
            <CodeBlock>{`# Variables to add in Vercel dashboard:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # for Google Analytics
INSTAGRAM_TOKEN=your_token_here              # if using Instagram API`}</CodeBlock>
            <p>After adding variables, redeploy (push any commit to GitHub — Vercel deploys automatically).</p>
          </Step>

          <Step number="5" title="Automatic deploys going forward">
            <p>Every time you push a commit to GitHub, Vercel automatically redeploys the site. There is nothing else to do. Updates to speaker content, text, or images go live in about 60 seconds after you push.</p>
          </Step>

          <div className="mt-6 p-5 bg-[#f9f9f9] border border-[#e0e0e0]">
            <p className="text-xs font-semibold text-[#0a0a0a] mb-1">Vercel free tier</p>
            <p className="text-xs text-[#555555]">The Vercel Hobby plan is completely free and more than sufficient for this site. It includes unlimited deployments, automatic HTTPS, global CDN, and 100GB of bandwidth per month.</p>
          </div>
        </Section>

        {/* ── Speakers ── */}
        <Section id="speakers" label="Content" title="Adding speakers when they are selected">
          <p className="text-[#555555] text-sm leading-relaxed mb-8">
            All speaker data lives in one file. You never need to touch a component to add or update
            a speaker.
          </p>

          <Step number="1" title="Open the speakers data file">
            <CodeBlock>src/data/speakers.ts</CodeBlock>
            <p>Each of the 10 speaker slots has a <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">status: &quot;coming-soon&quot;</code>. When a speaker is selected, you update their slot.</p>
          </Step>

          <Step number="2" title="Fill in the speaker's details">
            <p>Change the slot from its placeholder state:</p>
            <CodeBlock>{`// BEFORE (placeholder):
{
  id: "student-1",
  name: null,
  role: null,
  organization: null,
  type: "student",
  bio: null,
  talkTitle: null,
  talkDescription: null,
  image: null,
  status: "coming-soon",
},

// AFTER (announced speaker):
{
  id: "student-1",
  name: "Sarah Kim",
  role: "Junior, Shaker Heights High School",
  organization: "Shaker Heights High School",
  type: "student",
  bio: "Sarah is a junior at Shaker Heights interested in cognitive science and how sleep affects memory consolidation...",
  talkTitle: "The Night Shift Your Brain Runs Without You",
  talkDescription: "What happens to everything you learned today after you fall asleep — and why skipping that process has consequences nobody told you about.",
  image: "/speakers/sarah-kim.jpg",
  status: "announced",
},`}</CodeBlock>
          </Step>

          <Step number="3" title="Add the speaker's headshot">
            <p>Save the headshot image to:</p>
            <CodeBlock>public/speakers/sarah-kim.jpg</CodeBlock>
            <p>Images in the <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">public/</code> folder are served directly. The <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">image</code> field in the speaker object should match the path starting with <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">/</code>.</p>
            <p className="text-[#9a9a9a] text-xs">Image format: JPG or WebP. Recommended size: 600px wide, 3:4 aspect ratio (portrait). Next.js handles resizing automatically.</p>
          </Step>

          <Step number="4" title="Deploy the update">
            <p>Save the file, commit, and push:</p>
            <CodeBlock>{`git add src/data/speakers.ts public/speakers/
git commit -m "Add student speaker: Sarah Kim"
git push`}</CodeBlock>
            <p>The site updates automatically within 60 seconds on Vercel.</p>
          </Step>

          <div className="mt-6 p-5 bg-[#f9f9f9] border border-[#e0e0e0]">
            <p className="text-xs font-semibold text-[#0a0a0a] mb-2">Speaker card behavior</p>
            <ul className="text-xs text-[#555555] space-y-1 list-disc list-inside">
              <li>While <code className="font-mono bg-[#e0e0e0] px-1 rounded">status: &quot;coming-soon&quot;</code> — shows a gray silhouette card.</li>
              <li>Once <code className="font-mono bg-[#e0e0e0] px-1 rounded">status: &quot;announced&quot;</code> — shows the headshot, name, and role. Clicking opens a modal with the full bio and talk title.</li>
              <li>Adult speakers appear in the first grid, student speakers in the second grid, automatically.</li>
            </ul>
          </div>
        </Section>

        {/* ── Content Updates ── */}
        <Section id="content" label="Content Updates" title="Updating everything else on the site">

          <div className="space-y-0">
            <Step number="1" title="Change dates, email, venue, or event details">
              <p>All global site info is in one file:</p>
              <CodeBlock>src/data/site.ts</CodeBlock>
              <p>The <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">siteConfig</code> object at the top controls the event name, date, venue, email, social handles, and application deadline. Change it once and it updates everywhere on the site.</p>
            </Step>

            <Step number="2" title="Update the timeline (key dates)">
              <p>The <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">keyDates</code> array in <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">src/data/site.ts</code> powers the timeline section on the home page:</p>
              <CodeBlock>{`export const keyDates = [
  { date: "March 31, 2026", label: "Student applications open" },
  { date: "May 11, 2026",   label: "Application deadline (11:59 PM)" },
  // add or change entries here
];`}</CodeBlock>
            </Step>

            <Step number="3" title="Update the stats">
              <p>Stats on the home page come from:</p>
              <CodeBlock>src/data/stats.ts</CodeBlock>
              <p>Edit <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">localStats</code> and <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">globalStats</code> to change the numbers, labels, or descriptions.</p>
            </Step>

            <Step number="4" title="Update page text (About, Apply, etc.)">
              <p>Each page is its own file in <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">src/app/</code>:</p>
              <CodeBlock>{`src/app/about/page.tsx     — About page
src/app/apply/page.tsx    — Application page
src/app/speakers/page.tsx — Speakers page
src/app/media/page.tsx    — Media page
src/app/social/page.tsx   — Social page`}</CodeBlock>
              <p>All body text is written directly in the JSX. Find the section you want to update and change the text inside the <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">{"<p>"}</code> tags.</p>
            </Step>

            <Step number="5" title="Replace the application PDF">
              <p>The embedded PDF on the Apply page comes from:</p>
              <CodeBlock>public/application.pdf</CodeBlock>
              <p>Replace this file with an updated PDF and the site will serve the new version automatically. Do not rename the file — the embed uses the path <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">/application.pdf</code>.</p>
            </Step>

            <Step number="6" title="Update the OG image (social share preview)">
              <p>When the site URL is shared on iMessage, Twitter, Slack, etc., it shows a preview image. The current one is a placeholder:</p>
              <CodeBlock>public/og-image.jpg</CodeBlock>
              <p>Replace it with a 1200x630 image — ideally a branded graphic with the event name and date. Keep the filename the same.</p>
            </Step>

            <Step number="7" title="Add event photos and talk videos after August 22">
              <p>After the event, update the Media page (<code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">src/app/media/page.tsx</code>).</p>
              <p>The placeholder grid is ready to swap in real images or YouTube embeds. To add a talk video:</p>
              <CodeBlock>{`// Replace a placeholder div with a YouTube embed:
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  className="w-full aspect-video"
  allowFullScreen
  title="Speaker Name — Talk Title"
/>`}</CodeBlock>
            </Step>
          </div>
        </Section>

        {/* File structure reference */}
        <section className="py-16 md:py-20">
          <FadeIn>
            <div className="mb-8">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Reference
                </span>
              </span>
              <h2
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
              >
                Project file structure
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CodeBlock>{`tedx-site/
├── instrumentation-client.ts   ← Google Analytics (activate here)
├── next.config.ts               ← Next.js configuration
├── public/
│   ├── application.pdf          ← Replace with updated application
│   ├── logo.jpeg                ← Event logo
│   ├── og-image.jpg             ← Social share image (replace with branded version)
│   ├── favicon.ico              ← Browser tab icon
│   └── speakers/                ← Add speaker headshots here (create this folder)
│       └── speaker-name.jpg
└── src/
    ├── app/
    │   ├── layout.tsx            ← Root layout, metadata, fonts
    │   ├── page.tsx              ← Home page (assembles section components)
    │   ├── about/page.tsx
    │   ├── apply/page.tsx
    │   ├── speakers/page.tsx
    │   ├── media/page.tsx
    │   ├── social/page.tsx
    │   └── setup/page.tsx        ← This page (not in main nav)
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── sections/             ← Home page sections
    │   │   ├── Hero.tsx
    │   │   ├── StatsSection.tsx
    │   │   ├── ThemeSection.tsx
    │   │   ├── SpeakersPreview.tsx
    │   │   ├── TimelineSection.tsx
    │   │   ├── SocialSection.tsx
    │   │   └── CTASection.tsx
    │   └── ui/                   ← Reusable components
    │       ├── SpeakerCard.tsx   ← Card + modal for each speaker
    │       ├── AnimatedCounter.tsx
    │       ├── FadeIn.tsx
    │       └── Button.tsx
    └── data/                     ← ALL CONTENT LIVES HERE
        ├── site.ts               ← Event info, nav links, dates
        ├── speakers.ts           ← Speaker slots (fill these in)
        └── stats.ts              ← Numbers shown on home page`}</CodeBlock>
          </FadeIn>
        </section>
      </div>

      {/* Bottom nav */}
      <div className="bg-[#0a0a0a] py-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-white font-bold text-lg mb-1">Ready to go live?</p>
                <p className="text-white/50 text-sm">
                  The site is fully built. Push to GitHub, connect to Vercel, add your domain.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white text-sm font-semibold rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
                >
                  View the site
                </Link>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-sm hover:border-white/60 transition-all duration-200"
                >
                  Open Vercel
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}

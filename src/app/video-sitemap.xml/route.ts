import { speakers } from "@/data/speakers";
import { fullEvent, talks, talksPublishedOn, thumbUrl, watchUrl } from "@/data/talks";

// Google video sitemap for the 13 published recordings. Listed in robots.txt next to the regular
// sitemap so the talks are eligible for video rich results.
export const dynamic = "force-static";

const SITE = "https://tedxhuntingvalley.com";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function seconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

export function GET() {
  const nameOf = (id: string) => speakers.find((s) => s.id === id)?.name ?? id;
  const videos = [
    { title: fullEvent.title, description: fullEvent.description, id: fullEvent.videoId, durationISO: fullEvent.durationISO },
    ...talks.map((t) => ({
      title: `${t.title} | ${nameOf(t.speakerId)} | TEDxHuntingValley`,
      description: t.blurb,
      id: t.videoId,
      durationISO: t.durationISO,
    })),
  ];

  const entries = videos
    .map(
      (v) => `    <video:video>
      <video:thumbnail_loc>${esc(thumbUrl(v.id))}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(v.description)}</video:description>
      <video:player_loc>${esc(`https://www.youtube-nocookie.com/embed/${v.id}`)}</video:player_loc>
      <video:duration>${seconds(v.durationISO)}</video:duration>
      <video:publication_date>${talksPublishedOn}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
      <video:uploader info="${esc(watchUrl(v.id))}">TEDxHuntingValley</video:uploader>
    </video:video>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${SITE}/talks</loc>
${entries}
  </url>
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

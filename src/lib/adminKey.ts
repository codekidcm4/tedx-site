// The organizer dashboard lives at an unguessable URL instead of behind a typed staff code.
// The slug doubles as the API key the dashboard sends with every request. NOTE: this repo is
// public, so the slug is visible to anyone reading the source — it stops URL-guessing and
// crawlers, not a determined attacker. To upgrade to a real secret later, move this value into
// a Vercel env var.
export const ADMIN_KEY = "66ba07148824";

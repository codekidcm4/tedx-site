# Archived: student application program (2026)

These files were removed from the live site when the student speaker application program closed.
They are kept here, uncompiled, so the material can be recovered if needed.

- `apply-page.tsx.txt` — the former `/apply` route (`src/app/apply/page.tsx`).
- `HomeApplySection.tsx.txt` — the former inline apply section on the home page
  (`src/components/sections/HomeApplySection.tsx`).
- `application.pdf` — the former student application packet (was `public/application.pdf`).

`/apply` and `/application.pdf` now permanently redirect to the home page (see `next.config.ts`).
To restore: rename the `.txt` files back to `.tsx`, move them to their original paths, restore the
PDF to `public/`, re-add the sections, and remove the matching redirects.

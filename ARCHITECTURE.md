# Franchise HQ architecture (November 2026)

## Runtime / loading order

GitHub Pages hosts a static site. `index.html` is intentionally a small shell. It loads, in order:

1. `assets/franchise-hq.css`: shared application styles.
2. `app-core.js`: current data model, UI rendering, event handlers, persistence and franchise management.
3. `app-seeds.js`: idempotent historical universe seed data and journalism imports.
4. `app-boot.js`: one-time startup, render and deep-link handling.
5. `illinois-legacy.js`: Illinois historical reference content.
6. Supabase browser SDK.
7. `franchise-cloud.js`: authenticated private account save and synchronization.
8. `franchise-sharing.js`: per-franchise public snapshot publishing.

`reader.html` is a separate, unauthenticated read-only experience. It retrieves an explicitly published snapshot from `public.franchise_hq_publications`. It does not load the owner application.

All scripts are currently **classic browser scripts** sharing a global lexical scope, not ES modules. Preserve order until an intentional modular migration. Functions referenced by inline event handlers must remain globally reachable.

## Data / trust boundaries

- Owner state: browser localStorage key `franchise-hq-v1`; optional authenticated private Supabase `franchise_hq_saves`.
- Public state: separately whitelisted JSON snapshot in `franchise_hq_publications`. Supabase RLS permits anonymous reads **only** when `published = true`. Only the authenticated owner may write their own publication.
- Do not expose full owner objects in reader snapshots. Publish fields intentionally; never publish recruiting/scouting notes, War Room, NIL details, credentials or settings.
- A reader link is a public capability, **not** a secret or authentication system. Anyone holding it can view the published data. Unpublish disables reads, but previously copied information cannot be recalled.
- Keep separate franchise identities and data; do not combine Firebird posts across independent universes.

## Known scaling constraints and next migration targets

1. `app-core.js` is still large (~84 KB), mixes model, UI and data mutations. Extract feature-specific modules gradually (roster, coaching, recruiting, journalism) with explicit APIs and tests, rather than a one-step rewrite.
2. Seed data remains substantial (~49 KB) and executes at startup. Move historical records to versioned JSON fixtures and migrations, with schema validation and idempotent version checks.
3. Reader and owner duplicate profile/news rendering. Introduce shared pure view-model helpers for public entities, while maintaining strict private/public separation.
4. Index-based player/coach links and name-based relationship matching are brittle. Introduce stable entity IDs and explicit relationship records. Support migration of existing saves.
5. Inline `onclick` strings and HTML concatenation complicate escaping, accessibility and testing. Transition to DOM event delegation or component rendering with escaped text.
6. Existing browser localStorage/cloud sync relies on a large array snapshot and optimistic versioning. For growth, consider normalized franchise-specific records and paginated history, without breaking current backups.
7. Add automated checks for syntax, missing functions, navigation, owner-vs-reader permissions, publishing/unpublishing, and mobile browser smoke tests.

## Deployment precautions

- Keep `index.html` script order unchanged unless corresponding dependencies are updated.
- Maintain the localStorage schema and existing cloud save shape until a migration is tested.
- Verify both Washington and Illinois on owner and reader paths after changing shared rendering.
- Validate new public snapshots contain **only** explicitly approved fields.
- A syntax check does not prove that browser interactions or Supabase authorization succeed. Test publishing and revocation with a signed-in owner and an anonymous/private browser.

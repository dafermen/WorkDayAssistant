# Documentation reader

Generate with `node documentation-web/build.mjs` from the repository root. Output: `public/docs/index.html`. Application builds run this step automatically.

InnovaLogic v1: responsive navigation, full-text search, page outline, previous/next, keyboard access, light/dark theme, code copy and enlargement of approved images. `manifest.json` is the explicit source/image allowlist; no directory crawl, private documents, env files, user data or question banks are bundled. Existing Markdown remains canonical. Add source files deliberately and rebuild after edits. The bundled Markdown renderer license is included in vendor/. Raw HTML is disabled. Links outside the selected corpus are inert; follow the repository guide for excluded sources.

Validation and publication are tracked separately in the central rollout. No deployment is claimed.

## Brand maintenance and validation

Edit `brand.css` tokens for the common colors and `portal.css` for this reader layout, then rebuild. The current blue/cyan palette is provisional. App styles remain separate. The manifest controls reading paths, public sources and approved images. Root application build/dev commands regenerate the reader where package scripts exist; SHSAT uses the explicit local build command above.

Local browser verification: all selected documents at 1440 and 390 px, search, chapter links, fragment reload, theme, mobile Escape, code copy where present and enlargement of approved images where present. No horizontal overflow or JavaScript errors in those scenarios. This verifies the reader, not deployment or all product features. No GitHub publication or server rollout in this revision.

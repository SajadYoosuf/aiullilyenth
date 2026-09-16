# Validation record

Checked on 16 September 2026 using Microsoft Edge headless on Windows.

Local Gemini 404 fix, 16 September 2026: **36 tests passed** and the production build passed. New regressions cover listed-but-unavailable models, refreshed catalogs, exactly one fallback, successful-choice persistence data, no fallback on authentication/quota/service errors, and dynamic default selection. Localhost was confirmed to serve the updated client. The user's saved key was not read or changed, and real-account generation remains unverified. This fix was kept local and was not deployed.

- 25 unit tests passed: dot products, stable softmax, exact 100% display rounding, full-precision weighted averages, cosine similarity, context movement, schema validation, API retries, safe=false, invalid keys, quota errors, network failures, header-only key transport, key storage/removal, token counts and embeddings.
- Both demo lessons completed all five steps after an offline production reload. Lazy-loaded lesson panels were available offline. The cache ignores the local preview server's varying Origin header for known same-origin static assets; API traffic is never intercepted.
- Browser checks passed at 360×740 for all five Malayalam steps, both bat contexts, dark mode and key settings, with no horizontal page overflow. Desktop checked at 1440×1000.
- Simulated live UI checks passed for key validation, session-only storage, complete lesson generation, real-number display, unsafe input rejection, quota fallback and key removal. There were no runtime page errors.
- Lighthouse mobile audit: Performance **87**, Accessibility **100**. Total measured transfer including fonts was about **218 KB**. The first app HTML/CSS/JavaScript payload is about **93 KB gzipped**; all JavaScript chunks together with HTML/CSS are about **96 KB gzipped**.
- Additional axe scans identified two light-theme secondary-label contrast issues, corrected by darkening the shared muted-text color. Settings had no axe violations in the checked state.

## Limits of this verification

No real Gemini API key was provided. Live calls were tested with mocked Google responses; real-account compatibility, billable requests, and the approximately 8-second 4G target were not measured. A successful models-list call does not establish generation or embedding quota for every listed model.

Lighthouse is a local lab result, not a guarantee for every low-end Android device, network or hosting platform. Physical-device installation was not tested. Offline results cover the production service worker after one successful online visit, not an unvisited URL.

No supported WebMCP browser context was available for native tool-registration validation. The feature-detected tool is optional and does not affect ordinary use.
# Local educational update — 2026-09-16

- 40 tests passed, including four new tests for square-root scaling, mixing distinct value vectors, causal masking, and input validation.
- TypeScript and the production build passed. Main JavaScript is 95.07 KB gzipped; CSS is 6.89 KB gzipped.
- Localhost returned HTTP 200. This update remains local only.
- New bilingual introduction, history, source links and paper-formula panel were reviewed in source. Browser layout, Lighthouse and offline UI checks below are historical results, not rerun for these additions.
# Local welcome page — 2026-09-16

- Added a responsive bilingual landing page, context illustration, learning overview, original-paper link and lesson entry buttons.
- TypeScript and production build passed. Navigation was reviewed in source, including hash navigation and cancellation when returning home. No browser interaction or visual tests were run for this update.
# Child-focused experience — 2026-09-16

- Added a keyboard-accessible picture guessing activity with gentle retry/success feedback, an SVG guide, illustrated demo choices and short instructions in every lesson.
- Moved longer definitions, history and custom-sentence mode into expandable sections. Research links and bilingual explanations remain available.
- All 40 existing calculation/API tests and the production build passed. These tests do not cover the new UI interaction. Browser visual checks and testing with children have not been performed for this redesign.
# Coordinate analogy — 2026-09-16

- Added a real place address, a reveal button for latitude/longitude, simple coordinate explanations and a comparison with the current lesson's word vector.
- TypeScript and production build passed. This addition was reviewed in source; no browser interaction checks were performed.

# Validation record

Checked on 16 September 2026 using Microsoft Edge headless on Windows.

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

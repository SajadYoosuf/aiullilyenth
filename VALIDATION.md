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
# API-key onboarding — 2026-09-16

- Welcome page explains the key requirement for custom Malayalam/English sentences and opens Settings directly. An expanded five-step guide links to Google AI Studio and Google's official key documentation.
- Settings offers a custom-sentence continuation after a key is saved. TypeScript and production build passed; no real credential was used or external generation request made for this change.
# Teacher walkthrough — 2026-09-16

- Added three manually paced board scenes to each lesson, spoken captions using device text-to-speech, word selection and a jump to the hands-on activity.
- Voice matching uses the selected language. Missing voices and speech errors are shown explicitly. Narration stops when leaving the lesson, changing language or selecting a different word.
- This update has not been built or browser-tested: the preceding build command was rejected by automatic approval review because the account hit its usage limit. Earlier build/test results below do not validate this update.
# Real-input landing flow — 2026-09-16

- Hero now leads with a real Malayalam/English input field, the Gemini key requirement and a three-step product explanation. Ready-made examples and the sample game are secondary.
- Input is retained during key setup and passed to live lesson input. The demo teacher board is hidden while composing live input to avoid showing an unrelated sentence. Generation still requires the learner to start the lesson.
- Source review and whitespace checks only. Build/browser validation remains unperformed following the recorded usage-limit approval rejection.
# Verification resumed — 2026-09-16

- The prior usage-limit block is resolved. All 40 calculation/API tests passed, and TypeScript plus the production build passed for the latest API-key onboarding, real-input landing page and teacher walkthrough.
- Localhost on port 5173 returned HTTP 200. Git whitespace checks passed. The source ZIP was refreshed.
- Main JavaScript: 103.20 KB gzipped; CSS: 9.20 KB gzipped. No browser interaction, actual speech playback, Malayalam voice availability or real Gemini request was tested in this verification. Earlier blocked-check notes below record the history, not the current build status.
# Completed teacher interaction update — 2026-09-16

- Spoken narration now advances the three board scenes on utterance completion and stops at a learner check-in. Pause/resume, replay, speed, voice and independent audio-language controls are implemented. Hidden tabs pause narration; leaving the lesson cancels it.
- Added interactive token selection, a coordinate plot, calculated attention bars, continuation choices and a two-choice conceptual check for every step with explanation and retry feedback.
- Reworked prominent Malayalam lesson copy and Gemini's lesson-writing instructions toward short conversational explanations. Longer dimension explanations are expandable.
- 44 tests passed, including speech progression, pause/resume, cancellation, stale callbacks after replacement/error and disposal. TypeScript and production build passed; localhost returned HTTP 200. Main JavaScript is 105.79 KB gzipped, CSS 9.49 KB.
- Speech tests use a mocked browser speech service. Actual voice quality, Malayalam voice installation and browser playback have not been verified. No new live Gemini request or user testing with children was performed.
# LLM scope and official references — 2026-09-16

- Hero, product overview and opening narration distinguish AI, language models and assistant apps. Added official OpenAI, Google DeepMind and Anthropic references, and clarified that only Gemini is integrated.
- TypeScript and production build passed for the new content/component. Main JavaScript is 107.67 KB gzipped. Browser layout and spoken narration were not retested for this copy update.
# Missing Malayalam voice fix — 2026-09-16

- User confirmed that the device provides no Malayalam voice. Added an expanded Gemini TTS alternative instead of leaving only a disabled native read-aloud control.
- On explicit Generate, discovers supported speech models, sends narration with a header-only key, converts PCM to WAV and provides a Play control. Includes cancellation, in-memory URL cleanup, no-model/quota errors and a bounded 404 fallback. Voice-list refresh is also retried after initialization/focus.
- 52 tests passed, including eight speech API/audio conversion tests. TypeScript and production build passed. Tests use fake credentials and mocked API responses; no real-account generation or audible playback has been verified.

# AI ഉള്ളിൽ എന്താണ്? · AI Ullil Enthaanu?

A Malayalam-first, mobile-first visual lesson about language models. React, Vite, TypeScript and Tailwind CSS. No application backend, accounts, analytics or server-held API keys.

## Run locally

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

The development server deliberately does not register a service worker. Use the production preview to test offline behavior. The build emits the static site and its generated, versioned service worker in `dist/`.

## The five steps

1. Choose an example or enter a sentence (up to 12 words and 300 characters).
2. Tap the colored teaching-token puzzle pieces.
3. Select words in the coordinate table or SVG map.
4. Inspect dot products and attention percentages, then animate the weighted average.
5. Watch a likely continuation appear. Tap another possibility to explore it, or replay.

Use the fixed Back/Next controls or swipe horizontally on the lesson background. Swipes on inputs, diagrams and the scrolling vector strip are left to their own controls. English and light/dark controls are in the header. Reduced-motion preferences suppress animations.

## Offline lessons

- “നീ പോ മോനേ ദിനേശാ” uses affection and mocking as two teaching dimensions.
- The bat lesson switches between cricket and flying contexts. In the flying example, `dark` is the extra contextual clue supplied in the brief, and the insight labels it as such.

Visit once online and wait for the service worker to finish caching. Both lessons, all five steps and the optional UI chunks then work after an offline reload. Google Fonts has a system-font fallback, so lack of a font connection does not prevent learning. The manifest supports installation in compatible browsers; use the browser's Install/Add to Home Screen action. A desktop install control also appears when the browser offers an install prompt.

These values are teaching examples, not extracted transformer internals. Demo A preserves the requested 58%, 27%, 6% prediction choices and explicitly identifies the remaining 9% as other possibilities. Live lessons normalize their three suggested choices to 100%. All displayed attention percentages total 100%.

## Bring your own Gemini key

1. Create a key in [Google AI Studio](https://aistudio.google.com/apikey).
2. Open Settings, paste the key and choose **Validate and save**.
3. The app checks the models-list endpoint, including pagination. Choose a text-generation model and an embedding model from Google's returned capabilities. Model names are never hardcoded in production code.
4. Choose **Live** on the input screen and enter a short sentence.

The key uses `sessionStorage` unless you explicitly opt into **Remember on this device**, which uses `localStorage`. Saving switches storage cleanly. **Remove key** clears both locations. Model choices, language and theme are device-local preferences. Do not paste keys into source files or commit them.

The only authenticated destination is `https://generativelanguage.googleapis.com`. The key is sent in the `x-goog-api-key` header, never a URL or request body. Redirects are rejected, cookies are omitted, and the client does not log keys or raw API responses. The service worker ignores Google API traffic. There is no backend proxy or analytics collector. As with any browser-stored key, browser extensions and scripts running on the same origin may have access to it. Use a restricted key and remove it on shared devices.

Usage is billed to your Google account. Key validity does not guarantee quota for every listed model; choose another compatible model if a model rejects structured output or is unavailable to your account.

## Live lesson behavior

The app requests `application/json` with `responseSchema`. Only `safe` is schema-required so Google can legally return `{ "safe": false }`; every teaching field is then required and validated locally for a safe lesson. Coordinates are rounded and clamped to 0–10, focus words must exist, dimensions must number two, words must number 2–6, and prediction choices must number three. Malformed teaching data retries once, then loads a clearly identified demo with a friendly error message. Unsafe or blocked content never renders as a lesson.

The app maps invalid-key, quota, network, blocked-content and data errors to friendly Malayalam/English messages with a demo fallback. Requests have a 15-second timeout and can be cancelled. Typical lesson speed depends on the chosen model, network and quota; the requested ~8-second 4G target requires measurement with a real key and is not guaranteed.

**See real numbers** sends additional requests only when pressed: `countTokens` for the sentence and `embedContent` for each displayed word, in parallel. It shows the returned vector length, first 20 coordinates, and cosine similarities. If the account has no embedding model, token counts still work. Real embeddings are standalone word embeddings, not the language model's hidden attention states.

## Math

```text
score(focus, word) = focus.x × word.x + focus.y × word.y
weights = stable_softmax(scores / 10), including the focus itself
new_position = sum(weight[i] × word_vector[i])
```

Softmax subtracts the maximum score for numerical stability. A largest-remainder calculation makes integer display percentages sum to exactly 100; coordinates use the full-precision weights. The math tests verify numerical behavior independently of the UI. Actual transformers use learned Q/K/V projections, multiple heads, residual connections and many more dimensions; the Learn more panels explain the limits of the simplified model.

## Source layout

```text
src/
  lessons/             Built-in JSON teaching examples
  engine/              Scores, softmax, weighting, cosine, validation and tests
  components/steps/    One component per learning step
  components/          SVG map, settings and real-number panel
  lib/gemini/           Browser API client, key storage and tests
  i18n/                All interface translations
public/                Manifest and install icons
scripts/build-sw.mjs    Versioned offline cache generation
```

All visual diagrams use SVG; motion uses CSS or short text timers. Settings and real-number UI load in separate chunks. The initial application HTML/CSS/JavaScript is approximately 95 KB gzipped, excluding the optional Google Font. Tailwind is integrated through the Vite plugin; the custom design uses shared CSS variables for both themes.

The optional, feature-detected WebMCP `start_demo_lesson` tool only opens a built-in demo and never uses an API key. Browsers without the proposed API simply ignore it.

## Deploy to Vercel

Import the source repository into Vercel, select **Vite**, use `npm run build` and output directory `dist`. No environment variables are needed. Deploy from the root of this app folder. The included `vercel.json` disables caching for the service worker so updates can be detected.

## Deploy to Netlify

Import the source repository, use build command `npm run build` and publish directory `dist`. The included `netlify.toml` sets these defaults and service-worker cache headers. No environment variables or server functions are required.

For any static host, serve the entire `dist` directory at the domain root over HTTPS. The service worker and manifest use root-relative paths. A path-prefix deployment needs matching Vite base, manifest scope/start URL and service-worker asset paths.

## Verification

See `VALIDATION.md` for the recorded test results and remaining limits. Tests use fake keys and mocked Google responses; no credential is included in this project.

API references: [models list](https://ai.google.dev/api/models), [structured output](https://ai.google.dev/gemini-api/docs/structured-output), [token counts](https://ai.google.dev/api/tokens), [embeddings](https://ai.google.dev/api/embeddings).

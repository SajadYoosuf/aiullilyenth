import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const files = await readdir("dist", { recursive: true });
const assets = files
  .filter(
    (f) =>
      /\.(js|css|html|svg|png|webmanifest|woff2)$/.test(f) && f !== "sw.js",
  )
  .map((f) => "/" + f.replaceAll("\\", "/"));
const hash = createHash("sha256");
for (const f of assets) hash.update(await readFile("dist" + f));
const version = hash.digest("hex").slice(0, 12);
await writeFile(
  "dist/sw.js",
  `const CACHE='ai-ullil-${version}';const ASSETS=${JSON.stringify(assets)};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ai-ullil-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('/index.html',{ignoreVary:true})));return}if(ASSETS.includes(u.pathname))e.respondWith(caches.match(u.pathname,{ignoreVary:true}).then(c=>c||fetch(e.request)));});`,
);
console.log(
  "Offline lessons and all app chunks precached:",
  assets.length,
  "files",
);

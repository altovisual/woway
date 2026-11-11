import { writeFile, mkdir } from "node:fs/promises";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const UA = "WoWayBlackDemo/1.0 (educational demo; contact: demo@example.com)";

/** [output name, search query, orientation] */
const targets = [
  ["hero-beach", "Cancún beach aerial", "landscape"],
  ["about-textile", "screen printing workshop textile", "landscape"],
  ["pkg-cancun", "Cancún beach hotel", "landscape"],
  ["pkg-riviera", "Riviera Maya beach", "landscape"],
  ["pkg-isla", "Isla Mujeres boat", "landscape"],
  ["pkg-cenotes", "cenote Yucatán", "landscape"],
  ["pkg-tulum", "Tulum ruins", "landscape"],
  ["pkg-signature", "catamaran Caribbean", "landscape"],
  ["prod-tee", "white t-shirt", "portrait"],
  ["prod-tee-sunset", "t-shirt rack store", "portrait"],
  ["prod-cap", "baseball cap", "portrait"],
  ["prod-cap-black", "black baseball cap", "portrait"],
  ["prod-hoodie", "hoodie clothing", "portrait"],
  ["prod-tee-limited", "printed t-shirt", "portrait"],
  ["prod-tote", "tote bag canvas", "portrait"],
  ["prod-bottle", "stainless steel water bottle", "portrait"],
  ["prod-passport", "passport holder leather", "portrait"],
  ["prod-drybag", "dry bag kayak", "portrait"],
  ["prod-towel", "beach towel", "portrait"],
  ["prod-stickers", "laptop stickers", "portrait"],
];

const BAD = /(map|diagram|logo|icon|coat of arms|svg|chart|graph|sign|poster|cover|screenshot|plan\b)/i;

async function search(query) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "14",
    prop: "imageinfo",
    iiprop: "url|size|extmetadata",
    iiurlwidth: "1400",
  }).toString();
  const r = await fetch(url, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error(`search HTTP ${r.status}`);
  const j = await r.json();
  return Object.values(j.query?.pages ?? {});
}

function strip(html = "") {
  return String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

const out = [];

for (const [name, query, orientation] of targets) {
  try {
    const pages = await search(query);
    let chosen = null;
    for (const p of pages) {
      const ii = p.imageinfo?.[0];
      if (!ii?.thumburl) continue;
      const title = p.title.replace(/^File:/, "");
      if (BAD.test(title)) continue;
      const w = ii.width ?? 0;
      const h = ii.height ?? 0;
      if (w < 900 || h < 500) continue;
      const ratio = w / h;
      if (orientation === "landscape" && ratio < 1.25) continue;
      if (orientation === "portrait" && ratio > 1.05) continue;
      chosen = { p, ii, title };
      break;
    }
    if (!chosen) {
      out.push(`${name}: no candidate`);
      continue;
    }
    const { ii, title } = chosen;
    const img = await fetch(ii.thumburl, { headers: { "user-agent": UA } });
    if (!img.ok) {
      out.push(`${name}: image HTTP ${img.status}`);
      continue;
    }
    const buf = Buffer.from(await img.arrayBuffer());
    if (buf.length < 15000) {
      out.push(`${name}: too small ${buf.length}`);
      continue;
    }
    await writeFile(`public/img/${name}.jpg`, buf);
    const meta = ii.extmetadata ?? {};
    out.push(`${name}\t${buf.length}\t${strip(meta.Artist?.value) || "unknown"}\t${strip(meta.LicenseShortName?.value) || "?"}\t${title}`);
  } catch (e) {
    out.push(`${name}: ERR ${e.message}`);
  }
}

await mkdir("public/img", { recursive: true });
await writeFile("public/img/credits.txt", out.join("\n") + "\n");
console.log(out.join("\n"));

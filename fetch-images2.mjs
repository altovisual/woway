import { writeFile, mkdir } from "node:fs/promises";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const UA = "WoWayBlackDemo/1.0 (demo; demo@example.com)";

/** [output, exact Commons file title] */
const picks = [
  ["pkg-riviera", "Playa-del-carmen-beach.jpg"],
  ["pkg-signature", "Sailing catamaran anchored off the Seichelles Beach, Ikaria, Greece julesvernex2.jpg"],
  ["pkg-cenotes", "Cenote Ik Kil.jpg"],
  ["about-textile", "Student work from a collagraph and monoprint workshop.jpg"],
  ["prod-hoodie", "Black hoodie for women worn with the hood (52787224146).jpg"],
  ["prod-tee", "Black Zipper Hoodie Graphic T Shirt.jpg"],
  ["prod-tee-sunset", "Hanging clothes on patio in Zapopan, Jalisco, Mexico.jpg"],
  ["prod-cap", "Baseball cap.png"],
  ["prod-towel", "Toballola de platja.jpg"],
  ["prod-stickers", "Laptop with stickers.jpg"],
];

const encode = (t) => new URLSearchParams({ titles: `File:${t}` }).toString();

const results = [];
await mkdir("public/img", { recursive: true });

for (const [name, title] of picks) {
  try {
    const api = "https://commons.wikimedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        format: "json",
        prop: "imageinfo",
        iiprop: "url|size|extmetadata",
        iiurlwidth: "1600",
        titles: `File:${title}`,
      }).toString();
    const r = await fetch(api, { headers: { "user-agent": UA } });
    const j = await r.json();
    const page = Object.values(j.query?.pages ?? {})[0];
    const ii = page?.imageinfo?.[0];
    if (!ii) {
      results.push(`${name}: not found (${title})`);
      continue;
    }
    const src = ii.thumburl || ii.url;
    const img = await fetch(src, { headers: { "user-agent": UA } });
    if (!img.ok) {
      results.push(`${name}: HTTP ${img.status}`);
      continue;
    }
    const buf = Buffer.from(await img.arrayBuffer());
    await writeFile(`public/img/${name}.jpg`, buf);
    const meta = ii.extmetadata ?? {};
    const artist = String(meta.Artist?.value ?? "unknown").replace(/<[^>]+>/g, "").trim();
    const lic = String(meta.LicenseShortName?.value ?? "?").trim();
    results.push(`${name}\t${buf.length}\t${artist}\t${lic}\t${title}`);
  } catch (e) {
    results.push(`${name}: ERR ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}

console.log(results.join("\n"));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const UA = "WoWayBlackDemo/1.0 (demo; demo@example.com)";
const queries = {
  tee: "T-shirt white front product",
  tee2: "T-shirt hanging clothes",
  hoodie: "Hoodie black clothing",
  capblack: "Snapback cap black",
  drybag: "Dry bag waterproof",
  towel: "Beach towel",
  stickers: "Sticker laptop decal",
  riviera: "Playa del Carmen beach",
  signature: "Catamaran sailing sea",
  textile: "Textile printing workshop",
};
for (const [k, q] of Object.entries(queries)) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({ action:"query", format:"json", generator:"search",
    gsrsearch:`filetype:bitmap ${q}`, gsrnamespace:"6", gsrlimit:"6",
    prop:"imageinfo", iiprop:"url|size", iiurlwidth:"1400" }).toString();
  const r = await fetch(url, { headers: { "user-agent": UA } });
  const j = await r.json();
  const pages = Object.values(j.query?.pages ?? {});
  console.log(`### ${k} :: ${q}`);
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    console.log(`  ${p.title.replace(/^File:/,"")} | ${ii.width}x${ii.height}`);
  }
  await new Promise(r => setTimeout(r, 300));
}

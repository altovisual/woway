const q = "Cancún beach";
const url = new URL("https://commons.wikimedia.org/w/api.php");
url.search = new URLSearchParams({
  action: "query", format: "json", generator: "search",
  gsrsearch: `filetype:bitmap ${q}`, gsrnamespace: "6", gsrlimit: "5",
  prop: "imageinfo", iiprop: "url|extmetadata|size", iiurlwidth: "1200",
}).toString();
const r = await fetch(url, { headers: { "user-agent": "WoWayDemo/1.0 (contact: demo@example.com)" } });
console.log("status", r.status);
const j = await r.json();
const pages = j.query?.pages ?? {};
for (const p of Object.values(pages)) {
  const ii = p.imageinfo?.[0];
  console.log(p.title, "|", ii?.width + "x" + ii?.height, "|", ii?.thumburl?.slice(0, 110));
}

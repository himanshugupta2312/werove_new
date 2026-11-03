// Lists things that still need a human before launch: [bracket] blanks, unverified facts, unconfirmed photo names.
import fs from 'node:fs';
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, import.meta.url), 'utf8'));
const dests = read('../src/data/destinations.json'), photos = read('../src/data/photos.json');
let n = 0; const say = (s) => { n++; console.log('• ' + s); };
for (const f of ['terms', 'privacy', 'cancellation']) {
  const t = fs.readFileSync(new URL(`../src/pages/${f}.md`, import.meta.url), 'utf8');
  const m = t.match(/\[[^\]\n]{2,60}\](?!\()/g); if (m) say(`${f}.md has blanks: ${[...new Set(m)].join(' ')}`);
}
for (const d of Object.values(dests)) if (d.verify?.length) say(`${d.slug}: verify ${d.verify.join(', ')}`);
for (const p of photos) if (p.confirm) say(`photo ${p.id}: confirm species "${p.title}"`);
if (!JSON.parse(fs.readFileSync(new URL('../src/data/site.json', import.meta.url))).analyticsId) say('site.json analyticsId is empty (no analytics)');
console.log(n ? `\n${n} item(s) to resolve before launch.` : 'All clear.');

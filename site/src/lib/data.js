// Loads the site data and joins destinations with their photos.
import site from '../data/site.json';
import content from '../data/content.json';
import destinationsRaw from '../data/destinations.json';
import photos from '../data/photos.json';

export { site, content, photos };

export const photoById = Object.fromEntries(photos.map((p) => [p.id, p]));

/** Web path of a photo at a given size: 'md' (800px), 'lg' (1700px) or 'xl' (2400px, hero picks only). */
export const photoUrl = (p, size = 'lg') => `${p.src}-${size === 'xl' && !p.xl ? 'lg' : size}.webp`;

// Destinations, each with its photos, the birds we have photographed there, and a cover picture.
export const destinations = destinationsRaw.map((d) => {
  const own = photos.filter((p) => p.place === d.slug);
  const cover = d.cover ? photoById[d.cover] : null;
  const birds = [...new Set(own.filter((p) => p.kind === 'bird').map((p) => p.title))];
  const dedupe = (a) => { const seen = new Set(); return a.filter((x) => { const k = x.toLowerCase(); return seen.has(k) ? false : seen.add(k); }); };
  const mammals = dedupe([...(d.see || []), ...own.filter((p) => p.kind === 'mammal').map((p) => p.title)])
    .filter((m) => !/^tigress|^tiger |^tiger$/i.test(m) || m === 'Tiger');
  return {
    ...d,
    photos: own,
    cover,
    coverUrl: cover ? photoUrl(cover, 'lg') : `/img/placeholders/${d.slug}.webp`,
    coverMd: cover ? photoUrl(cover, 'md') : `/img/placeholders/${d.slug}.webp`,
    hasPhotos: own.length > 0,
    birds,
    mammals,
  };
});

export const heroSlides = content.hero.map((h) => ({ ...h, p: photoById[h.photo] })).filter((h) => h.p);
export const sightings = content.sightings.map((id) => photoById[id]).filter(Boolean);

/** Tiny formatter for FAQ answers: {{phone}} and [text](/link). */
export const fmt = (s) =>
  s
    .replaceAll('{{phone}}', site.phone)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

export const waLink = (msg = 'Hi We Rove, I would like to plan a trip.') =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(msg)}`;

export const months = () => {
  const out = [], d = new Date(); d.setDate(1);
  for (let i = 0; i < 9; i++) { out.push(d.toLocaleString('en-GB', { month: 'short', year: 'numeric' })); d.setMonth(d.getMonth() + 1); }
  return out;
};

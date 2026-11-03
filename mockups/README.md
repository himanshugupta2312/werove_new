# We Rove website redesign: research, decisions and mockups

This folder holds the research behind the werove.in redesign and the mockups that came out of it: 4 combined samples (day and night), 19 theme directions and 14 logo concepts. Nothing here is live. The current site at werove.in is unchanged.

**To view the mockups in a browser** (no download needed):
https://raw.githack.com/himanshugupta2312/werove_new/redesign-mockups/mockups/index.html

Every mockup has working links. The enquiry forms open WhatsApp with the visitor's details filled in.

---

## 1. What We Rove is

A small company running **safari trips** (the main business) and **birding trips** in India. Almost all bookings come through a **phone call or WhatsApp**. Destinations aren't a fixed catalogue: they're the places travellers ask about most, and the team plans trips anywhere wild in India.

Places people ask about most:

| Destination | Type |
|---|---|
| Tadoba-Andhari Tiger Reserve | Safari |
| Pench Tiger Reserve | Safari |
| Ranthambore | Safari |
| Jim Corbett National Park | Safari + Birding |
| Sattal | Birding |
| Dharamshala and around | Birding |
| Anywhere else | "Ask us" |

---

## 2. Audit of the two earlier sites

### Original site (WordPress, "Travel Insight" theme, 2021–2025)
Reviewed from Wayback Machine captures of the Home, Trips, Birding, Conservation, Contact, Places to Visit and Trek Dos & Don'ts pages.

**Worth keeping:**
- Real trips with inclusions and departure dates. The "Multiple departures + trip inclusions" format was clear.
- A real phone number on every trip.
- The origin story: the idea came up on a Republic Day in the Corbett jungles, with a mountaineer-turned-naturalist and a bird lover.
- **Birding ethics**: no playback, keep your distance, no flash, small groups, don't chase. This was the best writing on the site.
- Genuine local knowledge in "Places to Visit": Latpanchar, Sattal, Sonkhaliya, Bahu, Munsiyari.
- YouTube trip videos (Birds of Delhi, Kareri Lake, Hyderabad birding, Sattal...).

**Junk:**
- Wikipedia-style definitions of birding and bird photography.
- A National Geographic quote on conservation vs preservation, plus "don't burst crackers" style tips.
- A Times of India news feed.
- A trekking Dos & Don'ts page unrelated to safaris or birding.
- Departures dated 2022 that were never updated.
- Typos ("people ear...", "for me" vs "for us") and a stock theme with nothing distinctive.

### Current site (single page, hand-built HTML on GitHub Pages)
- **Wrong destinations:** it features Kaziranga, the Sundarbans and the Western Ghats, which aren't sold, and leaves out Tadoba, Sattal and Dharamshala, which are.
- **No phone, WhatsApp or email anywhere**, only a form, even though bookings happen on calls and WhatsApp.
- **Claims nobody can verify:** "7 years in the field", "0% plastic", "ornithologists with decades in the field", "max 8".
- **Dead links:** All trips, Read Our Charter, About Us, Terms.
- **Placeholder SVG drawings** instead of destination photos.
- **Heavy images:** the bird photos are 1–7 MB each (29 MB total). As WebP they're about 1.4 MB with no visible loss, and those are the copies the mockups use. The logo is inlined as base64, which bloats the HTML to 227 KB.
- **No people or trust signals.**
- **Single page,** so nothing can rank in search for "Tadoba safari booking" or "Sattal birding trip".

---

## 3. Decisions so far

| Topic | Decision | Why |
|---|---|---|
| Focus | **Safari first, birding second** | Safari is the bigger business. In the boho themes safari gets the larger space and birding is a smaller "and for the birders" section. |
| Destinations | **No fixed count.** Framed as "places travellers ask us to go", followed by "If it's wild and in India, ask us." | Trips are built from enquiries, not a catalogue. |
| Conservation tab | **Dropped.** Replaced by a **"How we travel"** section of six concrete field rules. | Generic conservation text doesn't help anyone book. Concrete ethics (no playback, distance, no baiting or flash, small groups, local partners, carry out trash) set us apart and are true. |
| Team | **Anonymous.** Roles and credentials only (naturalist & mountaineer, lead birder, trip planner). | Team preference. |
| Address | **Not shown.** | The physical office is gone. |
| Contact | Phone and WhatsApp **+91 96543 43996**. Email **werove.in@gmail.com**, with info@werove.in as an alternative. | Call and WhatsApp buttons sit up front in every theme. |
| Enquiry form | **Opens WhatsApp with the details filled in**, so no backend and no email form. | Leads land where the team already replies. |
| Blog ("Field Notes") | **Built but hidden** behind a flag in `shared.js`. Preview by adding `?blog` to any mockup URL. | Switch on only once there are at least 3 posts. A stale blog looks worse than none. |
| Photos | **Placeholders for now** (`img/<destination>.webp`, contour-map style). | Replace each file with a real photo under the same name and every theme updates. |

---

## 4. Recommended site structure

- **Home:** hero → Safari (large) and Birding (smaller) → popular destinations → "anywhere else, ask us" → season calendar → how it works → How we travel → crew → field gallery → FAQ → call / WhatsApp / form.
- **One page per destination:** what you'll see, best season, how to get there, a sample itinerary, inclusions, a price "from", and an enquire button. This is needed for search. The current `trips.js` has itinerary text to reuse.
- **Safari and Birding hub pages.**
- **FAQ, Terms, Privacy, Cancellation pages,** so footer links stop being dead.
- **Optional:** upcoming fixed-date departures, only if they actually run. Field Notes blog, only if posted to regularly.

---

## 5. Build platform: Frappe Builder vs a static site

**Frappe Builder** ([frappe/builder](https://github.com/frappe/builder)) was considered and **not recommended**:
- It runs on the Frappe framework: a Python server, MariaDB and Redis. On Windows that also means WSL or Docker.
- It needs a paid server or Frappe Cloud. The site is currently hosted free on GitHub Pages.
- That's far too much to run for a site of about 10 mostly static pages.

**Recommended instead: Astro**, a static site builder.
- One content file per destination. `shared.js` in this folder is a preview of that single-source setup.
- Free hosting on GitHub Pages, as now.
- The WhatsApp-prefill form needs no server.
- Optional: a free Git-based editing tool (Decap CMS or Pages CMS) if someone who doesn't code needs to edit content.

---

## 6. Combined samples (your picks)

Built from the choices made so far: Striped Feather logo, the L parchment-contour background, flying birds, pugmarks down the left and bird footprints down the right, and themes F, G, H, B and C, with F or G colours.

**Page structure:** header (logo, section links, phone, WhatsApp, Instagram and Facebook icons, day/night button) → hero with one or two big tiger or bird images (draft text) → "I want to / Where / When / Travellers / Plan on WhatsApp" bar (from C) → **Where do we rove?** → **How we travel** → **For the travellers, by the travellers** (from B) → **Who guides you** (from D) → **Recent sightings** (from B) → FAQ (from C) → contact section (from C) → footer. There is **no "When to go" section**. The hidden Field Notes blog sits before the FAQ and appears only with `?blog`.

| Sample | Look |
|---|---|
| [1 · Canopy](v1-canopy.html) | Soft blob images, F's green and terracotta |
| [2 · Boho](v2-boho.html) | Arched images and line art, G's sand and terracotta |
| [3 · Pugmark](v3-pugmark.html) | Centred headline, big oval tiger, round images, G's colours |
| [4 · Cinema](v4-cinema.html) | One large framed tiger photo with a bird inset, F's colours |
| [Atlas 1–4](m1-canopy-atlas.html) | The same four looks with an interactive map of India ([2](m2-boho-atlas.html), [3](m3-pugmark-atlas.html), [4](m4-cinema-atlas.html)) |

**Day and night:** the page picks its theme from the visitor's local clock: night from 6pm to 6am, using Moonlit's colours, a dark version of the contour background, and fireflies at the sides (the flying birds rest at night). Day uses the sand or green palette with flying birds. Visitors can override it with the Auto / Day / Night buttons in the footer or the sun/moon button in the header, and the choice is remembered. Preview with `?theme=night`, `?theme=day` or `?hour=21`. Later we can use real sunrise and sunset times instead of fixed hours.

Files: `combo.css` (palettes and shapes), `combo.js` (builds every section), `theme.js` (day/night logic), `ambient.js` (birds, pugmarks, bird prints, fireflies).

**Interactive map of India (`m1`–`m4` samples):** the same four looks with a map. The outline sits behind the hero (or, in Atlas 4, as a page watermark), and "Where do we rove?" becomes a clickable map. Tap a pin to see the destination's photo, species, best time, how to get there, a WhatsApp button and a Share button (it uses the phone's share sheet, or copies a link). Links like `m1-canopy-atlas.html?place=pench#where` open the map on a given place. Dashed "ask us" pins (Kaziranga, Sundarbans, Bandhavgarh, Latpanchar) show we go beyond the main places; they open a WhatsApp enquiry for that place.

*Map data:* the outline comes from the DataMeet India boundaries file (`india-composite.geojson`, CC0), which follows the official Survey of India boundary, simplified to about 40 KB (`india-outline.js`). Pin positions are approximate and the map says "illustrative, not to scale". Lakshadweep is too small to show at this size. Files: `atlas.js` (map and panel), `india-outline.js` (outline).

**Review round (Atlas 4 and the shared engine):**
- Atlas 4 has a **full-width hero** with a slideshow (tiger, kingfisher). Slow-motion videos can be added later: put the files in a `media/` folder and add a line to `HERO_MEDIA` in `combo.js`. The bird inset and the background India map are removed; the destination map stays.
- **Original logo** in the header. Add `?logo=feather` to any sample to see the Striped Feather.
- **Where → Others (type a location)** in the finder and the contact form; the typed place goes into the WhatsApp message.
- "Small groups only…" line removed. New map intro text. "Good questions" is now **FAQ**.
- **Wildlife model:** every destination has `tags` (see `WILDLIFE` in `shared.js`). Tiger reserves are tagged tiger + birding; Sattal and Dharamshala are birding only. The map legend, filter tabs and pin colours are built from the tags, so a leopard, cheetah, rhino or elephant spot is one new entry (`tags: ['leopard', 'birding']`) plus a map position in `atlas.js`.
- **Lakshadweep** and the Andaman & Nicobar islands are on the map (drawn as small dots, slightly larger than true size so they show).
- **Crew:** no more "no names" line. Each person gets a persona (The Tracker, The Birder, The Planner), a promise line, credentials, "ask me about" topics, a quote, a field-photo slot and a "Talk to…" WhatsApp button. The copy is draft text to replace with real words.

**Second review round:**
- **About us** replaces "Our story" and the crew cards. It keeps the original mission quote, the Republic Day story and the team line (travellers and photographers from four states who met in Delhi NCR), lightly edited for flow.
- **FAQ:** intro text on top, questions below, and "Need more information, or have another question?" as the last item, with WhatsApp, Call and Email buttons.
- **Map:** the list under the map is removed. Lakshadweep and Andaman & Nicobar are tappable dots with no permanent labels; the "ask us" spots show their name only when tapped or hovered. `?place=Lakshadweep` opens one directly.
- **Tracks print as you scroll:** each pugmark (left) and bird print (right) stamps into the page one after another, a little below the middle of the screen, and stays printed. Both trails now point down the page, the way they are walking. With reduced-motion settings they simply appear.
- **Side art:** pugmarks and bird prints are dust-grey (about 36% opacity) by day and pale grey at night.

**Facebook:** the icon currently links to the Facebook *group* from the old site. Confirm whether you want the group or a page.

## 7. Theme directions (earlier explorations)

All nineteen share the same content and structure. Only the look differs.

### Boho family: line art, slow motion, safari-led
| | Theme | Character |
|---|---|---|
| G | [Boho](g-boho.html) | Earthy sand and terracotta, arched photos, rainbow arcs and branches that draw themselves in, drifting birds, vines that grow as you scroll. |
| H | [Pugmark](h-pugmark.html) | Safari sketchbook. Tiger tracks stamp across the hero and walk down the margins as you scroll, plus a hand-drawn "A day in the jungle" timeline. **The most safari-focused.** |
| I | [Moonlit](i-moonlit.html) | Night jungle. Fireflies in the margins, moon phases stamping in, a moon-phase season calendar. |
| J | [Jharokha](j-jharokha.html) | Indian boho: Rajasthani cusped-arch photo frames, block-print bands, paisley line art, Indian-designed fonts. **The most distinctive.** |

### Added after the competitor study (see [COMPETITORS.md](COMPETITORS.md))
| | Theme | Character |
|---|---|---|
| K | [Field Guide](k-fieldguide.html) | A classic bird field guide: numbered plates, Latin names, a calendar of occurrence. Visitors tick species they'd love to see and the list is sent to us on WhatsApp. Best for the birding side. |
| L | [Cartographer](l-cartographer.html) | An interactive hand-drawn atlas with clickable pins and a "somewhere else?" pin. Doesn't imply a fixed list of places. |
| M | [Linocut](m-linocut.html) | Bold two-colour block-print look. Photos are converted to prints (and the same treatment works on real photos later), so it can launch before the photo shoot. |

### Traditional Indian art (N–S)
| | Theme | Character |
|---|---|---|
| N | [Madhubani](n-madhubani.html) | Mithila painting (Bihar): heavy black outlines, fish, a peacock, a sun with rays, triangle border bands, Devanagari numerals. |
| O | [Warli](o-warli.html) | White stick-figure art on mud-red (Maharashtra, Tadoba country). Each destination has its own hand-built scene; needs no photos. |
| P | [Gond](p-gond.html) | Dots, dashes and waves filling bright animals on black (Madhya Pradesh, Pench country). Needs no photos. |
| Q | [Miniature](q-miniature.html) | Rajput and Mughal painting: jewel colours, gold frames, cusped arches, lotus ornaments, a folio border. |
| R | [Dak Bungalow](r-dakbungalow.html) | Raj-era forest signboards, typed notices, range and bird registers, a visitors' book and a permit-ticket contact, on the parchment contour background from L. |
| S | [Ajrakh](s-ajrakh.html) | Kutch block-print textile: indigo and madder red, a jaali lattice, octagon photo frames. |

N–S share a small renderer (`trad.js`) that fills their sections from `shared.js`, so each theme only supplies its own art and styling. The Indian art styles are *inspired by* these traditions and are not authentic works by traditional artists; for a real launch, consider commissioning a Madhubani, Warli or Gond artist for the hero illustrations.

### Other directions
| | Theme | Character |
|---|---|---|
| A | [Field Journal](a-field-journal.html) | Warm paper, serif type, naturalist-notebook feel. |
| B | [Dusk](b-dusk.html) | Dark and cinematic with full-width photos. Needs strong photography. |
| C | [Trailhead](c-trailhead.html) | Bright and practical: trip finder, month picker, sample itinerary. Built for enquiries. |
| D | [Poster](d-poster.html) | Vintage national-park posters. Illustrated destinations, so it needs no photos. |
| E | [Editorial](e-editorial.html) | Black-and-white magazine layout. The phone number is the biggest element on the page. |
| F | [Canopy](f-canopy.html) | Soft and friendly, built around WhatsApp, with an example booking chat. |

The **art layer** (birds, vines) can also be switched on for A–F by adding `?ambient` to the URL. Rules it follows:
- Art stays in the margins and hero, never behind body text.
- Movement is slow.
- The side art hides on phones.
- Devices set to reduce motion get still drawings instead.

**Current recommendation:** **H** if the site should say "safari company" at first glance, **J** for a look nobody else in this space has, and **G** as the softer, all-round option. Pieces can be mixed, e.g. J's arch frames with H's pugmark trails.

---

## 8. Logo concepts ([logos.html](logos.html))

Fourteen concepts: 1–6 below, plus 10 Open Book, 11 Rover Prints, 12 Ice Axe & Feather, 13 Compass Feather and 14 R with a Feather (drawn from the founders' own story and words), plus 7 Stripe Arch (a jharokha arch filled with tiger stripes), 8 Eye & Feather (a tiger eye with feather barbs) and 9 Trail Mark (a dotted path from a pugmark to a songbird).

The current logo, a hiker on a snowy peak, reads as a trekking company.

1. **Striped Feather** *(recommended)*: a bird feather with tiger stripes, so both halves of the business in one shape. Works at favicon size.
2. **Pugmark Badge**: a ranger-style round emblem. Leans towards safari, and its ring text disappears at small sizes.
3. **Binocular Horizon**: a landscape seen through binoculars. Neutral between safari and birding.
4. **Sunrise Wordmark**: "we rove" with the "o" drawn as a rising sun.
5. **Field Pass Stamp**: like a forest-department entry pass. Best as a secondary badge for itineraries and social posts.
6. **The Arch, evolved**: keeps the current yellow arch for continuity, with forest and birds instead of the hiker.

These are sketches for choosing a direction. The chosen one should be refined by a designer, about a day's work.

---

## 9. Still needed

- [ ] Choice of theme and logo
- [ ] 2–4 real photos per destination (landscape, at least 1600 px wide)
- [ ] A starting price per destination
- [ ] Cancellation policy and terms
- [ ] Genuine reviews (Google Business Profile is the best source). Leave the section out until there are some.
- [ ] YouTube channel URL
- [ ] Decide whether info@werove.in or werove.in@gmail.com is the public email

**Season data caveat:** best-time and closure months in the mockups are approximate. Core zones of the tiger reserves close roughly July–September; Corbett's Dhikala zone runs roughly mid-November to mid-June. Check against current forest department notices before publishing.

---

## 10. Files

| File | What it is |
|---|---|
| `index.html` | Overview page linking every theme and the logos |
| `v1-…` to `v4-….html` | The four combined samples (day and night) |
| `combo.css`, `combo.js`, `theme.js` | Engine for the combined samples |
| `atlas.js`, `india-outline.js` | Interactive map of India (outline from DataMeet, CC0) |
| `m1-…` to `m4-…atlas.html` | The four combined samples with the interactive map |
| `a-…` to `s-….html` | The nineteen earlier theme mockups |
| `trad.js` | Shared renderer for the traditional-art themes N–S |
| `logos.html` | Nine logo concepts on light and dark, at small sizes |
| `COMPETITORS.md` | Study of seven Indian safari and birding sites, and how we can beat them |
| `shared.js` | Shared content: contact details, destinations, seasons, ethics, crew roles, FAQ, blog flag |
| `ambient.js` | Art layer: birds, vines, pugmarks, fireflies, draw-on and stamp effects |
| `img/` | Compressed photos (WebP) and destination placeholders |

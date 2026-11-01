# We Rove website redesign: research, decisions and mockups

This folder holds the research behind the werove.in redesign and the mockups that came out of it: 10 theme directions and 6 logo concepts. Nothing here is live. The current site at werove.in is unchanged.

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

## 6. Theme directions

All ten share the same content and structure. Only the look differs.

### Boho family: line art, slow motion, safari-led
| | Theme | Character |
|---|---|---|
| G | [Boho](g-boho.html) | Earthy sand and terracotta, arched photos, rainbow arcs and branches that draw themselves in, drifting birds, vines that grow as you scroll. |
| H | [Pugmark](h-pugmark.html) | Safari sketchbook. Tiger tracks stamp across the hero and walk down the margins as you scroll, plus a hand-drawn "A day in the jungle" timeline. **The most safari-focused.** |
| I | [Moonlit](i-moonlit.html) | Night jungle. Fireflies in the margins, moon phases stamping in, a moon-phase season calendar. |
| J | [Jharokha](j-jharokha.html) | Indian boho: Rajasthani cusped-arch photo frames, block-print bands, paisley line art, Indian-designed fonts. **The most distinctive.** |

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

## 7. Logo concepts ([logos.html](logos.html))

The current logo, a hiker on a snowy peak, reads as a trekking company.

1. **Striped Feather** *(recommended)*: a bird feather with tiger stripes, so both halves of the business in one shape. Works at favicon size.
2. **Pugmark Badge**: a ranger-style round emblem. Leans towards safari, and its ring text disappears at small sizes.
3. **Binocular Horizon**: a landscape seen through binoculars. Neutral between safari and birding.
4. **Sunrise Wordmark**: "we rove" with the "o" drawn as a rising sun.
5. **Field Pass Stamp**: like a forest-department entry pass. Best as a secondary badge for itineraries and social posts.
6. **The Arch, evolved**: keeps the current yellow arch for continuity, with forest and birds instead of the hiker.

These are sketches for choosing a direction. The chosen one should be refined by a designer, about a day's work.

---

## 8. Still needed

- [ ] Choice of theme and logo
- [ ] 2–4 real photos per destination (landscape, at least 1600 px wide)
- [ ] A starting price per destination
- [ ] Cancellation policy and terms
- [ ] Genuine reviews (Google Business Profile is the best source). Leave the section out until there are some.
- [ ] YouTube channel URL
- [ ] Decide whether info@werove.in or werove.in@gmail.com is the public email

**Season data caveat:** best-time and closure months in the mockups are approximate. Core zones of the tiger reserves close roughly July–September; Corbett's Dhikala zone runs roughly mid-November to mid-June. Check against current forest department notices before publishing.

---

## 9. Files

| File | What it is |
|---|---|
| `index.html` | Overview page linking every theme and the logos |
| `a-…` to `j-….html` | The ten theme mockups |
| `logos.html` | Six logo concepts on light and dark, at small sizes |
| `shared.js` | Shared content: contact details, destinations, seasons, ethics, crew roles, FAQ, blog flag |
| `ambient.js` | Art layer: birds, vines, pugmarks, fireflies, draw-on and stamp effects |
| `img/` | Compressed photos (WebP) and destination placeholders |

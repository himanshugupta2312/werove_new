// Shared content for all mockups. Edit here once; every theme picks it up.
const SITE = {
  phone: '+91 96543 43996',
  phoneRaw: '919654343996',
  email: 'werove.in@gmail.com',
  emailAlt: 'info@werove.in',
  instagram: 'https://www.instagram.com/werove.in/',
  // Field Notes (blog) stays hidden until there are posts. Preview it with ?blog in the URL.
  showBlog: new URLSearchParams(location.search).has('blog'),
};

const waLink = (msg = 'Hi We Rove, I would like to plan a trip.') =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;

// m = season string Jan..Dec: 2 best, 1 open, 0 closed/off (approximate)
const DESTS = [
  { slug: 'tadoba', name: 'Tadoba-Andhari', region: 'Maharashtra', type: ['safari'],
    blurb: "Maharashtra's oldest and largest tiger reserve: teak forest, lakes, and some of India's most reliable tiger sightings.",
    see: 'Tiger, leopard, sloth bear, dhole, gaur', best: 'Mar – May', reach: 'Nagpur airport, ~3 hrs', m: '112221000111' },
  { slug: 'pench', name: 'Pench', region: 'Madhya Pradesh', type: ['safari'],
    blurb: 'The teak-and-bamboo forest behind The Jungle Book, along the Pench river. Quieter than the big-name parks.',
    see: 'Tiger, leopard, dhole, gaur', best: 'Feb – May', reach: 'Nagpur airport, ~2.5 hrs', m: '122221000111' },
  { slug: 'ranthambore', name: 'Ranthambore', region: 'Rajasthan', type: ['safari'],
    blurb: 'Tigers among the ruins of a 10th-century fort, with lakes, crocodiles and dry deciduous forest.',
    see: 'Tiger, leopard, sloth bear, mugger crocodile', best: 'Mar – May', reach: 'Sawai Madhopur rail, 20 min', m: '112221000111' },
  { slug: 'corbett', name: 'Jim Corbett', region: 'Uttarakhand', type: ['safari', 'birding'],
    blurb: "India's first national park. Tigers and elephants in the grasslands, and 550+ bird species along the Ramganga and Kosi.",
    see: 'Tiger, elephant, great hornbill, ibisbill', best: 'Nov – May', reach: 'Delhi, ~6 hrs by road', m: '222211000122' },
  { slug: 'sattal', name: 'Sattal', region: 'Uttarakhand', type: ['birding'],
    blurb: "Seven connected lakes in oak and pine forest, one of north India's classic birding sites.",
    see: 'Red-billed blue magpie, scimitar babblers, kalij pheasant', best: 'Oct – Apr', reach: 'Kathgodam rail, ~1.5 hrs', m: '222211000122' },
  { slug: 'dharamshala', name: 'Dharamshala & around', region: 'Himachal Pradesh', type: ['birding'],
    blurb: 'The Dhauladhar foothills, with 300+ species from the Kangra valley floor up to Kareri lake.',
    see: 'Lammergeier, Himalayan griffon, white-capped redstart', best: 'Oct – Apr', reach: 'Gaggal airport, ~30 min', m: '222211000122' },
];

const ETHICS = [
  ['No playback. Ever.', "We don't play recorded calls to pull birds out. It stresses them, especially when they're breeding."],
  ['Distance over closeness', "We keep back from nests, roosts and animals, and we don't chase anything that moves off."],
  ['No baiting, no flash', "We don't feed wildlife for a photo, and we don't use flash on birds or at night."],
  ['Small groups, local hands', 'Small groups only. We work with local naturalists, drivers and homestays.'],
  ['We carry it out', 'Every wrapper and bottle comes back with us.'],
  ['Season-aware', "We don't push into forests during closures or wander off-route into sensitive areas."],
];

// Anonymous team: roles and credentials, no names or faces.
const CREW = [
  ['Naturalist & mountaineer', 'Basic & Advanced Mountaineering, Search & Rescue trained. Has been walking these forests for years.'],
  ['Lead birder', 'Finds birds by ear first. Keeps the checklist, knows the foothill species by call.'],
  ['Trip planner', 'Handles permits, zones, stays and transfers, and stays on call while you travel.'],
];

const FAQ = [
  ['How do I book?', `Call or WhatsApp us on ${SITE.phone}. Tell us where and when, and we'll send an itinerary with a clear price.`],
  ['How much does a trip cost?', 'It depends on the park, the number of safaris, the stay and group size. You get an all-in price before you pay anything.'],
  ['Can you guarantee a tiger sighting?', 'No one honestly can. We maximise your chances with the right season, zones and number of drives.'],
  ['Do I need experience for birding?', 'Not at all. We pace walks for beginners. Serious birders can send us their target species.'],
  ['How far ahead should I book?', 'Peak-season safari permits (March–May) sell out early, so 60–90 days ahead is ideal. Birding is more flexible.'],
];

const NOTES = [ // Field Notes (blog) sample posts
  ['Trip report', 'Four days in Sattal: 112 species and one very shy scimitar babbler', 'sattal'],
  ['Guide', 'Tadoba core vs buffer zones: which safari should you book?', 'tadoba'],
  ['Ethics', 'Why we never use bird playback, even for a lifer', 'dharamshala'],
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Fill [data-site] text, wire WhatsApp/call/email links, enquiry forms and the blog flag.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-site]').forEach(el => el.textContent = SITE[el.dataset.site]);
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa || undefined); a.target = '_blank'; });
  document.querySelectorAll('[data-tel]').forEach(a => a.href = `tel:+${SITE.phoneRaw}`);
  document.querySelectorAll('[data-mail]').forEach(a => a.href = `mailto:${SITE.email}`);
  document.querySelectorAll('[data-blog]').forEach(el => el.hidden = !SITE.showBlog);
  // Enquiry forms go straight to WhatsApp with a pre-filled message: no backend needed.
  document.querySelectorAll('form[data-enquiry]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const v = n => (f.elements[n] && f.elements[n].value) || '';
    const msg = `Hi We Rove! I'm ${v('name') || '...'}.\nTrip: ${v('type')}\nDestination: ${v('dest')}\nWhen: ${v('when')}\nTravellers: ${v('people')}\n${v('notes')}`;
    window.open(waLink(msg.trim()), '_blank');
  }));
});

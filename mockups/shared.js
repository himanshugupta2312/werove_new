// Shared content for all mockups. Edit here once; every theme picks it up.
const SITE = {
  phone: '+91 96543 43996',
  phoneRaw: '919654343996',
  email: 'info@werove.in',                      // public address (forwards to the Gmail as well)
  emailAlt: 'werove.in@gmail.com',
  instagram: 'https://www.instagram.com/werove.in/',
  facebook: 'https://www.facebook.com/werove.in',                       // Facebook Page
  facebookGroup: 'https://www.facebook.com/groups/803743606476849',     // Rovers community group
  // Field Notes (blog) stays hidden until there are posts. Preview it with ?blog in the URL.
  showBlog: new URLSearchParams(location.search).has('blog'),
};

const waLink = (msg = 'Hi We Rove, I would like to plan a trip.') =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;

// m = season string Jan..Dec: 2 best, 1 open, 0 closed/off (approximate)
const DESTS = [
  { slug: 'tadoba', name: 'Tadoba-Andhari', region: 'Maharashtra', type: ['safari', 'birding'],
    blurb: "Maharashtra's oldest and largest tiger reserve: teak forest, lakes, and some of India's most reliable tiger sightings.",
    see: 'Tiger, leopard, sloth bear, dhole, gaur', best: 'Mar – May', reach: 'Nagpur airport, ~3 hrs', tags: ['tiger', 'birding'], birds: 'Crested serpent eagle, Indian peafowl, Indian pitta', m: '112221000111' },
  { slug: 'pench', name: 'Pench', region: 'Madhya Pradesh', type: ['safari', 'birding'],
    blurb: 'The teak-and-bamboo forest behind The Jungle Book, along the Pench river. Quieter than the big-name parks.',
    see: 'Tiger, leopard, dhole, gaur', best: 'Feb – May', reach: 'Nagpur airport, ~2.5 hrs', tags: ['tiger', 'birding'], birds: 'Indian peafowl, crested serpent eagle, red-wattled lapwing', m: '122221000111' },
  { slug: 'ranthambore', name: 'Ranthambore', region: 'Rajasthan', type: ['safari', 'birding'],
    blurb: 'Tigers among the ruins of a 10th-century fort, with lakes, crocodiles and dry deciduous forest.',
    see: 'Tiger, leopard, sloth bear, mugger crocodile', best: 'Mar – May', reach: 'Sawai Madhopur rail, 20 min', tags: ['tiger', 'birding'], birds: 'Indian peafowl, painted spurfowl, Indian eagle-owl', m: '112221000111' },
  { slug: 'corbett', name: 'Jim Corbett', region: 'Uttarakhand', type: ['safari', 'birding'],
    blurb: "India's first national park. Tigers and elephants in the grasslands, and 550+ bird species along the Ramganga and Kosi.",
    see: 'Tiger, elephant, great hornbill, ibisbill', best: 'Nov – May', reach: 'Delhi, ~6 hrs by road', tags: ['tiger', 'birding'], birds: 'Great hornbill, ibisbill, river and forest birds', m: '222211000122' },
  { slug: 'sattal', name: 'Sattal', region: 'Uttarakhand', type: ['birding'],
    blurb: "Seven connected lakes in oak and pine forest, one of north India's classic birding sites.",
    see: 'Red-billed blue magpie, scimitar babblers, kalij pheasant', best: 'Oct – Apr', reach: 'Kathgodam rail, ~1.5 hrs', tags: ['birding'], m: '222211000122' },
  { slug: 'dharamshala', name: 'Dharamshala & around', region: 'Himachal Pradesh', type: ['birding'],
    blurb: 'The Dhauladhar foothills, with 300+ species from the Kangra valley floor up to Kareri lake.',
    see: 'Lammergeier, Himalayan griffon, white-capped redstart', best: 'Oct – Apr', reach: 'Gaggal airport, ~30 min', tags: ['birding'], m: '222211000122' },
];

// Wildlife you can look for. The map legend and filters are built from this, so a new kind of spot
// (leopard, cheetah, rhino, elephant) only needs one line in DESTS: tags: ['leopard', 'birding'].
// Tiger reserves are also birding spots by default; birding-only places (Sattal, Dharamshala) are not tiger spots.
const WILDLIFE = {
  tiger:    { label: 'Tiger',    color: '#d9774b' },
  birding:  { label: 'Birding',  color: '#3f8a86' },
  leopard:  { label: 'Leopard',  color: '#c9972e' },
  cheetah:  { label: 'Cheetah',  color: '#b8742a' },
  rhino:    { label: 'Rhino',    color: '#7a6aa8' },
  elephant: { label: 'Elephant', color: '#6b7a8f' },
};

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

// Draft copy: replace the persona lines with the real people's own words. Names stay private; personality does not.
// photo: a field photo (hands on binoculars, a silhouette at dawn) works without showing a face.
const CREW2 = [
  { role: 'The Tracker', title: 'Naturalist & mountaineer', promise: 'Reads the forest floor like a newspaper.',
    credentials: ['Basic & Advanced Mountaineering', 'Search & Rescue trained'],
    ask: ['Tiger behaviour', 'Reading pugmarks', 'Staying safe in the wild'], quote: 'The best sighting is the one the animal never knew about.' },
  { role: 'The Birder', title: 'Lead birder', promise: 'Hears the bird before it shows itself.',
    credentials: ['Keeps the trip checklist', 'Knows the foothill species by call'],
    ask: ['Beginner birding', 'Bird calls', 'Photography without disturbance'], quote: 'Listen first. The forest will tell you where to look.' },
  { role: 'The Planner', title: 'Trip planner', promise: 'Sorts the permits so you only think about the forest.',
    credentials: ['Permits, zones & stays', 'On call while you travel'],
    ask: ['Best season for your wish list', 'Group trips & families', 'Last-minute changes'], quote: 'You talk to the same person who plans and leads your trip.' },
];

const FAQ = [
  ['How much does a trip cost?', 'It depends on the park, the number of safaris, the stay and the group size. You get an all-in price before you pay anything.'],
  ['Can you guarantee a tiger sighting?', 'No one honestly can. We maximise your chances with the right season, zones and number of drives.'],
  ['Do I need experience for birding?', 'Not at all. We pace walks for beginners. Serious birders can send us their target species.'],
  ['When should I book?', 'Safaris sell out in peak season, in both summer and winter, so we recommend booking as soon as you know your dates. As a rule of thumb, book 2–3 months ahead. Birding trips are more flexible, but earlier is still better.'],
  ["What's included, and what's not?", "In general, we include pick-up and drop between the nearest airport, railway or bus station and the location, food, lodging, and safaris with guides. Some guests only want lodging, a guide and food, and we can do that too. Not included: extra food and drinks, tips, and flights or travel to the location. We can arrange travel for you, but the price will be higher. Anything not listed as included is excluded, and we confirm everything in writing with your itinerary."],
  ['How big can the group be?', 'For safaris we recommend groups in multiples of four. A jeep can seat up to six guests, but that can be a tight fit, so four is the comfortable number. For birding, up to six is a good size. We can take larger groups, but we may split them into smaller ones, so everyone gets better coverage and the wildlife is disturbed less.'],
  ['What ID do I need?', 'Every guest needs a valid photo ID for safari permits: Aadhaar, passport, driving licence or a similar government ID. International guests need their passport.'],
  ['Can kids and senior travellers join?', "Yes. If a trip may be hard for a particular age group, we'll tell you honestly, and we can make special arrangements for any age. Children must travel with their parents or guardians."],
  ['How do payments work, and what if I need to cancel?', 'To confirm a trip we take an advance by bank transfer or UPI, and the balance before travel. The details are flexible and can be discussed on a call. Our refund terms are in the Cancellation & refund policy.'],
  ['How do I book?', `Call or WhatsApp us on ${SITE.phone}. Tell us where and when, and we'll send an itinerary with a clear price.`],
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
    const place = /^others|^elsewhere/i.test(v('dest')) ? (v('dest_other') || 'somewhere else (to be discussed)') : v('dest');
    const msg = `Hi We Rove! I'm ${v('name') || '...'}.\nTrip: ${v('type')}\nDestination: ${place}\nWhen: ${v('when')}\nTravellers: ${v('people')}\n${v('notes')}`;
    window.open(waLink(msg.trim()), '_blank');
  }));
});

// Builds the combined sample page. Sections, in order:
//   header (logo · nav · phone · WhatsApp / Instagram / Facebook icons · theme toggle)
//   hero (1–2 big images) → finder bar → Where do we rove? → How we travel
//   → For the travellers, by the travellers → Who guides you → Recent sightings
//   → FAQ → contact → footer. No "when to go" section.
(function () {
  const ICON = {
    wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.9a8.1 8.1 0 1 1-4.3 15l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 0 1 12 3.9z"/><path d="M8.6 7.5c-.3 0-.7.2-.9.8-.3.8-.2 1.9.9 3.5 1.4 2 3 3 4.6 3.3.9.2 1.7-.2 2-.9.1-.3.1-.6 0-.7l-1.4-.9c-.2-.1-.5 0-.7.2l-.5.6c-.2.2-.4.2-.6.1-.9-.4-1.9-1.2-2.4-2.2-.1-.2-.1-.4 0-.6l.5-.6c.1-.2.2-.4.1-.6L9.5 7.8c-.1-.2-.4-.3-.9-.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.2-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>',
    fb: '<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9s-1.3-.3-2.6-.3c-2.7 0-4.4 1.6-4.4 4.5v2.4H7v3.3h2.9V22z"/></svg>',
    tel: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5zM4 7.2V18h16V7.2l-8 6.1z"/></svg>',
    sun: '<svg class="sunic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.6"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24"><path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5 8.6 8.6 0 1 0 20.5 14.6z"/></svg>',
  };
  const FEATHER = '<svg width="0" height="0" style="position:absolute"><defs><clipPath id="wrVane"><path d="M50 3C59 8 68 22 69 40 70 58 63 71 52 78L50 79 48 78C41 70 36 57 37 41 38 23 44 9 50 3Z"/></clipPath><mask id="wrNotch" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><path d="M72 27 53 41 72 33Z M34 50 48 63 34 57Z" fill="#000"/></mask><symbol id="wr-feather" viewBox="0 0 100 100"><g transform="rotate(30 50 50)"><g mask="url(#wrNotch)"><path d="M50 3C59 8 68 22 69 40 70 58 63 71 52 78L50 79 48 78C41 70 36 57 37 41 38 23 44 9 50 3Z" fill="#e2892f"/><g clip-path="url(#wrVane)" fill="#1d211c"><path d="M30 22C38 21 44 18 49 11 46 21 40 26 30 29Z"/><path d="M72 36C63 35 56 32 51 25 54 35 61 40 72 43Z"/><path d="M30 42C38 41 44 38 49 31 46 41 40 46 30 49Z"/><path d="M72 56C63 55 56 52 51 45 54 55 61 60 72 63Z"/><path d="M30 63C38 62 44 59 49 52 46 62 40 67 30 70Z"/></g></g><path d="M48.5 80l-6 5M48.5 84l-5 5M51.5 80l6 5M51.5 84l5 5" stroke="#e2892f" stroke-width="1.6" stroke-linecap="round"/><path d="M50 8V98" stroke="var(--fg,#1d211c)" stroke-width="2.6" stroke-linecap="round"/></g></symbol></defs></svg>';
  const FEATHER_LOGO = '<svg viewBox="0 0 100 100"><use href="#wr-feather" style="--fg:var(--ink)"/></svg>';
  const USE_OG = new URLSearchParams(location.search).get('logo') !== 'feather';   // original logo by default; ?logo=feather for the feather
  const LOGO = USE_OG ? '<img class="logo-og" src="img/logo-og.png" alt="We Rove">' : FEATHER_LOGO;
  const WORDMARK = USE_OG ? '' : 'We Rove';
  const PUG = '<svg viewBox="0 0 100 100" fill="currentColor"><path d="M33 63C33 51 41 46 50 46S67 51 67 63C67 71 62 74 58 71 55 69 53 74 50 74S45 69 42 71C38 74 33 71 33 63Z"/><ellipse cx="31" cy="40" rx="6" ry="8" transform="rotate(-22 31 40)"/><ellipse cx="43" cy="30" rx="6" ry="8.5" transform="rotate(-6 43 30)"/><ellipse cx="57" cy="30" rx="6" ry="8.5" transform="rotate(6 57 30)"/><ellipse cx="69" cy="40" rx="6" ry="8" transform="rotate(22 69 40)"/></svg>';
  const SIGHTINGS = [['pink-browed-rosefinch', 'Pink-browed Rosefinch'], ['eurasian-wren', 'Eurasian Wren'], ['indian-peafowl', 'Indian Peafowl'], ['pied-kingfisher', 'Pied Kingfisher'],
    ['indian-silverbill', 'Indian Silverbill'], ['verditer-flycatcher', 'Verditer Flycatcher'], ['lesser-florican', 'Lesser Florican'], ['indian-pitta', 'Indian Pitta']];
  const CREWART = [
    '<svg viewBox="0 0 64 64"><path d="M6 54L26 20l10 16 8-10 14 28Z"/><path class="ac" d="M20 34l6-10 6 10"/></svg>',
    '<svg viewBox="0 0 64 64"><circle cx="21" cy="40" r="12"/><circle cx="45" cy="40" r="12"/><path d="M30 34h4M14 30l3-10h9l1 8M50 30l-3-10h-9l-1 8"/><circle class="ac" cx="21" cy="40" r="4"/></svg>',
    '<svg viewBox="0 0 64 64"><path d="M8 18l16-6 16 6 16-6v40l-16 6-16-6-16 6Z"/><path d="M24 12v40M40 18v40"/><path class="ac" d="M12 42q8-12 18-6t22-10"/></svg>'];

  // upcoming months for the finder
  const months = () => { const out = [], d = new Date(); d.setDate(1);
    for (let i = 0; i < 9; i++) { out.push(d.toLocaleString('en-GB', { month: 'short', year: 'numeric' })); d.setMonth(d.getMonth() + 1); } return out; };

  // Hero pictures and videos for the full-width hero. Add a video like this once the files exist:
  //   { type: 'video', src: 'media/tiger-slowmo.mp4', poster: 'img/bengal-tiger.webp', alt: 'Tiger, slow motion' }
  const HERO_MEDIA = [
    { type: 'image', src: 'img/bengal-tiger.webp', alt: 'Bengal tiger' },
    { type: 'image', src: 'img/pied-kingfisher.webp', alt: 'Pied kingfisher' },
  ];
  const slideHtml = (m, i) => m.type === 'video'
    ? `<video class="slide${i ? '' : ' on'}" src="${m.src}" poster="${m.poster || ''}" muted playsinline preload="metadata" aria-label="${m.alt || ''}"></video>`
    : `<img class="slide${i ? '' : ' on'}" src="${m.src}" alt="${m.alt || ''}">`;
  const hero = (v) => {
    const t = `<span class="hand">safari &amp; birding · India</span>
      <h1>Wild India, at the <em>forest's pace.</em></h1>
      <p>Small-group tiger safaris and birding trips, planned by people who keep going back.<span class="draft">draft text</span></p>
      <div class="ctas"><a class="btn w" data-wa>${ICON.wa.replace('<svg','<svg width="20" height="20" fill="currentColor"')} Chat on WhatsApp</a><a class="btn o" data-tel>Call us</a></div>`;
    if (v === 'v4') return `<header class="hero"><div class="cine"><div class="slides" id="slides">${HERO_MEDIA.map(slideHtml).join('')}</div>
      <div class="in"><div class="txt">${t}</div></div>
      ${HERO_MEDIA.length > 1 ? `<div class="sdots" id="sdots">${HERO_MEDIA.map((m, i) => `<button class="${i ? '' : 'on'}" data-i="${i}" aria-label="Show slide ${i + 1}"></button>`).join('')}</div>` : ''}</div></header>`;
    if (v === 'v3') return `<header class="hero"><div class="wrap"><div>${t}</div><div class="stage"><img class="a" src="img/bengal-tiger.webp" alt="Bengal tiger"><img class="b" src="img/pied-kingfisher.webp" alt="Pied kingfisher"></div></div></header>`;
    const art = v === 'v2' ? `<svg class="art" viewBox="0 0 560 660" fill="none" stroke-linecap="round"><g stroke-width="1.6"><path stroke="var(--accent2)" d="M40 330A240 240 0 0 1 520 330"/><path stroke="var(--accent)" d="M60 330A220 220 0 0 1 500 330"/><path stroke="#d6a13f" d="M80 330A200 200 0 0 1 480 330"/><circle stroke="#d6a13f" cx="474" cy="62" r="24"/><path stroke="#d6a13f" d="M474 22V12M474 112V102M434 62H424M524 62H514M446 34l-7-7M502 90l7 7M502 34l7-7M446 90l-7 7"/><path stroke="var(--ink)" d="M120 150q8-8 16 0q8-8 16 0M160 120q6-6 12 0q6-6 12 0"/></g></svg>` : '';
    return `<header class="hero"><div class="wrap"><div>${t}</div><div class="stage"><img class="a" src="img/bengal-tiger.webp" alt="Bengal tiger"><img class="b" src="img/verditer-flycatcher.webp" alt="Verditer flycatcher">${art}</div></div></header>`;
  };

  window.COMBO = {
    mount(v, opts = {}) {
      document.body.classList.add(v);
      const useMap = !!opts.map && window.ATLAS && typeof INDIA !== 'undefined';
      const dest = DESTS;
      const html = `${FEATHER}
      <div class="top"><div class="wrap">
        <a class="logo" href="#">${LOGO}${WORDMARK}</a>
        <ul class="nav" id="nav"><li><a href="#where">Where we rove</a></li><li><a href="#travel">How we travel</a></li><li><a href="#story">About us</a></li><li><a href="#sightings">Sightings</a></li><li><a href="#faq">FAQ</a></li><li><a href="#contact">Contact</a></li></ul>
        <a class="phone" data-tel data-site="phone"></a>
        <div class="icons">
          <a class="ic wa" data-wa title="WhatsApp" aria-label="WhatsApp">${ICON.wa}</a>
          <a class="ic" href="${SITE.instagram}" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">${ICON.ig}</a>
          <a class="ic" href="${SITE.facebook}" target="_blank" rel="noopener" title="Facebook" aria-label="Facebook">${ICON.fb}</a>
          <button class="ic" id="modebtn" title="Switch day / night" aria-label="Switch day or night">${ICON.sun}${ICON.moon}</button>
          <button class="ic burger" id="burger" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg></button>
        </div>
      </div></div>

      ${useMap && v !== 'v4' ? hero(v).replace('<header class="hero">', '<header class="hero">' + ATLAS.bg()) : hero(v)}

      <div class="wrap"><form class="finder" data-enquiry>
        <label>I want to<select name="type"><option>Go on safari</option><option>Go birding</option><option>Do both</option></select></label>
        <label>Where<select name="dest"><option>Help me choose</option>${dest.map(d => `<option>${d.name}</option>`).join('')}<option>Others (type a location)</option></select><input name="dest_other" placeholder="Type a location" hidden></label>
        <label>When<select name="when"><option>Flexible</option>${months().map(m => `<option>${m}</option>`).join('')}</select></label>
        <label>Travellers<input name="people" type="number" value="2" min="1"></label>
        <button class="btn w">Plan on WhatsApp →</button>
      </form></div>

      <section id="where"><div class="wrap">${useMap ? ATLAS.section() : `
        <div class="head"><span class="hand">popular destinations</span><h2>Where do we <em>rove?</em></h2>
        <p class="muted">Tiger country first, then the birding foothills. These are the places travellers ask us about most, and every trip is planned around your dates and group.</p></div>
        <div class="tabs" id="tabs"><button class="on" data-f="all">All</button><button data-f="safari">Safari</button><button data-f="birding">Birding</button></div>
        <div class="grid" id="grid"></div>`}
      </div></section>

      <section class="travel" id="travel" style="padding-top:20px"><div class="wrap"><div class="block">
        <span class="hand">how we travel</span>
        <h2>Leave life alone, and it will <em>flourish.</em></h2>
        <p style="max-width:620px;opacity:.88">It's our first rule. We'd rather miss a photo than stress an animal.</p>
        <div class="rules">${ETHICS.map(([a, b]) => `<div class="rule"><b>${a}</b><span>${b}</span></div>`).join('')}</div>
      </div></div></section>

      <section class="story" id="story"><div class="wrap">
        <div class="imgs"><img src="img/pied-kingfisher.webp" alt=""><img src="img/indian-pitta.webp" alt=""></div>
        <div class="abouttext">
          <span class="hand">about us</span>
          <h2>For the travellers, <em>by the travellers</em></h2>
          <div class="ablock"><h3>Our mission</h3>
            <blockquote>&ldquo;The world is a book, and those who don't travel read only one page.&rdquo;</blockquote>
            <p>At We Rove we put the experiences of Rovers, for Rovers, in one place, so the love and care you'd want while travelling is there for anyone who needs it. We're building a community held together by trust and affection, and our goal is simple: to give everyone a reason to travel, with quality and security always first.</p></div>
          <div class="ablock"><h3>Our story</h3>
            <p>A wise man once said, &ldquo;Adventure is out there&rdquo;, and we truly believe it. One fine Republic Day, while roaming the jungles of Corbett, our friend, a veteran mountaineer and naturalist turned tour operator (and a bird lover, not to forget), suggested a community that could help people everywhere travel more smoothly. Others had been turning over similar ideas, the kind of work that gives a deeper satisfaction than any corporate job could. We believe that community should connect Rovers with fellow Rovers, to find the best of places: common, uncommon, unexplored and popular.</p></div>
          <div class="ablock"><h3>Meet the team</h3>
            <p>We are a group of passionate travellers and photographers from four different states. We met through a shared love of the outdoors in Delhi NCR, and decided to work together.</p>
            <a class="btn p" data-wa="Hi We Rove, I'd like to know more about you and how you travel.">Say hello on WhatsApp</a></div>
        </div>
      </div></section>

      <section id="sightings" style="padding:30px 0 70px">
        <div class="wrap"><div class="head"><span class="hand">from the field</span><h2>Recent <em>sightings</em></h2></div></div>
        <div class="strip">${SIGHTINGS.map(([f, n]) => `<figure><img src="img/${f}.webp" alt="${n}"><figcaption>${n}</figcaption></figure>`).join('')}</div>
      </section>

      <section data-blog style="padding-top:20px"><div class="wrap"><div class="head"><span class="hand">field notes</span><h2>From the <em>journal</em></h2></div>
        <div class="notes">${NOTES.map(([c, t, img]) => `<a class="note" href="#"><img src="img/${img}.webp" alt=""><small>${c}</small><b>${t}</b></a>`).join('')}</div></div></section>

      <section class="faq" id="faq"><div class="wrap">
        <div class="head"><span class="hand">questions</span><h2><em>FAQ</em></h2><p class="muted">The things people ask us most. If yours isn't here, we're only a call or a message away.</p></div>
        <div class="faqlist">${FAQ.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${q}</summary><p>${a}</p></details>`).join('')}
          <details class="more" open><summary>Need more information, or have another question?</summary>
            <p>Call us or message us on WhatsApp, and we'll answer in plain words.</p>
            <div class="morebtns"><a class="btn w" data-wa>${ICON.wa.replace('<svg', '<svg width="20" height="20" fill="currentColor"')} WhatsApp us</a><a class="btn p" data-tel>Call <span data-site="phone"></span></a><a class="btn o" data-mail>Email us</a></div></details></div>
      </div></section>

      <section id="contact" style="padding-top:20px"><div class="wrap"><div class="cta">
        <div>
          <span class="hand">plan a trip</span>
          <h2>Tell us what you want <em>to see.</em></h2>
          <p class="muted">Call or WhatsApp is quickest. The form opens WhatsApp with your details filled in.</p>
          <div class="direct">
            <a data-wa><span class="ic wa">${ICON.wa}</span><span><span data-site="phone"></span><small>WhatsApp, fastest reply</small></span></a>
            <a data-tel><span class="ic">${ICON.tel}</span><span><span data-site="phone"></span><small>Call us</small></span></a>
            <a data-mail><span class="ic">${ICON.mail}</span><span><span data-site="email"></span><small>Email</small></span></a>
            <a href="${SITE.instagram}" target="_blank" rel="noopener"><span class="ic">${ICON.ig}</span><span>@werove.in<small>Instagram</small></span></a>
            <a href="${SITE.facebook}" target="_blank" rel="noopener"><span class="ic">${ICON.fb}</span><span>We Rove on Facebook<small>Our Facebook page</small></span></a>
            <a href="${SITE.facebookGroup}" target="_blank" rel="noopener"><span class="ic">${ICON.fb}</span><span>Rovers community group<small>Join the Facebook group</small></span></a>
          </div>
        </div>
        <form class="enq" data-enquiry>
          <label>Name<input name="name"></label><label>Travellers<input name="people" type="number" value="2"></label>
          <label>Trip type<select name="type"><option>Safari</option><option>Birding</option><option>Both</option></select></label>
          <label>Destination<select name="dest"><option>Help me choose</option>${dest.map(d => `<option>${d.name}</option>`).join('')}<option>Others (type a location)</option></select><input name="dest_other" placeholder="Type a location" hidden></label>
          <label class="full">Dates<input name="when" placeholder="e.g. mid-March, 4 nights"></label>
          <label class="full">Anything else<textarea name="notes" rows="3" placeholder="Target species, photography, budget, kids, mobility..."></textarea></label>
          <button class="btn w full">Send on WhatsApp →</button>
        </form>
      </div></div></section>

      <footer><div class="wrap">
        <div><span class="logo" style="margin-bottom:6px">${LOGO}${WORDMARK}</span>Safari &amp; birding trips in India · <a data-mail data-site="email"></a></div>
        <div class="icons"><a class="ic wa" data-wa aria-label="WhatsApp">${ICON.wa}</a><a class="ic" href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a class="ic" href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a></div>
        <div class="modes" title="Theme follows your local time unless you pick one"><button data-m="auto">Auto</button><button data-m="day">Day</button><button data-m="night">Night</button></div>
        <div>© We Rove · Terms · Privacy</div>
      </div>${useMap ? '<div class="wrap"><p class="mapnote">Map outline: DataMeet India boundaries (CC0), following the official boundary of India. Illustrative, not to scale. Positions are approximate.</p></div>' : ''}</footer>
      <div class="float"><a data-tel style="background:var(--card);color:var(--ink)" aria-label="Call">${ICON.tel}</a><a data-wa style="background:var(--wa);color:#fff" aria-label="WhatsApp">${ICON.wa}</a></div>`;
      document.getElementById('app').innerHTML = html;

      // destinations
      if (useMap) { ATLAS.bind(); }
      const card = d => `<article class="dcard" data-t="${d.type.join(' ')}"><div class="im"><img src="img/${d.slug}.webp" alt=""></div><div class="in">
        <h3>${d.name}</h3><div class="reg">${d.region}</div><div class="chips">${d.type.map(t => `<span class="chip ${t[0]}">${t}</span>`).join('')}</div>
        <p>${d.blurb}</p><div class="best">Best <b>${d.best}</b></div>
        <a class="go" data-wa="Hi We Rove, I'd like a trip to ${d.name}.">Plan ${d.name.split(/[ -]/)[0]} on WhatsApp →</a></div></article>`;
      if (!useMap) document.getElementById('grid').innerHTML = dest.map(card).join('') +
        `<div class="ask"><div><h3>Somewhere else in mind?</h3><p>If it's wild and in India, ask us. Kaziranga, the Sundarbans, Bandhavgarh, Latpanchar...</p></div><a class="btn p" data-wa="Hi We Rove, I'd like a trip to:">Ask on WhatsApp</a></div>`;
      if (!useMap) document.getElementById('tabs').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('on', x === b));
        document.querySelectorAll('#grid .dcard').forEach(c => c.style.display = (b.dataset.f === 'all' || c.dataset.t.includes(b.dataset.f)) ? '' : 'none');
      });
      document.getElementById('burger').onclick = () => document.getElementById('nav').classList.toggle('open');
      document.getElementById('nav').addEventListener('click', () => document.getElementById('nav').classList.remove('open'));
      // "Others": reveal a box to type any location
      document.querySelectorAll('select[name=dest]').forEach(s => {
        const o = s.closest('label').querySelector('[name=dest_other]'); if (!o) return;
        s.addEventListener('change', () => { o.hidden = !/^others/i.test(s.value); if (!o.hidden) o.focus(); });
      });
      // hero slideshow (images and, later, slow-motion videos)
      const slides = [...document.querySelectorAll('#slides .slide')];
      if (slides.length) {
        let cur = 0, timer;
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const go = n => {
          slides[cur].classList.remove('on'); if (slides[cur].tagName === 'VIDEO') slides[cur].pause();
          cur = (n + slides.length) % slides.length; slides[cur].classList.add('on');
          if (slides[cur].tagName === 'VIDEO') { slides[cur].currentTime = 0; slides[cur].play().catch(() => {}); }
          document.querySelectorAll('#sdots button').forEach((b, i) => b.classList.toggle('on', i === cur));
        };
        const run = () => { clearInterval(timer); if (slides.length > 1 && !reduce) timer = setInterval(() => go(cur + 1), slides[cur].tagName === 'VIDEO' ? 14000 : 8000); };
        document.querySelectorAll('#sdots button').forEach(b => b.onclick = () => { go(+b.dataset.i); run(); });
        run();
      }
      // theme controls
      document.getElementById('modebtn').onclick = () => WR_THEME.set(document.documentElement.dataset.theme === 'night' ? 'day' : 'night');
      document.querySelectorAll('.modes button').forEach(b => b.onclick = () => WR_THEME.set(b.dataset.m));
    },
  };
})();

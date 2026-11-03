// Interactive map of India for the combined samples.
// Needs india-outline.js (INDIA), shared.js (DESTS, WILDLIFE, waLink, MONTHS) and combo.css.
//  - ATLAS.section()  "Where do we rove?" as a clickable map + detail panel + list
//  - ATLAS.bind()     wires pins, filters, list, share button, ?place=slug deep links, draw-on animation
// Pins, legend and filters are built from each destination's `tags` (see WILDLIFE in shared.js):
// to add leopard, cheetah, rhino or elephant spots later, add a DESTS entry with tags: ['leopard', 'birding'] and a POS entry below.
(function () {
  // [lon, lat], approximate. Illustrative only.
  const POS = { tadoba: [79.4, 20.25], pench: [79.3, 21.7], ranthambore: [76.5, 26.0], corbett: [78.9, 29.5], sattal: [79.57, 29.35], dharamshala: [76.3, 32.2] };
  const SIDE = { tadoba: 'r', pench: 'l', ranthambore: 'l', corbett: 'l', sattal: 'r', dharamshala: 'l' };
  // Places people also ask about: quiet "ask us" pins, not products. [name, lon, lat, label side, what it's known for]
  const GHOST = [
    ['Kaziranga', 93.4, 26.6, 'bt', 'One-horned rhinos, tigers, elephants and rich birdlife.'],
    ['Sundarbans', 88.9, 21.95, 'r', 'Mangrove tiger country, explored by boat, with plenty of birds.'],
    ['Bandhavgarh', 81.03, 23.7, 'r', 'Dense tiger country, also good for birding.'],
    ['Latpanchar', 88.35, 26.9, 'l', 'Himalayan foothill birding.'],
    ['Lakshadweep', 72.75, 10.6, 'r', 'A coral island group in the Arabian Sea.', 'hot'],
    ['Andaman & Nicobar', 92.9, 11.9, 'l', 'Island groups in the Bay of Bengal, with forests, reefs and island birdlife.', 'hot'],
  ];
  const pct = (lon, lat) => { const [x, y] = INDIA.project(lon, lat); return [(x / INDIA.w * 100).toFixed(2), (y / INDIA.h * 100).toFixed(2)]; };
  const tagColor = t => (WILDLIFE[t] || { color: '#888' }).color;
  const tagLabel = t => (WILDLIFE[t] || { label: t }).label;
  const present = Object.keys(WILDLIFE).filter(t => DESTS.some(d => d.tags.includes(t)));   // only kinds that exist today

  window.ATLAS = {
    bg() {   // faint outline behind a hero (used by atlas samples 1-3)
      return `<div class="mapbg" aria-hidden="true"><svg viewBox="0 0 ${INDIA.w} ${INDIA.h}"><path d="${INDIA.d}"/></svg></div>`;
    },
    section() {
      const pins = DESTS.map(d => { const [x, y] = pct(...POS[d.slug]);
        return `<button class="mpin ${SIDE[d.slug]}" data-s="${d.slug}" data-tags="${d.tags.join(' ')}" style="left:${x}%;top:${y}%;--c:${tagColor(d.tags[0])};--c2:${d.tags[1] ? tagColor(d.tags[1]) : 'var(--card)'}" aria-label="${d.name}"><i></i><span>${d.name.replace(' & around', '')}</span></button>`; }).join('');
      const ghosts = GHOST.map(([n, lo, la, sd, , hot]) => { const [x, y] = pct(lo, la);
        return `<button class="mpin g ${hot ? 'hot ' : ''}${sd}" data-s="g:${n}" data-tags="" style="left:${x}%;top:${y}%" aria-label="${n}, ask us"><i></i><span>${n}</span></button>`; }).join('');
      const legend = present.map(t => `<span><i style="background:${tagColor(t)}${t !== 'birding' && DESTS.some(d => d.tags[0] === t && d.tags.includes('birding')) ? `;box-shadow:0 0 0 2px var(--card),0 0 0 4px ${tagColor('birding')}` : ''}"></i>${tagLabel(t)}${t !== 'birding' ? ' &amp; birding' : ''}</span>`).join('')
        .replace(/>Birding &amp; birding</, '>Birding only<');
      const filters = `<button class="on" data-f="all">All</button>` + present.map(t => `<button data-f="${t}">${tagLabel(t)}</button>`).join('');
      return `<div class="head"><span class="hand">tap a pin</span><h2>Where do we <em>rove?</em></h2>
        <p class="muted">Tiger country on your mind, or a birding haven? We have it all for you. Just tap a pin to know more about the locations.</p></div>
        <div class="tabs mfilters" id="mfilters">${filters}</div>
        <div class="atlas">
          <div class="mapcard" id="mapcard">
            <div class="mapin">
              <svg class="india" viewBox="0 0 ${INDIA.w} ${INDIA.h}" role="img" aria-label="Map of India with our popular destinations"><path id="indiapath" pathLength="1" d="${INDIA.d}"/><path class="isl" d="${INDIA.dots}"/></svg>
              ${pins}${ghosts}
            </div>
            <div class="mlegend">${legend}<span><i class="g"></i>Ask us</span><small>Illustrative map, not to scale.</small></div>
          </div>
          <aside class="mpanel" id="mpanel" aria-live="polite"></aside>
        </div>`;
    },
    bind() {
      const panel = document.getElementById('mpanel'); if (!panel) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const show = key => {
        document.querySelectorAll('.mpin').forEach(e => e.classList.toggle('on', e.dataset.s === key));
        if (key.startsWith('g:')) {
          const n = key.slice(2), g = GHOST.find(x => x[0] === n);
          panel.innerHTML = `<span class="hand">on request</span><h3>${n}</h3><p class="muted">${g[4]}</p><p class="muted">${n} isn't one of the places we run most often, but people ask us about it, and we plan trips well beyond the map. Tell us when and who's coming and we'll take it from there.</p>
            <div class="pbtns"><a class="btn p" data-wa="Hi We Rove, I'd like a trip to ${n}.">Ask about ${n} on WhatsApp</a></div>`;
        } else {
          const d = DESTS.find(x => x.slug === key);
          panel.innerHTML = `<div class="im"><img src="img/${d.slug}.webp" alt=""></div>
            <div class="chips">${d.tags.map(t => `<span class="chip" style="color:${tagColor(t)}">${tagLabel(t)}</span>`).join('')}</div>
            <h3>${d.name}</h3><div class="reg">${d.region}</div><p class="muted">${d.blurb}</p>
            <dl><dt>Look for</dt><dd>${d.see}</dd>${d.birds ? `<dt>Birds</dt><dd>${d.birds}</dd>` : ''}<dt>Best time</dt><dd>${d.best}</dd><dt>Getting there</dt><dd>${d.reach}</dd></dl>
            <div class="pbtns"><a class="btn w" data-wa="Hi We Rove, I'd like a trip to ${d.name}.">Plan ${d.name.split(/[ -]/)[0]} on WhatsApp</a><button class="btn o" id="shareb">Share this place</button></div><div class="toast" id="toast"></div>`;
          document.getElementById('shareb').onclick = () => {
            const url = location.href.split('#')[0].split('?')[0] + '?place=' + d.slug + '#where';
            const text = `${d.name}, ${d.region}: safari and birding trips with We Rove`;
            if (navigator.share) navigator.share({ title: 'We Rove: ' + d.name, text, url }).catch(() => {});
            else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => { document.getElementById('toast').textContent = 'Link copied'; });
          };
        }
        panel.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa || undefined); a.target = '_blank'; });
      };
      document.getElementById('mapcard').addEventListener('click', e => { const p = e.target.closest('.mpin'); if (p) show(p.dataset.s); });
      // filter: dim pins and list entries that don't match the chosen wildlife
      document.getElementById('mfilters').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        document.querySelectorAll('#mfilters button').forEach(x => x.classList.toggle('on', x === b));
        document.querySelectorAll('.mpin:not(.g)').forEach(el => el.classList.toggle('dim', b.dataset.f !== 'all' && !el.dataset.tags.split(' ').includes(b.dataset.f)));
      });
      const want = new URLSearchParams(location.search).get('place');
      const gh = want && GHOST.find(g => g[0].toLowerCase() === want.toLowerCase());   // ?place=Lakshadweep also works
      show(want && POS[want] ? want : gh ? 'g:' + gh[0] : 'tadoba');
      // outline draws itself the first time the map scrolls into view
      if (!reduce && 'IntersectionObserver' in window) {
        const card = document.getElementById('mapcard'); card.classList.add('draw');
        new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { card.classList.add('drawn'); o.disconnect(); } }), { threshold: .25 }).observe(card);
      }
    },
  };
})();

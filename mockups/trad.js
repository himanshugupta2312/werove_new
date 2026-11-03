// Shared renderer for the traditional-art themes (N–S). Each theme supplies the page scaffolding,
// CSS and art; this fills the common containers from shared.js so content lives in one place.
//   #safari-grid  safari destinations (safari first)     #bird-grid     bird cards
//   #birding-places  birding-only destinations           #season        season calendar
//   #steps  #rules  #crew  #notes  #faqs  and any .destsel select
(function () {
  const safari = DESTS.filter(d => d.type.includes('safari'));
  const birdOnly = DESTS.filter(d => !d.type.includes('safari'));
  const BIRDS = [
    ['Verditer Flycatcher', 'Eumyias thalassinus', 'verditer-flycatcher'],
    ['Pink-browed Rosefinch', 'Carpodacus rodochroa', 'pink-browed-rosefinch'],
    ['Indian Pitta', 'Pitta brachyura', 'indian-pitta'],
  ];
  const STEPS = [
    ['Call or message us', 'Tell us where, when and who is coming, and what you hope to see.'],
    ['Get your plan', 'A day-by-day itinerary with stays, safari zones and a clear price.'],
    ['Set out', 'Permits, transfers and naturalists are all arranged. You bring the binoculars.'],
  ];
  const put = (id, html) => { const e = document.getElementById(id); if (e) e.innerHTML = html; };

  window.TRAD = {
    safari, birdOnly, BIRDS,
    mount(cfg = {}) {
      const media = cfg.media || (d => `<img src="img/${d.slug}.webp" alt="">`);
      const bmedia = cfg.bmedia || (b => `<img src="img/${b[2]}.webp" alt="">`);
      const mark = cfg.mark || { 2: '●', 1: '○', 0: '' };
      const card = cfg.card || ((d, i, m) => `<article class="dc"><div class="ph">${m}</div><div class="in">
        <div class="no">${String(i + 1).padStart(2, '0')}</div>
        <h3>${d.name}${d.type.length > 1 ? '<span class="plus">+ birding</span>' : ''}</h3><div class="reg">${d.region}</div>
        <p>${d.blurb}</p>
        <dl><div><dt>Best</dt><dd>${d.best}</dd></div><div><dt>Reach</dt><dd>${d.reach}</dd></div><div><dt>Look for</dt><dd>${d.see.split(',').slice(0, 3).join(',')}</dd></div></dl>
        <a class="go" data-wa="Hi We Rove, I'd like a trip to ${d.name}.">Plan ${d.name.split(/[ -]/)[0]} on WhatsApp →</a></div></article>`);

      put('safari-grid', safari.map((d, i) => card(d, i, media(d, i))).join(''));
      put('bird-grid', BIRDS.map((b, i) => `<figure class="bc"><div class="ph">${bmedia(b, i)}</div><figcaption><b>${b[0]}</b><i>${b[1]}</i></figcaption></figure>`).join(''));
      put('birding-places', birdOnly.map(d => `<a class="chip" data-wa="Hi We Rove, I'd like a birding trip to ${d.name}.">${d.name} <small>best ${d.best}</small></a>`).join('')
        + `<a class="chip" data-wa="Hi We Rove, I'd like a birding trip to Jim Corbett.">Jim Corbett <small>best Nov – May</small></a>`);
      put('season', `<div class="sr h"><b></b>${MONTHS.map(m => `<span>${m.toUpperCase()}</span>`).join('')}</div>` +
        DESTS.map(d => `<div class="sr"><b>${d.name}</b>${[...d.m].map(c => `<i class="c${c}">${mark[c]}</i>`).join('')}</div>`).join(''));
      put('steps', STEPS.map(([a, b], i) => `<div class="step"><i class="n">${cfg.numerals ? cfg.numerals[i] : i + 1}</i><b>${a}</b><p>${b}</p></div>`).join(''));
      put('rules', ETHICS.map(([a, b], i) => `<div class="rule"><i class="n">${cfg.numerals ? cfg.numerals[i] : i + 1}</i><b>${a}</b><span>${b}</span></div>`).join(''));
      put('crew', CREW.map(([a, b], i) => `<div class="ci"><span class="ico">${cfg.crewIcons ? cfg.crewIcons[i] : ''}</span><b>${a}</b><p>${b}</p></div>`).join(''));
      put('notes', NOTES.map(([c, t, img]) => `<a class="note" href="#"><img src="img/${img}.webp" alt=""><small>${c}</small><b>${t}</b></a>`).join(''));
      put('faqs', FAQ.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${q}</summary><p>${a}</p></details>`).join(''));
      document.querySelectorAll('.destsel').forEach(s => s.innerHTML += DESTS.map(d => `<option>${d.name}</option>`).join('') + '<option>Elsewhere</option>');
      // optional per-theme extras: lets a theme add its own art after the common render
      if (cfg.after) cfg.after();
    },
  };
})();

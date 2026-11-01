// Ambient boho layer: flocks of line-art birds drifting across the screen, vines that grow
// in the side margins as you scroll, and draw-on animation for any <svg data-draw>.
// Off by default on themes A–F (add ?ambient to the URL); always on when the script tag has data-always.
// Pick effects with data-fx="birds vines pugs fireflies" (default: birds vines).
// Also animates <svg data-draw> (line art draws itself) and [data-stamp] (children pop in like block prints).
(() => {
  const me = document.currentScript;
  const always = me && me.dataset.always !== undefined;
  if (!always && !new URLSearchParams(location.search).has('ambient')) return;
  const fx = new Set(((me && me.dataset.fx) || 'birds vines').split(/\s+/));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  const css = document.createElement('style');
  css.textContent = `
    .amb-birds{position:fixed;inset:0;pointer-events:none;z-index:25}
    .amb-side{position:fixed;top:0;bottom:0;width:140px;pointer-events:none;z-index:2}
    .amb-side.l{left:0}.amb-side.r{right:0;transform:scaleX(-1)}
    .amb-birds svg,.amb-side svg{width:100%;height:100%;overflow:visible}
    .amb-s{fill:none;stroke:var(--ambient,#8a6a50);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
    .amb-side{opacity:var(--ambient-o,.85)}
    .amb-side.ready .amb-s{transition:stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)}
    @media(max-width:1260px){.amb-side{width:80px;opacity:.35}}
    @media(max-width:760px){.amb-side{display:none}}
    [data-draw] .d{transition:stroke-dashoffset 2.8s cubic-bezier(.45,0,.2,1)}
    .amb-pugs{position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:2}
    .amb-pug{position:absolute;width:28px;height:28px;opacity:0;transform:scale(.4);transition:opacity .9s,transform .9s}
    .amb-pug.in{opacity:var(--pug-o,.6);transform:scale(1)}
    .amb-pug svg{width:100%;height:100%;fill:var(--ambient,#8a6a50)}
    @media(max-width:1260px){.amb-pugs{opacity:.5}}
    @media(max-width:760px){.amb-pugs{display:none}}
    .amb-fly{position:fixed;width:5px;height:5px;border-radius:50%;pointer-events:none;z-index:2;background:var(--firefly,#f6e27a);
      box-shadow:0 0 12px 4px var(--firefly,#f6e27a);opacity:0;animation:amb-drift var(--d) ease-in-out infinite alternate,amb-blink var(--b) ease-in-out var(--w) infinite}
    @keyframes amb-drift{to{transform:translate(var(--x),var(--y))}}
    @keyframes amb-blink{0%,100%{opacity:.05}45%,60%{opacity:.95}}
    [data-stamp]>*{opacity:0;transform:scale(1.35) rotate(-6deg);transition:opacity .5s,transform .5s cubic-bezier(.3,1.4,.5,1)}
    [data-stamp].in>*{opacity:1;transform:none}
    @media(prefers-reduced-motion:reduce){.amb-fly{animation:none;opacity:.6}[data-stamp]>*{opacity:1;transform:none}}`;
  document.head.appendChild(css);

  const prep = p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; return L; };

  // ---- Birds: "m"-shaped wings flapping via SMIL, flock drifts with a gentle bob
  const WINGS = 'M-10 0Q-5 -7 0 0Q5 -7 10 0;M-10 -2Q-5 -1 0 0Q5 -1 10 -2;M-10 1Q-5 4 0 0Q5 4 10 1;M-10 0Q-5 -7 0 0Q5 -7 10 0';
  const birdsWrap = document.createElement('div');
  birdsWrap.className = 'amb-birds';
  const sky = mk('svg', {});
  birdsWrap.appendChild(sky);
  const flocks = [];
  const spawn = (x0) => {
    const dir = Math.random() < .5 ? 1 : -1, n = 3 + Math.floor(Math.random() * 4);
    const y = innerHeight * (.08 + Math.random() * .3), speed = 18 + Math.random() * 22;
    const x = x0 ?? (dir > 0 ? -120 : innerWidth + 120);
    const g = mk('g', {}, sky), birds = [];
    for (let i = 0; i < n; i++) {
      const s = .55 + Math.random() * .8;
      const b = mk('g', {}, g);
      const p = mk('path', { class: 'amb-s', d: WINGS.split(';')[0], 'stroke-width': 1.6 / s, opacity: .35 + s * .35 }, b);
      if (!reduce) mk('animate', { attributeName: 'd', values: WINGS, dur: (0.8 + Math.random() * .5) + 's', begin: (-Math.random()) + 's', repeatCount: 'indefinite' }, p);
      birds.push({ b, s, dx: -dir * (i * 26 + Math.random() * 18), dy: (i % 2 ? 1 : -1) * (8 + i * 9 * Math.random()), ph: Math.random() * 6 });
    }
    flocks.push({ g, birds, x, y, dir, speed });
  };
  let last = performance.now(), next = 9000;
  const tick = now => {
    const dt = Math.min(64, now - last) / 1000; last = now;
    for (let i = flocks.length - 1; i >= 0; i--) {
      const f = flocks[i];
      f.x += f.dir * f.speed * dt;
      f.birds.forEach(o => {
        const bob = Math.sin(now / 900 + o.ph) * 4;
        o.b.setAttribute('transform', `translate(${f.x + o.dx} ${f.y + o.dy + bob}) scale(${o.s * (f.dir < 0 ? -1 : 1)} ${o.s})`);
      });
      if (f.x < -400 || f.x > innerWidth + 400) { f.g.remove(); flocks.splice(i, 1); }
    }
    if ((next -= dt * 1000) < 0) { spawn(); next = 14000 + Math.random() * 12000; }
    requestAnimationFrame(tick);
  };

  // ---- Side vines: a winding stem with leaves, revealed as the page scrolls
  const vine = (side, seed) => {
    const wrap = document.createElement('div');
    wrap.className = 'amb-side ' + side;
    const svg = mk('svg', {});
    wrap.appendChild(svg);
    const H = innerHeight, pts = [];
    for (let y = H + 10; y >= -10; y -= 16) pts.push([46 + 22 * Math.sin(y / 130 + seed) + 10 * Math.sin(y / 47 + seed * 2), y]);
    const stem = mk('path', { class: 'amb-s', d: 'M' + pts.map(p => p.join(' ')).join('L'), 'stroke-width': 1.8 }, svg);
    const L = prep(stem), parts = [];
    for (let at = 30, k = 0; at < L - 10; at += 30 + ((k * 17) % 14), k++) {
      const p = stem.getPointAtLength(at), q = stem.getPointAtLength(Math.min(L, at + 1));
      const ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI + (k % 2 ? 50 : -50);
      const s = .8 + ((k * 7) % 5) / 8;
      const el = k % 6 === 5
        ? mk('path', { class: 'amb-s', d: 'M0 0l9 0M9 0m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0', transform: `translate(${p.x} ${p.y}) rotate(${ang}) scale(${s})` }, svg)
        : mk('path', { class: 'amb-s', d: 'M0 0Q8 -9 20 -3Q10 4 0 0M2 -.5L14 -3', transform: `translate(${p.x} ${p.y}) rotate(${ang}) scale(${s})` }, svg);
      prep(el);
      parts.push({ el, t: at / L });
    }
    document.body.appendChild(wrap);
    return { stem, L, parts };
  };

  // ---- Pugmark trails: tiger tracks walking down both margins, each print appearing as you reach it
  const PUG = '<svg viewBox="0 0 100 100"><path d="M33 63C33 51 41 46 50 46S67 51 67 63C67 71 62 74 58 71 55 69 53 74 50 74S45 69 42 71C38 74 33 71 33 63Z"/><ellipse cx="31" cy="40" rx="6" ry="8" transform="rotate(-22 31 40)"/><ellipse cx="43" cy="30" rx="6" ry="8.5" transform="rotate(-6 43 30)"/><ellipse cx="57" cy="30" rx="6" ry="8.5" transform="rotate(6 57 30)"/><ellipse cx="69" cy="40" rx="6" ry="8" transform="rotate(22 69 40)"/></svg>';
  const pugs = () => {
    const box = document.createElement('div');
    box.className = 'amb-pugs';
    document.body.appendChild(box);
    const prints = [];
    const H = document.documentElement.scrollHeight;
    box.style.height = H + 'px';
    [[0, 0], [1, 1.7]].forEach(([right, seed]) => {
      for (let y = 260 + seed * 140, k = 0; y < H - 160; y += 64, k++) {
        const x = 44 + 20 * Math.sin(y / 380 + seed) + (k % 2 ? 11 : -11);
        const ang = 180 + 18 * Math.cos(y / 380 + seed) * (right ? -1 : 1);
        const el = document.createElement('div');
        el.className = 'amb-pug';
        el.innerHTML = PUG;
        el.style.top = y + 'px';
        el.style[right ? 'right' : 'left'] = x + 'px';
        el.style.rotate = ang + 'deg';
        box.appendChild(el);
        prints.push({ el, y });
      }
    });
    const walk = () => prints.forEach(p => p.el.classList.toggle('in', reduce || p.y < scrollY + innerHeight * .92));
    addEventListener('scroll', walk, { passive: true });
    setTimeout(walk, 200);
  };

  // ---- Fireflies: soft glowing dots drifting in the side margins
  const fireflies = () => {
    for (let i = 0; i < 16; i++) {
      const f = document.createElement('i');
      f.className = 'amb-fly';
      const side = i % 2 ? 0 : 88;
      f.style.left = (side + Math.random() * 11) + 'vw';
      f.style.top = (5 + Math.random() * 90) + 'vh';
      f.style.setProperty('--x', (Math.random() * 60 - 30) + 'px');
      f.style.setProperty('--y', (Math.random() * 80 - 40) + 'px');
      f.style.setProperty('--d', (6 + Math.random() * 8) + 's');
      f.style.setProperty('--b', (3 + Math.random() * 4) + 's');
      f.style.setProperty('--w', (-Math.random() * 6) + 's');
      document.body.appendChild(f);
    }
  };

  const init = () => {
    if (fx.has('birds')) {
      document.body.appendChild(birdsWrap);
      spawn(innerWidth * .62);
      if (!reduce) requestAnimationFrame(tick);
    }
    if (fx.has('fireflies')) fireflies();
    if (fx.has('pugs')) document.readyState === 'complete' ? pugs() : addEventListener('load', pugs);
    const vines = fx.has('vines') ? [vine('l', 0), vine('r', 2.3)] : [];
    // Vines start ~35% grown and finish at the bottom of the page
    const grow = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const prog = reduce ? 1 : .35 + .65 * Math.min(1, scrollY / max);
      vines.forEach(v => {
        v.stem.style.strokeDashoffset = v.L * (1 - prog);
        v.parts.forEach(o => o.el.style.strokeDashoffset = o.t <= prog ? 0 : o.el.style.strokeDasharray);
      });
    };
    addEventListener('scroll', grow, { passive: true });
    grow();
    // Animate only later growth, so the first paint never shows leaves without a stem
    requestAnimationFrame(() => document.querySelectorAll(".amb-side").forEach(s => s.classList.add("ready")));

    // Draw-on for decorative SVGs marked data-draw, when they scroll into view
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.d').forEach((p, i) => setTimeout(() => p.style.strokeDashoffset = 0, i * 140));
      io.unobserve(e.target);
    }), { threshold: .2 });
    document.querySelectorAll('[data-draw]').forEach(svg => {
      svg.querySelectorAll('path,circle,line,polyline,ellipse').forEach(p => { p.classList.add('d'); if (!reduce) prep(p); });
      io.observe(svg);
    });
    // Block-print stamps: children pop in one after another
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      [...e.target.children].forEach((c, i) => c.style.transitionDelay = (i * 90) + 'ms');
      e.target.classList.add('in');
      so.unobserve(e.target);
    }), { threshold: .2 });
    document.querySelectorAll('[data-stamp]').forEach(el => so.observe(el));
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();

// Site behaviour: WhatsApp enquiries, hero slideshow, menu, day/night buttons, cookie choice.
(function () {
  var cfg = JSON.parse(document.getElementById('wr-config').textContent);
  var wa = function (msg) { return 'https://wa.me/' + cfg.phoneRaw + '?text=' + encodeURIComponent(msg || 'Hi We Rove, I would like to plan a trip.'); };
  window.WR = { cfg: cfg, wa: wa };

  /* ---- day / night buttons (theme.js decides the theme from the visitor's clock) ---- */
  var mb = document.getElementById('modebtn');
  if (mb) mb.addEventListener('click', function () { WR_THEME.set(document.documentElement.dataset.theme === 'night' ? 'day' : 'night'); });
  document.querySelectorAll('.modes button').forEach(function (b) { b.addEventListener('click', function () { WR_THEME.set(b.dataset.m); }); });

  /* ---- menu on small screens ---- */
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.addEventListener('click', function () { nav.classList.remove('open'); });
  }

  /* ---- upcoming months in the "When" boxes (worked out in the browser, so they never go stale) ---- */
  document.querySelectorAll('select[data-months]').forEach(function (s) {
    var d = new Date(); d.setDate(1);
    for (var i = 0; i < 9; i++) { var o = document.createElement('option'); o.textContent = d.toLocaleString('en-GB', { month: 'short', year: 'numeric' }); s.appendChild(o); d.setMonth(d.getMonth() + 1); }
  });

  /* ---- "Others": reveal a box to type any location ---- */
  document.querySelectorAll('select[name=dest]').forEach(function (s) {
    var label = s.closest('label'), box = label && label.querySelector('[name=dest_other]');
    if (!box) return;
    s.addEventListener('change', function () { box.hidden = !/^others/i.test(s.value); if (!box.hidden) box.focus(); });
  });

  /* ---- enquiry forms open WhatsApp with the message already written (nothing is sent to a server) ---- */
  document.querySelectorAll('form[data-enquiry]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { return (f.elements[n] && f.elements[n].value) || ''; };
      var place = /^others|^elsewhere/i.test(v('dest')) ? (v('dest_other') || 'somewhere else (to be discussed)') : v('dest');
      var msg = "Hi We Rove! I'm " + (v('name') || '...') + '.\nTrip: ' + v('type') + '\nDestination: ' + place + '\nWhen: ' + v('when') + '\nTravellers: ' + v('people') + '\n' + v('notes');
      window.open(wa(msg.trim()), '_blank', 'noopener');
    });
  });
  document.querySelectorAll('[data-wa-msg]').forEach(function (a) { a.href = wa(a.dataset.waMsg); a.target = '_blank'; a.rel = 'noopener'; });

  /* ---- hero slideshow (pictures now; a slide can be a video, see src/data/content.json) ---- */
  var slides = [].slice.call(document.querySelectorAll('#slides .slide'));
  if (slides.length) {
    var cur = 0, timer, cap = document.getElementById('hcap');
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var show = function (n) {
      var old = slides[cur]; old.classList.remove('on'); if (old.tagName === 'VIDEO') old.pause();
      cur = (n + slides.length) % slides.length; var s = slides[cur]; s.classList.add('on');
      if (s.tagName === 'VIDEO') { s.currentTime = 0; s.play().catch(function () {}); }
      if (cap) cap.textContent = s.dataset.caption || '';
      document.querySelectorAll('#sdots button').forEach(function (b, i) { b.classList.toggle('on', i === cur); });
    };
    var run = function () { clearInterval(timer); if (slides.length > 1 && !reduce) timer = setInterval(function () { show(cur + 1); }, slides[cur].tagName === 'VIDEO' ? 14000 : 8000); };
    document.querySelectorAll('#sdots button').forEach(function (b) { b.addEventListener('click', function () { show(+b.dataset.i); run(); }); });
    run();
  }

  /* ---- cookie choice: analytics only loads after "Accept all" ---- */
  var KEY = 'wr-consent', banner = document.getElementById('cookie');
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var put = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
  var loadAnalytics = function () {
    if (!cfg.analyticsId || window.__wrGA) return; window.__wrGA = 1;
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.analyticsId; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', cfg.analyticsId, { anonymize_ip: true });
  };
  if (banner) {
    if (get() === null) banner.hidden = false; else if (get() === 'all') loadAnalytics();
    banner.querySelectorAll('[data-consent]').forEach(function (b) {
      b.addEventListener('click', function () { put(b.dataset.consent); banner.hidden = true; if (b.dataset.consent === 'all') loadAnalytics(); });
    });
    document.querySelectorAll('[data-cookie-open]').forEach(function (b) { b.addEventListener('click', function () { banner.hidden = false; }); });
  }
})();

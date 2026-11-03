// Interactive map: tap a pin to see the place. The map and pins are already in the page (server-rendered);
// this adds the detail panel, the filter tabs, the share button and ?place=slug deep links.
(function () {
  var el = document.getElementById('wr-atlas'), panel = document.getElementById('mpanel'), card = document.getElementById('mapcard');
  if (!el || !panel || !card) return;
  var data = JSON.parse(el.textContent), W = data.wildlife;
  var tagColor = function (t) { return (W[t] || { color: '#888' }).color; };
  var tagLabel = function (t) { return (W[t] || { label: t }).label; };
  var wa = function (m) { return (window.WR && WR.wa) ? WR.wa(m) : '#'; };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var row = function (k, v) { return v ? '<dt>' + k + '</dt><dd>' + v + '</dd>' : ''; };

  function show(key) {
    document.querySelectorAll('.mpin').forEach(function (p) { p.classList.toggle('on', p.dataset.s === key); });
    if (key.indexOf('g:') === 0) {
      var n = key.slice(2), g = data.ghosts.filter(function (x) { return x.name === n; })[0];
      panel.innerHTML = '<span class="hand">on request</span><h3>' + n + '</h3><p class="muted">' + g.note + '</p>' +
        '<p class="muted">' + n + " isn't one of the places we run most often, but people ask us about it, and we plan trips well beyond the map. Tell us when and who's coming and we'll take it from there.</p>" +
        '<div class="pbtns"><a class="btn p" target="_blank" rel="noopener" href="' + wa("Hi We Rove, I'd like a trip to " + n + '.') + '">Ask about ' + n + ' on WhatsApp</a></div>';
      return;
    }
    var d = data.destinations.filter(function (x) { return x.slug === key; })[0]; if (!d) return;
    panel.innerHTML =
      '<div class="im"><img src="' + d.img + '" alt="' + (d.hasPhotos ? d.name : d.name + ', photos coming soon') + '"></div>' +
      '<div class="chips">' + d.tags.map(function (t) { return '<span class="chip" style="color:' + tagColor(t) + '">' + tagLabel(t) + '</span>'; }).join('') + '</div>' +
      '<h3>' + d.name + '</h3><div class="reg">' + d.region + '</div><p class="muted">' + d.summary + '</p>' +
      '<dl>' + row('Look for', d.see.join(', ')) + row('Birds', d.birds.join(', ')) + row('Best time', d.best) + row('Getting there', d.reach) + '</dl>' +
      '<div class="pbtns"><a class="btn p" href="/destinations/' + d.slug + '">See ' + d.short + ' →</a>' +
      '<a class="btn w" target="_blank" rel="noopener" href="' + wa("Hi We Rove, I'd like a trip to " + d.name + '.') + '">WhatsApp us</a>' +
      '<button type="button" class="btn o" id="shareb">Share</button></div><div class="toast" id="toast"></div>';
    document.getElementById('shareb').onclick = function () {
      var url = location.origin + location.pathname + '?place=' + d.slug + '#where';
      if (navigator.share) navigator.share({ title: 'We Rove: ' + d.name, text: d.name + ', ' + d.region + ': safari and birding trips with We Rove', url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { document.getElementById('toast').textContent = 'Link copied'; });
    };
  }

  card.addEventListener('click', function (e) { var p = e.target.closest('.mpin'); if (p) show(p.dataset.s); });

  var filters = document.getElementById('mfilters');
  if (filters) filters.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    filters.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
    document.querySelectorAll('.mpin:not(.g)').forEach(function (p) { p.classList.toggle('dim', b.dataset.f !== 'all' && p.dataset.tags.split(' ').indexOf(b.dataset.f) < 0); });
  });

  // ?place=pench (or ?place=Lakshadweep) opens that place
  var want = new URLSearchParams(location.search).get('place'), key = 'tadoba';
  if (want) {
    var w = want.toLowerCase();
    if (data.destinations.some(function (d) { return d.slug === w; })) key = w;
    else { var gh = data.ghosts.filter(function (g) { return g.name.toLowerCase() === w; })[0]; if (gh) key = 'g:' + gh.name; }
  }
  show(key);

  // the outline draws itself the first time the map scrolls into view
  if (!reduce && 'IntersectionObserver' in window) {
    card.classList.add('draw');
    new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { card.classList.add('drawn'); o.disconnect(); } }); }, { threshold: .25 }).observe(card);
  }
})();

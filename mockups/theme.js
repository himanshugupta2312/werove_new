// Day / night theme, chosen from the visitor's own local time. Loaded in <head> so there's no flash.
//   Auto (default): night from 18:00 to 06:00 on the visitor's clock.
//   A visitor can override with the Day / Night / Auto buttons in the footer; the choice is remembered.
//   Preview: ?theme=night, ?theme=day, or ?hour=21 to simulate a time of day.
(function () {
  var NIGHT_FROM = 18, NIGHT_TO = 6;
  var q = new URLSearchParams(location.search), saved = null;
  try { saved = localStorage.getItem('wr-theme'); } catch (e) {}
  var forced = q.get('theme') || saved;
  var hour = q.get('hour') !== null ? +q.get('hour') : new Date().getHours();
  var explicit = forced === 'day' || forced === 'night';
  var mode = explicit ? forced : (hour >= NIGHT_FROM || hour < NIGHT_TO ? 'night' : 'day');
  var root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.mode = explicit ? forced : 'auto';

  window.WR_THEME = {
    set: function (m) {                       // 'auto' | 'day' | 'night'
      try { m === 'auto' ? localStorage.removeItem('wr-theme') : localStorage.setItem('wr-theme', m); } catch (e) {}
      var h = new Date().getHours();
      root.dataset.mode = m;
      root.dataset.theme = m === 'auto' ? (h >= NIGHT_FROM || h < NIGHT_TO ? 'night' : 'day') : m;
      document.dispatchEvent(new CustomEvent('wr-themechange'));
    },
  };
  // If left open on Auto, switch when the clock crosses the boundary
  setInterval(function () { if (root.dataset.mode === 'auto') window.WR_THEME.set('auto'); }, 300000);
})();

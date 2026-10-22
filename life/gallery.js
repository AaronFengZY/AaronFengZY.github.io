(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('gallery-motion-toggle');
  if (!toggle) throw new Error('Gallery motion control is missing.');
  var label = toggle.querySelector('.motion-label');
  if (!label) throw new Error('Gallery motion label is missing.');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var enabled = root.getAttribute('data-effects') !== 'off';
  var cards = document.querySelectorAll('.memory-card');

  function syncMotion() {
    var active = enabled && !reducedMotion.matches;
    root.setAttribute('data-effects', enabled ? 'on' : 'off');
    root.setAttribute('data-gallery-motion', active ? 'on' : 'off');
    root.setAttribute('data-gallery-visible', document.hidden ? 'false' : 'true');
    toggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    toggle.disabled = reducedMotion.matches;
    label.textContent = active ? 'Motion on' : 'Motion off';
    toggle.title = reducedMotion.matches
      ? 'Motion is disabled by your reduced-motion setting.'
      : active ? 'Hide floating lights and pause motion' : 'Show floating lights and gentle motion';
    if (!active) {
      cards.forEach(function (card) { card.classList.remove('memory-arriving'); });
    }
  }

  toggle.addEventListener('click', function () {
    enabled = !enabled;
    syncMotion();
    try {
      localStorage.setItem('seasonEffects', enabled ? 'on' : 'off');
    } catch (e) {
      if (e.name !== 'SecurityError' && e.name !== 'QuotaExceededError') throw e;
      console.warn('The gallery motion preference could not be saved; it applies for this visit.', e);
    }
  });
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  document.addEventListener('animationend', function (event) {
    if (event.animationName === 'memory-arrive') {
      event.target.classList.remove('memory-arriving');
    }
  });

  syncMotion();
  toggle.hidden = false;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (root.getAttribute('data-gallery-motion') === 'on' && !document.hidden) {
          entry.target.classList.add('memory-arriving');
        }
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.08});
    cards.forEach(function (card) { observer.observe(card); });
  }
})();

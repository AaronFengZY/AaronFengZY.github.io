function getUtcTheme() {
  var hour = new Date().getUTCHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

// Apply saved appearance before the first paint on either page.
(function () {
  var theme = getUtcTheme();
  var style = 'academic';
  var academicMode = 'auto';
  var effects = 'on';
  try {
    var savedAcademicMode = localStorage.getItem('academicMode');
    if (savedAcademicMode === 'light' || savedAcademicMode === 'dark') {
      academicMode = savedAcademicMode;
      theme = academicMode;
    }
    var saved = localStorage.getItem('theme');
    if (localStorage.getItem('visualStyle') === 'cyber') {
      style = 'cyber';
      theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
    }
    if (localStorage.getItem('seasonEffects') === 'off') effects = 'off';
  } catch (e) {
    if (e.name !== 'SecurityError') throw e;
    console.warn('Saved appearance preferences are unavailable; using the UTC day/night mode.', e);
  }
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-style', style);
  document.documentElement.setAttribute('data-effects', effects);
  document.documentElement.setAttribute('data-academic-mode', academicMode);
})();

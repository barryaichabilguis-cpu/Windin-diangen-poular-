/* Très léger : ~1 Ko. Gère uniquement le mode hors-ligne. */
(function () {
  var btn = document.getElementById('offline-btn');
  var state = document.getElementById('offline-state');
  if (!btn) return;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
  btn.addEventListener('click', function () {
    if (!('caches' in window)) { state.textContent = 'Non pris en charge par ce navigateur.'; return; }
    caches.open('jangirde-v1').then(function (c) {
      return c.addAll([
        './', 'index.html', 'style.css', 'guide.html',
        'lecons/lecon-01.html', 'lecons/lecon-02.html', 'lecons/lecon-03.html'
      ]);
    }).then(function () {
      state.textContent = '✓ Leçons enregistrées : lisez-les sans connexion.';
      btn.disabled = true;
    }).catch(function () {
      state.textContent = 'Enregistrement impossible — réessayez plus tard.';
    });
  });
})();

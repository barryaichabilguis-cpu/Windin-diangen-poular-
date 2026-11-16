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
    caches.open('jangirde-v5').then(function (c) {
      return c.addAll([
        './', 'index.html', 'style.css', 'guide.html', 'clavier.html',
        'lecons/lecon-01.html', 'lecons/lecon-02.html', 'lecons/lecon-03.html',
        'lecons/lecon-04.html', 'lecons/lecon-05.html',
        'lecons/lecon-06.html', 'lecons/lecon-07.html', 'lecons/lecon-08.html',
        'lecons/lecon-09.html', 'lecons/lecon-10.html', 'lecons/lecon-11.html',
        'lecons/lecon-12.html', 'lecons/lecon-13.html',
  'lecons/lecon-14.html', 'lecons/lecon-15.html', 'lecons/lecon-16.html',
  'lecons/lecon-17.html', 'lecons/lecon-18.html', 'lecons/lecon-19.html',
  'lecons/lecon-20.html'
      ]);
    }).then(function () {
      state.textContent = '✓ Leçons enregistrées : lisez-les sans connexion.';
      btn.disabled = true;
    }).catch(function () {
      state.textContent = 'Enregistrement impossible — réessayez plus tard.';
    });
  });
})();

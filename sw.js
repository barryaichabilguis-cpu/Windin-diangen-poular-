/* Cache hors-ligne minimal : réseau d'abord (contenu frais), cache en secours (hors-ligne). */
var CACHE = 'jangirde-v4';
var PAGES = [
  './', 'index.html', 'style.css', 'guide.html', 'clavier.html',
  'lecons/lecon-01.html', 'lecons/lecon-02.html', 'lecons/lecon-03.html',
  'lecons/lecon-04.html', 'lecons/lecon-05.html',
  'lecons/lecon-06.html', 'lecons/lecon-07.html', 'lecons/lecon-08.html',
  'lecons/lecon-09.html', 'lecons/lecon-10.html', 'lecons/lecon-11.html',
  'lecons/lecon-12.html', 'lecons/lecon-13.html'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(PAGES); }));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        return hit || caches.match('./');
      });
    })
  );
});

/* Cache hors-ligne minimal (~30 lignes) */
var CACHE = 'jangirde-v1';
var PAGES = [
  './', 'index.html', 'style.css', 'guide.html', 'clavier.html',
  'lecons/lecon-01.html', 'lecons/lecon-02.html', 'lecons/lecon-03.html'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(PAGES); }));
});
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      });
    })
  );
});

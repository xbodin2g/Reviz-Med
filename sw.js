/* Réviz'Med v1.1 — service worker : coquille hors-ligne.
   Les requêtes vers api.github.com ne sont jamais mises en cache :
   la synchronisation passe toujours par le réseau en direct. */
const V = 'revizmed-v1.1.0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V && k.startsWith('revizmed')).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (!/^https?:$/.test(u.protocol)) return;

  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(res => {
        const cp = res.clone();
        caches.open(V).then(c => c.put('./index.html', cp));
        return res;
      }).catch(() => caches.match('./index.html').then(m => m || caches.match('./')))
    );
    return;
  }

  if (u.origin === location.origin) {
    e.respondWith(
      caches.match(r).then(m => m || fetch(r).then(res => {
        if (res && res.ok) {
          const cp = res.clone();
          caches.open(V).then(c => c.put(r, cp));
        }
        return res;
      }))
    );
    return;
  }

  if (/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(
      caches.match(r).then(m => {
        const f = fetch(r).then(res => {
          if (res && (res.ok || res.type === 'opaque')) {
            const cp = res.clone();
            caches.open(V).then(c => c.put(r, cp));
          }
          return res;
        }).catch(() => m);
        return m || f;
      })
    );
  }
  /* api.github.com et tout le reste : réseau direct, sans cache. */
});
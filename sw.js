/* Bidayatul Mujtahid Digital — service worker
   Naikkan VERSI di bawah setiap kali isi data diperbarui, supaya
   pengunjung lama ikut mengunduh versi terbaru. */
const VERSI = 'bm-v1';
const INTI = [
  './', './index.html', './manifest.webmanifest', './favicon.svg',
  './data/kitab.json', './data/petunjuk.json', './data/istilah.json',
  './data/fikih.json', './data/ushul.json',
  './data/masalah.json', './data/teks.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(INTI)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Halaman: utamakan jaringan supaya pembaruan langsung terlihat.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  // Data dan aset: utamakan cache supaya cepat dan tetap jalan tanpa internet.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const salinan = res.clone(); caches.open(VERSI).then(c => c.put(req, salinan)); }
      return res;
    }))
  );
});

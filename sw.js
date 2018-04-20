// configuration
// 变更sw.js文件时，也要变更该字段
`201804201612`;

const
  version = '1.0.0',
  CACHE = version + '::PWAsite',
  offlineURL = '/offline/',
  // 缓存必要的资源
  installFilesEssential = [
    '/',
    '/manifest.json',
    '/AppShell/inline.css',
    '/scripts/main.js',
    '/images/launching.jpeg'
  ].concat(offlineURL),
  // 描述性资源，比如logo等
  installFilesDesirable = [
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'
  ];

// install static assets
// 安装全局静态资源
function installStaticFiles() {

  return caches.open(CACHE)
    .then(cache => {

      // cache desirable files 
      cache.addAll(installFilesDesirable);

      // cache essential files 
      return cache.addAll(installFilesEssential);

    });

}

// // clear old caches
// function clearOldCaches() {

//   return caches.keys()
//     .then(keylist => {

//       return Promise.all(
//         keylist
//           .filter(key => key !== CACHE)
//           .map(key => caches.delete(key))
//       );

//     });

// }

// // application installation
// self.addEventListener('install', event => {

//   console.log('service worker: install');

//   // cache core files
//   event.waitUntil(
//     installStaticFiles()
//     .then(() => self.skipWaiting())
//   );

// });


// // application activated
// self.addEventListener('activate', event => {

//   console.log('service worker: activate');

// 	// delete old caches
//   event.waitUntil(
//     clearOldCaches()
//     .then(() => self.clients.claim())
// 	);

// });


// // is image URL?
// let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f);
// function isImage(url) {

//   return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);

// }


// // return offline asset
// function offlineAsset(url) {

//   if (isImage(url)) {

//     // return image
//     return new Response(
//       '<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">offline</text></svg>',
//       { headers: {
//         'Content-Type': 'image/svg+xml',
//         'Cache-Control': 'no-store'
//       }}
//     );

//   }
//   else {

//     // return page
//     return caches.match(offlineURL);

//   }

// }


// // application fetch network data
// self.addEventListener('fetch', event => {

//   // abandon non-GET requests
//   if (event.request.method !== 'GET') return;

//   let url = event.request.url;

//   event.respondWith(

//     caches.open(CACHE)
//       .then(cache => {

//         return cache.match(event.request)
//           .then(response => {

//             if (response) {
//               // return cached file
//               console.log('cache fetch: ' + url);
//               return response;
//             }

//             // make network request
//             return fetch(event.request)
//               .then(newreq => {

//                 console.log('network fetch: ' + url);
//                 if (newreq.ok) cache.put(event.request, newreq.clone());
//                 return newreq;

//               })
//               // app is offline
//               .catch(() => offlineAsset(url));

//           });

//       })

//   );

// });

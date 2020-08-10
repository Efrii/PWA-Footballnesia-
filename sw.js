importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
    console.log('Workbox berhasil dimuat');
    
    workbox.core.setCacheNameDetails({
    prefix: "FOOTBALLNESIA",
    suffix: "V-01",
    precache: "Cache",
    runtime: "API",
    });

        workbox.precaching.precacheAndRoute([
            { url: '/', revision: '1'},
            { url: '/manifest.json', revision: '1'},
            { url: '/index.html', revision: '1' },
            { url: '/nav.html', revision: '1' },
            { url: '/page/detail-team.html', revision: '1'},
            { url: '/page/fav-team.html', revision: '1'},
            { url: '/page/home.html', revision: '1'},
            { url: '/page/liga-inggris.html', revision: '1'},
            { url: '/page/match.html', revision: '1'},
            { url: '/assets/images/favorite.jpeg', revision: '1'},
            { url: '/assets/images/champion.jpg', revision: '1'},
            { url: '/assets/images/champion_01.jpg', revision: '1'},
            { url: '/assets/images/champion_02.jpg', revision: '1'},
            { url: '/assets/images/champion_03.jpg', revision: '1'},
            { url: '/assets/images/inggris_01.png', revision: '1'},
            { url: '/assets/images/inggris_02.jpeg', revision: '1'},
            { url: '/assets/images/inggris_03.jpg', revision: '1'},
            { url: '/assets/images/spanyol_01.png', revision: '1'},
            { url: '/assets/images/spanyol_02.webp', revision: '1'},
            { url: '/assets/images/spanyol_03.jpg', revision: '1'},
            { url: '/assets/images/Atletico_Madrid_2017_logo.svg', revision: '1'},
            { url: '/assets/images/FC_Barcelona_(crest)_2.svg', revision: '1'},
            { url: '/assets/images/img-kantoran.jpeg', revision: '1'},
            { url: '/assets/images/Liverpool_FC.svg', revision: '1'},
            { url: '/assets/images/Manchester_City_FC.svg', revision: '1'},
            { url: '/assets/images/manchester_united.png', revision: '1'},
            { url: '/assets/images/premier_league.jpg', revision: '1'},
            { url: '/assets/images/Real_Madrid_Club_de_Fútbol.png', revision: '1'},
            { url: '/assets/images/Stadion.jpg', revision: '1'},
            { url: '/assets/images/icons/icon-512x512x.png', revision: '1'},
            { url: '/assets/images/icons/icon-384x384x.png', revision: '1'},
            { url: '/assets/images/icons/icon-192x192x.png', revision: '1'},
            { url: '/assets/images/icons/icon-152x152x.png', revision: '1'},
            { url: '/assets/images/icons/icon-144x144x.png', revision: '1'},
            { url: '/assets/images/icons/icon-128x128x.png', revision: '1'},
            { url: '/assets/images/icons/icon-96x96x.png', revision: '1'},
            { url: '/assets/images/icons/icon-72x72x.png', revision: '1'},
            { url: '/assets/css/materialize.min.css', revision: '1' },
            { url: '/assets/css/style.css', revision: '1'},
            { url: 'assets/js/jquery-3.5.1.min.js', revision: '1'},
            { url: '/assets/js/api.js', revision: '1'},
            { url: '/assets/js/DB.js', revision: '1'},
            { url: '/assets/js/idb.js', revision: '1'},
            { url: '/assets/js/materialize.min.js', revision: '1'},
            { url: '/assets/js/nav.js', revision: '1'},
            { url: '/assets/js/req.js', revision: '1'},
            { url: '/assets/js/script.js', revision: '1' },
            { url: '/assets/js/helper.js', revision: '1' },
        ]);

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('page/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2'),
        workbox.strategies.cacheFirst()
    );

    // Menyimpan cache dari CSS Google Fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );
     
    // Menyimpan cache untuk file font selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );
} else {
  console.log('Workbox gagal dimuat');
}

// * push notification
self.addEventListener('push', event => {
    console.log(event);
    let body;
    if (event.data) {
        body = event.data.text()
    }else{
        body = "push message no payload"
    }

    let opt ={
        body,
        icon : './assets/images/icons/icon-512x512x.png',
        vibrate : [100,50,100],
        data : {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification',opt)
    )
})

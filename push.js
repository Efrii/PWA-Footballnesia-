var webPush = require('web-push');
 
const vapidKeys = {
    publicKey : "BEUIirndBp2EbOvxsG2v-96JjxofWPG4swGo7V0dyZhHpxiK9cNjxE0-ibNDekG04H9q2P7VV1wAa6FRtFqYDXk",
    privateKey : "0ID1Ilbb_PKxJOOvZsgDD-cTYYlfaKANz88LGkrxGfs"
};
 
 
webPush.setVapidDetails(
   'mailto:teguh.efriyanto@students.amikom.ac.id',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   endpoint : "https://fcm.googleapis.com/fcm/send/dn_QRVItVf8:APA91bEnGWAFnXVgw3jlYdG82TOKi74YsmZ014Xi3XcGBkNKJF133_IB1Md5BphMg4DUV4qnmaEjCvvA13ZeqGoR9BVGdR1XjHPqzoGmMhRtaIASuajDmu-v7ObH0wx1A8F6STyKQ0Sv",
   keys : {
       "p256dh": "BOV+Rv5GmZWCg/Jkh8tmFwGrq4jcjcmvm9Uakz+RQkRtNLs9qZ+Uy7B5lTaBwXUdrn/fBCbEjw4RfctO7WrgzFw=",
       "auth": "HJFJMOxDUnxfwho+3iQCJg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '788706519974',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
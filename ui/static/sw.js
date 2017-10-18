importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/app.eb18b710d98110a8c55a.js",
    "revision": "1c380bc9dfd1d98c25ef23349b288815"
  },
  {
    "url": "/_nuxt/common.ee8eb572c29a699e86c3.js",
    "revision": "6f791576adf3d93af8aab47c8fab6f3b"
  },
  {
    "url": "/_nuxt/layouts/auth.e5833bd4bbc876d31147.js",
    "revision": "c3a222d98b9d38e89024f20395526218"
  },
  {
    "url": "/_nuxt/layouts/default.0be31e33c4dd096a66bf.js",
    "revision": "36164b72f918270b43f2ff43e60ec9ef"
  },
  {
    "url": "/_nuxt/layouts/monitor.5b54b0de8b11e668eda8.js",
    "revision": "714eea701aa3bd69ec8b74bfc1ab352c"
  },
  {
    "url": "/_nuxt/manifest.deb6c969f8e139102a94.js",
    "revision": "5d1fc7cf6850bd4158cafebb09339a06"
  },
  {
    "url": "/_nuxt/pages/device/_id/edit.9e6565f45b0bc2285cd3.js",
    "revision": "55bfd6189581d421248eb5d7cddf171e"
  },
  {
    "url": "/_nuxt/pages/devices.3302fd0f9d694a859e0e.js",
    "revision": "1da603b7eb96008ce742ea4bf2a79fe0"
  },
  {
    "url": "/_nuxt/pages/index.d8a8c618444412e32cf5.js",
    "revision": "fbf76b1e46dbd43bedfb66c239810bc8"
  },
  {
    "url": "/_nuxt/pages/login.c02b877413d26a61cb54.js",
    "revision": "dfbe695b87d1b750313b2deaeae06b92"
  },
  {
    "url": "/_nuxt/pages/logs.72c0fbf507aa03ae2551.js",
    "revision": "47bc1c9c6b2ac6ead0e83b6b4491d57c"
  },
  {
    "url": "/_nuxt/pages/manager/_id/all-sessions.385b8dfec3a8c7c02eca.js",
    "revision": "1ec6a024d88369bb93f78614c91abba5"
  },
  {
    "url": "/_nuxt/pages/monitor.02c2e04a2545797add0a.js",
    "revision": "57bf270bfdcc7dd585746595b5da6300"
  },
  {
    "url": "/_nuxt/pages/scan.7813c183f871a9be0de6.js",
    "revision": "fc17c9df8b8261987cac3166dc7b9917"
  },
  {
    "url": "/_nuxt/pages/session/_id/edit.171132fc98a5ea845484.js",
    "revision": "e892a35ca8898fdf18b905d2d1ae16b8"
  },
  {
    "url": "/_nuxt/pages/session/_id/view.449264f4363c1b59acd6.js",
    "revision": "e1f973409f2882037ec961c29a548998"
  },
  {
    "url": "/_nuxt/pages/sessions.1fbace0018660ad641e2.js",
    "revision": "80ff37e092a065546e71d372d2355115"
  },
  {
    "url": "/_nuxt/pages/users.5858c032b7301512b325.js",
    "revision": "54a578cc23e9c1c019d0d1b1e4f2501a"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "attendencemanagement_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');

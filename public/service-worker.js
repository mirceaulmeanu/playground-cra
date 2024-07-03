/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
/**
 * If needed, import external script resources
 */
// self.importScripts("path/to/script.js");
// importScripts('https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js');
/**
 * For available members and events of Service Worker Global Scope check:
 * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/
 *
 * This cast is only for typescript. If I use `declare var self: ServiceWorkerGlobalScope;` I get an error
 */
var _self = self;
const VERSION = "v25";
const CACHE_NAME = `radio-stream-playground-${VERSION}`;
const APP_STATIC_RESOURCES = [
    "/"
];
/**
 * The "install" event happens when the app is used for the first time,
 *  or when a new version of the service worker is detected by the browser.
 * When an older service worker is being replaced by a new one,
 *  the old service worker is used as the PWA's service worker until the new service work is activated.
 */
_self.addEventListener("install", installEvent => {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
     * ExtendableEvent.waitUntil receives a Promise as an argument
     */
    installEvent.waitUntil(
    /**
     * Only available in secure contexts, the WorkerGlobalScope.caches property returns a CacheStorage object associated with the current context.
     * The CacheStorage.open() method returns a Promise that resolves to the Cache object matching name of the cache, passed as a parameter.
     */
    caches.open(CACHE_NAME).then(cache => {
        cache.addAll(APP_STATIC_RESOURCES);
    })
    // OR
    // (async () => {
    //     const cache = await caches.open(CACHE_NAME);
    //     cache.addAll(APP_STATIC_RESOURCES);
    // })()
    // OR
    // if nothing to be done
    // Promise.resolve()
    );
    /**
     * The promise that skipWaiting() returns can be safely ignored.
     * NOTE-TO-SELF: This is a forceful takeover, might have side-effects, must learn more about that.
     * NOTE-TO-SELF: It seems that skipWaiting triggers "activate" event and calling 'self.clients.claim()' from there mitigates side-effects
     * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
     * While self.skipWaiting() can be called at any point during the service worker's execution,
     *  it will only have an effect if there's a newly installed service worker that might otherwise remain in the waiting state.
     *  Therefore, it's common to call self.skipWaiting() from inside of an InstallEvent handler.
     */
    // self.skipWaiting();
});
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/activate_event
 */
_self.addEventListener("activate", (activateEvent) => {
    activateEvent.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names.map((name) => {
            if (name !== CACHE_NAME) {
                return caches.delete(name);
            }
        }));
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/Clients
         * https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
         * The claim() method of the Clients interface allows an active service worker to set itself as the controller for all clients within its scope.
         * This triggers a "controllerchange" event on navigator.serviceWorker in any clients that become controlled by this service worker.
         * NOTE-TO-SELF: Use this with 'self.skipWaiting()' in the install event handler
         */
        // await self.clients.claim();
    })());
});
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event
 *
 * This is an example o
 */
_self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith((async () => {
        /**
         * This is an example of a network first strategy (do the network request, cache response to be used if subsequent request fail)
         * However, for the moment i don't know how this works with streaming urls, so let's leave it commented
         */
        // try {
        //     const networkResponse = await fetch(fetchEvent.request);
        //     if (networkResponse.ok) {
        //       const cache = await caches.open(CACHE_NAME);
        //       cache.put(fetchEvent.request, networkResponse.clone());
        //     }
        //     return networkResponse;
        // } catch (error) {
        //     const cachedResponse = await caches.match(fetchEvent.request);
        //     return cachedResponse || Response.error();
        // }
        /**
         * Network only strategy
         */
        // return await fetch(fetchEvent.request);
        /**
         * Cache first WITHOUT cache refresher
         */
        const cachedResponse = await caches.match(fetchEvent.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return await fetch(fetchEvent.request);
        // try {
        //     const networkResponse = await fetch(request);
        //     if (networkResponse.ok) {
        //     const cache = await caches.open(CACHE_NAME);
        //     cache.put(request, networkResponse.clone());
        //     }
        //     return networkResponse;
        // } catch (error) {
        //     return Response.error();
        // }
    })());
});
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/message_event
 */
_self.addEventListener("message", messageEvent => {
    if (messageEvent.data === "SKIP_WAITING") {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
         */
        _self.skipWaiting();
    }
});

import {action, makeObservable, observable} from "mobx";
import {ServiceBase} from "../ServiceBase";
import {IServiceFactoryExtended} from "../service-factory-extended.interface";
import {IServiceWorkerService} from "./service-worker.service.interface";

const SERVICE_WORKER_ENABLED = true;

export class ServiceWorkerService extends ServiceBase implements IServiceWorkerService {
    @observable
    public isNewServiceWaiting: boolean = false;

    constructor(services: IServiceFactoryExtended) {
        super(services);
        makeObservable(this);
    }

    @action
    private setIsNewServiceWaiting(value: boolean) {
        this.isNewServiceWaiting = value;
    }

    registerOnPageLoad() {
        window.addEventListener('load', () => {
            this.register();
        });
    }

    register(): void {
        if (SERVICE_WORKER_ENABLED && 'serviceWorker' in navigator) {
            // The URL constructor is available in all browsers that support SW.
            const publicUrl = new URL(
                process.env.PUBLIC_URL,
                window.location.href
            );
            if (publicUrl.origin !== window.location.origin) {
                // Our service worker won't work if PUBLIC_URL is on a different origin
                // from what our page is served on. This might happen if a CDN is used to
                // serve assets; see https://github.com/facebook/create-react-app/issues/2374
                return;
            }

            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            /**
             * For https://localhost we'll get an SSL invalid certificate error when trying to register the service worker.
             * In order to make the browser trust the local self-signed certificate we need to create and install one.
             * I chose to use "mkcert": https://github.com/FiloSottile/mkcert/releases
             * Download a release, rename to "mkcert.exe", copy it to a folder in your PATH (Environment variable) or add the folder containing the exe to your PATH
             * Run "mkcert -install" and "mkcert localhost"
             * Then add them to the .env file
             * See project README.md
             */
            navigator.serviceWorker.register(swUrl).then((registration: ServiceWorkerRegistration) => {
                // ensure the case when the updatefound event was missed is also handled
                // by re-invoking the prompt when there's a waiting Service Worker
                if (registration.waiting) {
                    // invokeServiceWorkerUpdateFlow(registration)
                    this.setIsNewServiceWaiting(true);
                }
        
                registration.addEventListener('updatefound', () => {
                    if (registration.installing) {
                        // An updated service worker has appeared in reg.installing!
                        const installingWorker: ServiceWorker = registration.installing;
        
                        installingWorker.addEventListener('statechange', () => {
        
                            if (registration.waiting /* OR installingWorker.state === "installed" */) {
                                // if there's an existing controller (previous Service Worker), show the prompt
                                if (navigator.serviceWorker.controller) {
                                    // invokeServiceWorkerUpdateFlow(registration);
                                    this.setIsNewServiceWaiting(true);
                                } else {
                                    // otherwise it's the first install, nothing to do
                                    console.log('Service Worker initialized for the first time')
                                }
                            } else {
                                // error occured probably
                            }
                        });
                    }
                });
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
        
        
            // navigator.serviceWorker.ready.then((registration) => {
            //     registration.update();
            // });
        
            
            let refreshing = false;
            // detect controller change and refresh the page
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    window.location.reload()
                    refreshing = true
                }
            })
        }
    }

    unregister() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
    }
}

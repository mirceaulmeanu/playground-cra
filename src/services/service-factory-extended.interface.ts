import {IServiceFactory} from "./service-factory.interface";
import {IServiceWorkerServiceExtended} from "./service-worker/service-worker.service.interface";

export interface IServiceFactoryExtended extends IServiceFactory {
    serviceWorker: IServiceWorkerServiceExtended;
}
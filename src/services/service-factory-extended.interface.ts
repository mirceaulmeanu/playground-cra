import {IServiceFactory} from "./service-factory.interface";
import {IServiceWorkerService} from "./service-worker/service-worker.service.interface";

export interface IServiceFactoryExtended extends IServiceFactory {
    serviceWorker: IServiceWorkerService;
}
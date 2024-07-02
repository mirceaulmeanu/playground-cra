export interface IServiceWorkerService {
    readonly isNewServiceWaiting: boolean;
}

export interface IServiceWorkerServiceExtended extends IServiceWorkerService {
    register(): void;
    registerOnPageLoad(): void;
    unregister(): void;
}

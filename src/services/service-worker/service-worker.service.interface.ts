export interface IServiceWorkerService {
    readonly isNewServiceWaiting: boolean;
    register(): void;
    registerOnPageLoad(): void;
    unregister(): void;
}

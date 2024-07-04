import {INetworkStatusService} from "./network-status/network-status.service.interface";
import {IServiceWorkerService} from "./service-worker/service-worker.service.interface";
import {ISettingsService} from "./settings/settings.service.interface";
import {IStorageService} from "./storage/storage.service.interface";
import {IStreamFormService} from "./stream-form/stream-form.service.interface";
import {IStreamPlayService} from "./stream-play/stream-play.service.interface";
import {IStreamsListService} from "./streams-list/streams-list.service.interface";

export interface IServiceFactory {
    readonly localStorage: IStorageService;
    readonly networkStatus: INetworkStatusService;
    readonly settings: ISettingsService;
    readonly sessionStorage: IStorageService;
    readonly streamsList: IStreamsListService;
    readonly streamForm: IStreamFormService;
    readonly streamPlay: IStreamPlayService;
    readonly serviceWorker: IServiceWorkerService;
}

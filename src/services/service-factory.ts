import {LazyFactory} from "../utils/lazy/lazy-factory";
import {NetworkStatusService} from "./network-status/network-status.service";
import {INetworkStatusService} from "./network-status/network-status.service.interface";
import {IServiceFactoryExtended} from "./service-factory-extended.interface";
import {ServiceWorkerService} from "./service-worker/service-worker.service";
import {IServiceWorkerServiceExtended} from "./service-worker/service-worker.service.interface";
import {SettingsService} from "./settings/settings.service";
import {ISettingsService} from "./settings/settings.service.interface";
import {IStorageService} from "./storage/storage.service.interface";
import {StreamFormService} from "./stream-form/stream-form.service";
import {IStreamFormService} from "./stream-form/stream-form.service.interface";
import {StreamPlayService} from "./stream-play/stream-play.service";
import {IStreamPlayService} from "./stream-play/stream-play.service.interface";
import {StreamsListService} from "./streams-list/streams-list.service";
import {IStreamsListService} from "./streams-list/streams-list.service.interface";

export class ServiceFactory implements IServiceFactoryExtended {
    constructor(
        readonly localStorage: IStorageService,
        readonly sessionStorage: IStorageService
    ) {}

    private _settings = new LazyFactory<ISettingsService>(() => new SettingsService(this));
    public get settings(): ISettingsService {
        return this._settings.data;
    }

    private _networkStatus = new LazyFactory<INetworkStatusService>(() => new NetworkStatusService(this));
    public get networkStatus(): INetworkStatusService {
        return this._networkStatus.data;
    }

    private _streamsList = new LazyFactory<IStreamsListService>(() => new StreamsListService(this));
    public get streamsList(): IStreamsListService {
        return this._streamsList.data;
    }

    private _streamForm = new LazyFactory<IStreamFormService>(() => new StreamFormService(this));
    public get streamForm(): IStreamFormService {
        return this._streamForm.data;
    }

    private _streamPlay = new LazyFactory<IStreamPlayService>(() => new StreamPlayService(this));
    public get streamPlay(): IStreamPlayService {
        return this._streamPlay.data;
    }
    
    private _serviceWorker = new LazyFactory<IServiceWorkerServiceExtended>(() => new ServiceWorkerService(this));
    public get serviceWorker(): IServiceWorkerServiceExtended {
        return this._serviceWorker.data;
    }
}
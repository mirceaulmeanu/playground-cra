import {LazyFactory} from "../utils/lazy/lazy-factory";
import {DialogsService} from "./dialogs/dialogs.service";
import {IDialogsService} from "./dialogs/dialogs.service.interface";
import {IServiceFactoryExtended} from "./service-factory-extended.interface";
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

    private _dialogs = new LazyFactory<IDialogsService>(() => new DialogsService(this));
    public get dialogs(): IDialogsService {
        return this._dialogs.data;
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
}
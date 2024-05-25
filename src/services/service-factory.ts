import {LazyFactory} from "../utils/lazy/lazy-factory";
import {IServiceFactoryExtended} from "./service-factory-extended.interface";
import {IStorageService} from "./storage/storage.service.interface";
import {StreamsListService} from "./streams-list/streams-list.service";
import {IStreamsListService} from "./streams-list/streams-list.service.interface";

export class ServiceFactory implements IServiceFactoryExtended {
    constructor(
        readonly localStorage: IStorageService,
        readonly sessionStorage: IStorageService
    ) {}

    private _streamsList = new LazyFactory<IStreamsListService>(() => new StreamsListService(this));
    public get streamsList(): IStreamsListService {
        return this._streamsList.data;
    }
}
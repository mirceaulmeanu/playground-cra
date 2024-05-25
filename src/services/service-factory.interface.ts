import {IStorageService} from "./storage/storage.service.interface";
import {IStreamsListService} from "./streams-list/streams-list.service.interface";

export interface IServiceFactory {
    readonly localStorage: IStorageService;
    readonly sessionStorage: IStorageService;
    readonly streamsList: IStreamsListService;
}
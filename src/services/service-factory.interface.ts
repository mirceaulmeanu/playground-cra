import {IStorageService} from "./storage/storage.service.interface";
import {IStreamFormService} from "./stream-form/stream-form.service.interface";
import {IStreamPlayService} from "./stream-play/stream-play.service.interface";
import {IStreamsListService} from "./streams-list/streams-list.service.interface";

export interface IServiceFactory {
    readonly localStorage: IStorageService;
    readonly sessionStorage: IStorageService;
    readonly streamsList: IStreamsListService;
    readonly streamForm: IStreamFormService;
    readonly streamPlay: IStreamPlayService;
}

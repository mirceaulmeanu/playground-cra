import {IDialogsService} from "./dialogs/dialogs.service.interface";
import {IServiceFactory} from "./service-factory.interface";

export interface IServiceFactoryExtended extends IServiceFactory {
    readonly dialogs: IDialogsService;
}
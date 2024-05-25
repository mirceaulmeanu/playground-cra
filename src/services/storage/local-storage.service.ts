import {StorageServiceBase} from "./storage-service-base";

export class LocalStorageService extends StorageServiceBase {
    constructor() {
        /**
         * TODO: SSR. This will not work with Server Side Rendering due to reference to window
         */
        super(window.localStorage);
    }
}


import {StorageServiceBase} from "./storage-service-base";

export class SessionStorageService extends StorageServiceBase {
    constructor() {
        /**
         * TODO: SSR. This will not work with Server Side Rendering due to reference to window
         */
        super(window.sessionStorage);
    }
}
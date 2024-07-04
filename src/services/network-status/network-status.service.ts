import {action, makeObservable, observable} from "mobx";
import {IServiceFactoryExtended} from "../service-factory-extended.interface";
import {ServiceBase} from "../ServiceBase";
import {INetworkStatusService} from "./network-status.service.interface";

export class NetworkStatusService extends ServiceBase implements INetworkStatusService {
    @observable.ref
    online: boolean;

    constructor(services: IServiceFactoryExtended) {
        super(services);
        makeObservable(this);

        this.online = navigator.onLine;
        this.subscribeToNetworkChange();
    }

    @action
    private setOnline(value: boolean) {
        this.online = value;
    }
    private subscribeToNetworkChange() {
        window.addEventListener("offline", () => {
            this.setOnline(false);
        });
        window.addEventListener("online", () => {
            this.setOnline(true);
        });
    }
}

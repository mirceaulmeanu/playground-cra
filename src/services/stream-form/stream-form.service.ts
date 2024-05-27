import {action, makeObservable, observable} from "mobx";
import {ServiceBase} from "../ServiceBase"
import {IStream} from "../streams-list/streams-list.service.interface";
import {IStreamFormService} from "./stream-form.service.interface";
import {IServiceFactoryExtended} from "../service-factory-extended.interface";

export class StreamFormService extends ServiceBase implements IStreamFormService {
    constructor(services: IServiceFactoryExtended) {
        super(services);
        makeObservable(this);
    }
    @observable
    public modalOpen = false;

    // @observable
    public stream: IStream | null = null;

    @action
    editStream(stream: IStream, index: number): void {
        this.stream = stream;
        this.modalOpen = true;
    }

    @action
    newStream() {
        this.stream = null;
        this.modalOpen = true;
    }

    @action
    close() {
        this.stream = null;
        this.modalOpen = false;
    }
}

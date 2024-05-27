import {observable} from "mobx";
import {ServiceBase} from "../ServiceBase"
import {IStream} from "../streams-list/streams-list.service.interface";
import {IStreamFormService} from "./stream-form.service.interface";

export class StreamFormService extends ServiceBase implements IStreamFormService {
    @observable
    public modalOpen = false;

    @observable
    public stream: IStream | null = null;

    editStream(stream: IStream, index: number): void {
        this.stream = stream;
        this.modalOpen = true;
    }

    newStream() {
        this.stream = null;
    }
}

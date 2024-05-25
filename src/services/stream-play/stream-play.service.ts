import {ServiceBase} from "../ServiceBase"
import {IStream} from "../streams-list/streams-list.service.interface";
import {IStreamPlayService} from "./stream-play.service.interface";

export class StreamPlayService extends ServiceBase implements IStreamPlayService {
    private currentStream: IStream | undefined;
    playStream(stream: IStream): void {
        this.currentStream = stream;
        throw new Error("NOT_IMPLEMENTED");
    }

    pauseStream(): void {
        throw new Error("NOT IMPLEMENTED");
    }
}

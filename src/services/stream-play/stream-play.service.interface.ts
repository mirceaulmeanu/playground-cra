import {IStream} from "../streams-list/streams-list.service.interface";

export interface IStreamPlayService {
    playStream(stream: IStream): void;
    pauseStream(): void;
}

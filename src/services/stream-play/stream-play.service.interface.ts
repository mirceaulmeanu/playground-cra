import {IStream} from "../streams-list/streams-list.service.interface";
import {IPlayStreamStrategy} from "./strategies/play-stream-strategy.interface";

export enum StreamState {
    Idle,
    Loading,
    Playing,
    Buffering,
    Paused,
    Error
}

export interface IStreamPlayService {
    setPlayStrategy(strategy: IPlayStreamStrategy): void;

    readonly currentStream: IStream | undefined;
    readonly currentStreamState: StreamState;
    playStream(stream?: IStream): void;
    pauseStream(): void;
    stop(): void;

    isCurrentStreamIdle(): boolean;
    isCurrentStreamLoading(): boolean;
    isCurrentStreamPlaying(): boolean;
    isCurrentStreamBuffering(): boolean;
    isCurrentStreamPaused(): boolean;
    isCurrentStreamError(): boolean;
}

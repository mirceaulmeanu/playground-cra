import {IStream} from "../../streams-list/streams-list.service.interface";

export interface IAudioElementProxyOptions {
    volume?: number;
    onPlayRequest?: () => void;
    onLoading?: () => void;
    onPlaying?: () => void;
    onPause?: () => void;
    onError?: () => void;
    onDisposed?: () => void;
}

export interface IPlayStreamStrategy {
    dispose?(): void;
    playStream(stream: IStream): void | Promise<void>;
    pauseStream(): void | Promise<void>;
    stop(): void;
    setVolume(v: number): void;
}

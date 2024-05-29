import {action, makeObservable, observable, runInAction} from "mobx";
import {ServiceBase} from "../ServiceBase"
import {IStream} from "../streams-list/streams-list.service.interface";
import {IStreamPlayService, StreamState} from "./stream-play.service.interface";
import {IServiceFactoryExtended} from "../service-factory-extended.interface";
import {IPlayStreamStrategy} from "./strategies/play-stream-strategy.interface";
import {SimpleAudioElementPlayStreamStrategy} from "./strategies/simple-audio-element.play-stream-strategy";
import {clamp} from "../../utils/clamp";

const STREAM_PLAY_VOLUME = "STREAM_PLAY_VOLUME";
export class StreamPlayService extends ServiceBase implements IStreamPlayService {
    constructor(services: IServiceFactoryExtended) {
        super(services);
        makeObservable(this);
        const volumeStored = this.services.localStorage.getItem(STREAM_PLAY_VOLUME);
        this.volume = parseFloat(volumeStored || "1");
    }
    private playStrategy: IPlayStreamStrategy = new SimpleAudioElementPlayStreamStrategy({
        onLoading: () => {
            runInAction(() => { this.currentStreamState = StreamState.Loading; });
        },
        onPlaying: () => {
            runInAction(() => { this.currentStreamState = StreamState.Playing; });
        },
        onPause: () => {
            runInAction(() => { this.currentStreamState = StreamState.Paused; });
        },
        onError: () => {
            runInAction(() => { this.currentStreamState = StreamState.Error; });
        }
    });
    @observable
    public currentStream: IStream | undefined;
    @observable
    public currentStreamState: StreamState = StreamState.Idle;
    @observable
    private _volume: number = 1;

    public setPlayStrategy(newStrategy: IPlayStreamStrategy) {
        if (this.playStrategy.dispose) {
            this.playStrategy.dispose();
        }
        this.playStrategy = newStrategy;
    }

    @action
    async playStream(stream?: IStream): Promise<void> {
        // the user clicked on a stream in the list / or any other situation where the stream is specified
        if (stream) {
            // if it's the same stream, theoretically there is nothing to do and I could return,
            // but I do not return in case the stream is paused I want to play it
            // if (stream === this.currentStream) {
            //     return;
            // }
            // if there is already a stream playing or loading, safely stop / abort it
            if (this.currentStream) {
                // safely stop / abort current stream
                this.pauseStream();
            }
            this.currentStream = stream;
        }
        if (!this.currentStream) {
            throw new Error("Play stream ws called but there is no stream to be played");
        }
        this.playStrategy.playStream(this.currentStream);
        // this.currentStreamState = StreamState.Playing;
    }

    @action
    pauseStream(): void {
        this.playStrategy.pauseStream();
        // this.currentStream = undefined;
        // this.currentStreamState = StreamState.Paused;
    }

    @action
    stop(): void {
        this.playStrategy.stop();
        this.currentStreamState = StreamState.Idle;
        this.currentStream = undefined;
    }

    set volume(v: number) {
        runInAction(() => {
            this._volume = clamp(v, 0, 1);
            this.playStrategy.setVolume(this._volume);
            this.services.localStorage.setItem(STREAM_PLAY_VOLUME, this._volume.toString());
        });
    }
    get volume() {
        return this._volume;
    }
    
    isCurrentStreamIdle(): boolean { return this.currentStreamState === StreamState.Idle; }
    isCurrentStreamLoading(): boolean { return this.currentStreamState === StreamState.Loading; }
    isCurrentStreamPlaying(): boolean { return this.currentStreamState === StreamState.Playing; }
    isCurrentStreamBuffering(): boolean { return this.currentStreamState === StreamState.Buffering; }
    isCurrentStreamPaused(): boolean { return this.currentStreamState === StreamState.Paused; }
    isCurrentStreamError(): boolean { return this.currentStreamState === StreamState.Error; }
}

import {IAudioElementProxyOptions} from "../strategies/play-stream-strategy.interface";

export class AudioElementProxy {
    public readonly url: string;
    private audioElement: HTMLAudioElement;
    private playPromise: Promise<void> = Promise.resolve();

    constructor(
        url: string,
        private opts?: IAudioElementProxyOptions,
    ) {
        this.url = url;
        this.audioElement = document.createElement('audio');
        this.audioElement.src = url;
        if (this.opts?.volume) {
            this.setVolume(this.opts.volume);
        }
        // this.audioElement.controls = true;
        
        // I'm not using this event listener because when the streams error it sets itself on pause and it looks like it was paused by user
        // if (this.opts?.onPause) {
        //     this.audioElement.addEventListener("pause", this.opts.onPause);
        // }
        if (this.opts?.onPlayRequest) {
            this.audioElement.addEventListener("play", this.opts.onPlayRequest);
        }
        if (this.opts?.onPlaying) {
            this.audioElement.addEventListener("playing", this.opts.onPlaying);
        }
        if (this.opts?.onLoading) {
            // The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
            this.audioElement.addEventListener("stalled", this.opts.onLoading);
            // Playback has stopped because of a temporary lack of data
            this.audioElement.addEventListener("waiting", this.opts.onLoading);
        }
        document.body.appendChild(this.audioElement);
    }
    
    private _disposed = false;
    private _disposePromise: Promise<void> | undefined = undefined;
    get disposed() {
        return this._disposed;
    }
    dispose() {
        if (this._disposePromise) {
            return this._disposePromise;
        }
        this._disposePromise = this.playPromise.then(() => {
            // I'm not using this event listener because when the streams error it sets itself on pause and it looks like it was paused by user
            // if (this.opts?.onPause) {
            //     this.audioElement.removeEventListener("pause", this.opts.onPause);
            // }
            if (this.opts?.onPlayRequest) {
                this.audioElement.removeEventListener("play", this.opts.onPlayRequest);
            }
            if (this.opts?.onPlaying) {
                this.audioElement.removeEventListener("playing", this.opts.onPlaying);
            }
            if (this.opts?.onLoading) {
                // The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
                this.audioElement.removeEventListener("stalled", this.opts.onLoading);
                // Playback has stopped because of a temporary lack of data
                this.audioElement.removeEventListener("waiting", this.opts.onLoading);
            }
            this.audioElement.pause();
            this.audioElement.src = "";
            document.body.removeChild(this.audioElement);
            this._disposed = true;
        });
        return this._disposePromise;
    }

    play(): void {
        if (this._disposePromise || this._disposed) {
            return;
        }
        this.playPromise = this.playPromise.then(() => {
            return this.audioElement.play();
        }).catch((err: DOMException) => {
            if (err.code === err.ABORT_ERR || err.name === "AbortError") {
                // Example: The play() request was interrupted by a call to pause()
                return Promise.resolve();
            }
            if (err.code === err.NOT_SUPPORTED_ERR || err.name === "NotSupportedError") {
                // Example: Failed to load because no supported source was found.
                if (this.opts?.onError) {
                    this.opts.onError();
                }
                return Promise.resolve();
            }
            throw err;
        });
    }

    pause(): void {
        if (this._disposePromise || this._disposed) {
            return;
        }
        this.playPromise = this.playPromise.then(() => {
            this.audioElement.pause();
            if (this.opts?.onPause) {
                this.opts.onPause();
            }
        });
    }

    get volume() {
        return this.audioElement.volume;
    }

    setVolume(v: number) {
        this.audioElement.volume = v;
    }
}

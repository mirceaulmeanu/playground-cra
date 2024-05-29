import {runInAction} from "mobx";
import {IStream} from "../../streams-list/streams-list.service.interface";
import {AudioElementProxy} from "../audio-element-proxy/audio-element-proxy";
import {IPlayStreamStrategy} from "./play-stream-strategy.interface";

export class SimpleAudioElementPlayStreamStrategy implements IPlayStreamStrategy {
    // the reason for using an array is that play is async and we cannot safely switch from a stream to another while loading
    // so we keep an array, and when we quickly add streams, the others are disposed and popped
    // most of the time this array length will be 1
    public audioProxies: AudioElementProxy[] = [];

    dispose() {
        const disposePromises = this.audioProxies.map((proxy) => proxy.dispose());
        Promise.all(disposePromises).then(() => {
            this.audioProxies = [];
        });
    }

    playStream(stream: IStream): void {
        const lastAddedProxy = this.audioProxies[this.audioProxies.length -1];
        if (lastAddedProxy && lastAddedProxy.url === stream.url && !lastAddedProxy.disposed) {
            lastAddedProxy.play();
        } else {
            this.audioProxies = this.audioProxies.filter(p => !p.disposed);
            this.audioProxies.forEach(p => p.dispose());
            const proxy = new AudioElementProxy(stream.url, {
                onLoading: () => {
                    runInAction(() => { stream.playMessage = "Loading..."; });
                },
                onPlaying: () => {
                    runInAction(() => { stream.playMessage = "Playing"; });
                },
                onPause: () => {
                    runInAction(() => { stream.playMessage = "Paused"; });
                },
                onError: () => {
                    runInAction(() => {
                        stream.playMessage = undefined;
                        stream.errorMessage = "An error occured. Please check the url or try again later";
                    });
                }
            });
            this.audioProxies.push(proxy);
            proxy.play();
        }
        // let currentProxy = undefined;
        // this.audioProxies.forEach(p => {
        //     if (p.url === stream.url) {
        //         currentProxy = p;
        //     } else {
        //         p.pause();
        //     }
        // });
        // if (!currentProxy) {
        //     currentProxy = new AudioElementProxy(stream.url);
        //     this.audioProxies.push(currentProxy);
        //     currentProxy.play();
        // }
    }

    pauseStream(): void {
        const lastAddedProxy = this.audioProxies[this.audioProxies.length -1];
        if (lastAddedProxy) {
            lastAddedProxy.pause();
        }
        // this.audioProxies.forEach(p => {
        //     p.pause();
        // });
    }

    stop(): void {
        this.audioProxies = this.audioProxies.filter(p => !p.disposed);
        this.audioProxies.forEach(p => p.dispose());
    }
}
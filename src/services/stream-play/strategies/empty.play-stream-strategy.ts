import {IPlayStreamStrategy} from "./play-stream-strategy.interface";

export class EmptyPlayStreamStrategy implements IPlayStreamStrategy {
    playStream(): void {
        /**
         * I don't need to do anything.
         * As long as currentStream inside stream-play.service is set and it's observable
         * AND
         * this code is added somewhere in an observer component:
         * { services.streamPlay.currentStream ?
         *     <audio autoPlay src={services.streamPlay.currentStream.url}></audio>
         * : null }
         */
    }

    pauseStream(): void {
        throw new Error("NOT IMPLEMENTED");
    }

    stop(): void {
        /**
         * currentStream inside stream-play.service should be observable and set to null
         */
    }
}
import {IStream} from "../../streams-list/streams-list.service.interface";
import {IPlayStreamStrategy} from "./play-stream-strategy.interface";

export class FetchWithoutIcyPlayStreamStrategy implements IPlayStreamStrategy {
    private abortController: AbortController | null = null;
    async playStream(stream: IStream): Promise<void> {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
        this.abortController = new AbortController();
        const signal = this.abortController.signal;
        

        const response = await fetch(stream.url, { signal });
        if (!response.body) {
            return;
        }
        const reader = response.body.getReader();

        // // Step 2: Read the stream into an ArrayBuffer
        // let chunks = [];
        // let receivedLength = 0;

        // let hardStopInterations = 0
        // while (true) {
        //     hardStopInterations++;
        //     const { done, value } = await reader.read();
        //     if (done || hardStopInterations > 100) break;
        //     chunks.push(value);
        //     receivedLength += value.length;
        // }

        // // Combine chunks into a single ArrayBuffer
        // let arrayBuffer = new Uint8Array(receivedLength);
        // let position = 0;
        // for (let chunk of chunks) {
        //     arrayBuffer.set(chunk, position);
        //     position += chunk.length;
        // }

        // // Step 3: Decode the audio data using AudioContext
        // const audioContext = new window.AudioContext();
        // const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.buffer);

        // // Step 4: Play the decoded audio data
        // const source = audioContext.createBufferSource();
        // source.buffer = audioBuffer;
        // source.connect(audioContext.destination);
        // source.start();



        // Step 2: Create an AudioContext
        const audioContext = new window.AudioContext();
        
        // Step 3: Create a MediaSource and URL
        const mediaSource = new MediaSource();
        const mediaSourceUrl = URL.createObjectURL(mediaSource);

        // Step 4: Create an <audio> element to play the media source
        const audioElement = document.createElement('audio');
        audioElement.src = mediaSourceUrl;
        document.body.appendChild(audioElement);
        audioElement.play();

        // signal.addEventListener("abort", () => {
        //     console.log("GOT ABORT")
        //     audioElement.pause();
        //     document.body.removeChild(audioElement);
        // }, {once: true});

        // Step 5: Handle the MediaSource and SourceBuffer
        mediaSource.addEventListener('sourceopen', async () => {
            const sourceBuffer = mediaSource.addSourceBuffer('audio/aac'); // Adjust MIME type as needed

            // Function to read and append stream chunks
            async function readStream() {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        sourceBuffer.addEventListener('updateend', () => {
                            mediaSource.endOfStream();
                        });
                        break;
                    }
                    sourceBuffer.appendBuffer(value);
                    // Wait for the source buffer to be updated before reading the next chunk
                    await new Promise(resolve => {
                        sourceBuffer.addEventListener('updateend', resolve, { once: true });
                    });
                }
            }

            readStream().catch(error => console.error(error));
        });

        mediaSource.addEventListener('error', (error) => {
            console.error('MediaSource error:', error);
        });
    }

    pauseStream(): void {
        throw new Error("NOT IMPLEMENTED");
    }
    stop(): void {
        throw new Error("NOT IMPLEMENTED");
    }
    setVolume(v: number): void {
        throw new Error("NOT IMPLEMENTED");
    }
}
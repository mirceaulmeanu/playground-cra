import {IStream} from "../streams-list/streams-list.service.interface";

export interface IStreamFormService {
    readonly modalOpen: boolean;
    readonly stream: IStream | null;
    editStream(stream: IStream, index: number): void;
    newStream(): void;
    close(): void;
}

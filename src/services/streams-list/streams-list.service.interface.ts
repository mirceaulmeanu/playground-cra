export interface IStream {
    url: string;
    name: string;
    image?: string;
    playMessage?: string;
    errorMessage?: string;
}

export interface IStreamsListService {
    readonly streamsList: IStream[];
    readonly list: IStream[];
    addStream(stream: IStream): void;
    removeStream(stream: IStream): void;
    updateStream(oldStream: IStream, newStreamData: Partial<IStream>): void;
}

export interface IStream {
    url: string;
    name: string;
    image?: string;
}

export interface IStreamsListService {
    getList(): IStream[]
}

export enum LoadStatus {
    Loading = 0,
    Loaded = 1,
    Error = 2
} 

export interface ILoadedAsyncData<T> {
    data: T;
}

export interface IAsyncData<T> {
    data: T | undefined;
    loadStatus: LoadStatus;
    isLoaded(): this is ILoadedAsyncData<T>;
    isLoading(): boolean;
}
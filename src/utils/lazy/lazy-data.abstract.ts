import {IAsyncData, ILoadedAsyncData, LoadStatus} from "./lazy-data.interface";

export abstract class AbstractLazyData<T> implements IAsyncData<T> {
    // @observable.ref
    protected _data: T | undefined;
    // @observable
    loadStatus = LoadStatus.Loading;

    isLoaded(): this is ILoadedAsyncData<T> {
        return this.loadStatus === LoadStatus.Loaded && this._data !== undefined;
    }

    isLoading(): boolean {
        return this.loadStatus === LoadStatus.Loading;
    }

    get data() {
        return this._data
    }
}

import {LoadStatus} from "./lazy-data.interface";
import {AbstractLazyData} from "./lazy-data.abstract";

export class LazyData<T> extends AbstractLazyData<T> {
    constructor(data?: T) {
        super();
        this._data = data;
    }

    // @action
    update(data: T | undefined) {
        this._data = data;
        this.loadStatus = data ? LoadStatus.Loaded : LoadStatus.Error;
    }

    // @action
    reset() {
        this._data = undefined;
        this.loadStatus = LoadStatus.Loading;
    }
}



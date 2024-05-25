import {AbstractLazyData} from "./lazy-data.abstract";

export class LazyFactory<T> extends AbstractLazyData<T> {
    constructor(private _factory: () => T) {
        super();
    }

    private _initializing = false;
    private _initValue() {
        if (this._initializing) {
            throw new Error('Lazy circular dependency detected: ' + this._factory)
        }
        if (this._data === undefined) {
            this._initializing = true;
            try {
                this._data = this._factory();
            }
            finally {
                this._initializing = false;
            }

        }
    }

    get data(): NonNullable<T> {
        this._initValue();
        if (!this._data) {
            throw new Error("Service initialization failed at retreiving data");
        }
        return this._data;
    }
    
    forceInit() {
        this._initValue();
    }
}

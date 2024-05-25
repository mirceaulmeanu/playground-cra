import {IStorageService} from "./storage.service.interface";

export class StorageServiceBase implements IStorageService {
    constructor(private readonly storage: Storage) {

    }
    
    getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    setItem(key: string, value: any): void {
        this.storage.setItem(key, value);
    }


    getJson<T extends {}>(key: string): T | null {
        let value = this.getItem(key);
        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value) as T;
        } catch (err) {
            throw new Error(`Failed to parse to JSON the local storage key ${key} with value ${value}`, {cause: err});
        }
    }

    setJson(key: string, value: object): void {
        this.setItem(key, JSON.stringify(value));
    }


    removeItem(key: string): void {
        this.storage.removeItem(key);
    }
}
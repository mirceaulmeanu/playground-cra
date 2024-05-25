export interface IStorageService {
    setItem(key:string, value:any): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setJson(key: string, value: object): void;
    getJson<T extends {}>(key: string): T | null;
}

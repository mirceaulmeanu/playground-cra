export interface ILazy<T = unknown> {
    readonly isLazy: boolean;
    tryGetResolvedValue(): T | Promise<T>;
    readonly value: T | Promise<T>;
}
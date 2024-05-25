import {IServiceFactoryExtended} from './service-factory-extended.interface';
// import {IReactionOptions} from "mobx";
// import {reaction as mobxReaction, IReactionDisposer, IReactionPublic} from 'mobx'

export class ServiceBase {
    constructor(private _serviceFactory: IServiceFactoryExtended) {
    }

    protected get services(): IServiceFactoryExtended {
        return this._serviceFactory;
    }

    // private _reactions: IReactionDisposer[] = [];

    // private _getClassName(): string {
    //     const thisProto = Object.getPrototypeOf(this);
    //     if(thisProto.constructor.name) {
    //         return thisProto.constructor.name;
    //     } else {
    //         return thisProto.constructor.CLASS;
    //     }
    // }

    // reaction<T, FireImmediately extends boolean = false>(expression: (r: IReactionPublic) => T, effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T, r: IReactionPublic) => void, opts?: IReactionOptions<T, FireImmediately>): void {
    //     this._reactions.push(mobxReaction(expression, effect, opts));
    // }

    // dispose() {
    //     this._reactions.forEach(disposer => disposer());
    // }
}

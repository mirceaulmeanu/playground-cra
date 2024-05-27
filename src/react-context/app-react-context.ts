import React from 'react';
import {IServiceFactory} from '../services/service-factory.interface';

export interface IAppReactContext {
  services: IServiceFactory
}

export const AppReactContext = React.createContext<IAppReactContext>(null!);

export const AppReactContextProvider = AppReactContext.Provider;
export const AppReactContextConsumer = AppReactContext.Consumer;

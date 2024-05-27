import {IServiceFactory} from "../services/service-factory.interface";
import {useContext} from "react";
import {AppReactContext} from "../react-context/app-react-context";

export function useServices(): IServiceFactory {
    return useContext(AppReactContext).services;
}
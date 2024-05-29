import {action, makeObservable, observable} from "mobx";
import {ServiceBase} from "../ServiceBase";
import {IServiceFactoryExtended} from "../service-factory-extended.interface";
import {ISettingsService, ThemeColorScheme} from "./settings.service.interface";

const THEME_COLOR_SCHEME = "THEME_COLOR_SCHEME";

export class SettingsService extends ServiceBase implements ISettingsService {
    @observable
    public theme: ThemeColorScheme = "system";
    constructor(services: IServiceFactoryExtended) {
        super(services);
        makeObservable(this);
        const themeStored = this.services.localStorage.getItem(THEME_COLOR_SCHEME);
        if (themeStored === 'dark' || themeStored === 'light') {
            this.theme = themeStored;
        }
    }
    @action
    setTheme(t: ThemeColorScheme) {
        this.theme = t;
        this.services.localStorage.setItem(THEME_COLOR_SCHEME, t);
    };
}
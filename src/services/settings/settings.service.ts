import {action, makeObservable, observable} from "mobx";
import {ServiceBase} from "../ServiceBase";
import {IServiceFactoryExtended} from "../service-factory-extended.interface";
import {ISettingsService, ThemeColorScheme} from "./settings.service.interface";

const THEME_COLOR_SCHEME = "THEME_COLOR_SCHEME";
const ADD_BUTTON_SHOWN_IN_MAIN_PAGE = "ADD_BUTTON_SHOWN_IN_MAIN_PAGE";

export class SettingsService extends ServiceBase implements ISettingsService {
    @observable
    public theme: ThemeColorScheme = "system";
    @observable
    public isAddStreamFABShown: boolean = true;

    constructor(services: IServiceFactoryExtended) {
        super(services);
        makeObservable(this);
        const themeStored = this.services.localStorage.getItem(THEME_COLOR_SCHEME);
        if (themeStored === 'dark' || themeStored === 'light') {
            this.theme = themeStored;
        }
        const addButtonShownInMainPage = this.services.localStorage.getItem(ADD_BUTTON_SHOWN_IN_MAIN_PAGE);
        this.isAddStreamFABShown = (addButtonShownInMainPage === 'true') ? true : false;
        
    }

    @action
    setTheme(t: ThemeColorScheme) {
        this.theme = t;
        this.services.localStorage.setItem(THEME_COLOR_SCHEME, t);
    };

    @action
    setIsAddStreamFABShown(v: boolean) {
        this.isAddStreamFABShown = v;
        this.services.localStorage.setItem(ADD_BUTTON_SHOWN_IN_MAIN_PAGE, v.toString());
    }
}
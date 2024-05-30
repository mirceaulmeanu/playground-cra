export type ThemeColorScheme = 'dark' | 'light' | 'system';

export interface ISettingsService {
    readonly theme: ThemeColorScheme;
    readonly isAddStreamFABShown: boolean;
    setTheme(t: ThemeColorScheme): void;
    setIsAddStreamFABShown(v: boolean): void;
}
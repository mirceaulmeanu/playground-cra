export type ThemeColorScheme = 'dark' | 'light' | 'system';

export interface ISettingsService {
    readonly theme: ThemeColorScheme;
    setTheme(t: ThemeColorScheme): void;
}
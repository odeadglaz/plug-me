type Translation = { [name: string]: string };

export type TranslationsMap = { [locale: string]: Translation };

export interface TranslationsPlugin {
    translations: TranslationsMap;
    i18n: any;
}

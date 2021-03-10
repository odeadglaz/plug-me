type Translation = { [name: string]: string };

export type TranslationsMap = { [locale: string]: Translation };

export interface I18n {
    add: (translations: TranslationsMap) => void;
}

export interface ITranslationsMap {
    i18n: I18n;
    translationsMap: TranslationsMap
}
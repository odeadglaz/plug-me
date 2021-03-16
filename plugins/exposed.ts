import { FiverrContext } from '@fiverr-private/fiverr_context';
import { I18n, TranslationsMap } from './translations/types';
import { Currency } from './currency/types';

export interface ExposedPlugins {
    context: FiverrContext;
    currency: {
        currencies: Currency[];
    },
    translations: {
        i18n: I18n,
        translations: TranslationsMap
    }
}

// @ts-ignore
import I18n from '@fiverr/i18n';
import { HttpPlugin, RequestDecorator } from '../base/plugin';
import { Expose } from '../base/decorators';
import { TranslationsMap } from './types';

class TranslationsPlugin extends HttpPlugin {
    readonly name = 'translations';

    @Expose()
    i18n = new I18n();

    @Expose()
    translations: TranslationsMap = {};

    init() {
        // Fetch translation
        this.translations = {
            'en-US': {
                'hey': 'Hey',
                'hello': 'Hello'
            },
            'de-DE': {
                'hey': 'Heya',
                'hello': 'Hula'
            }
        };

        this.i18n.add(this.translations);
    }

    decorateRequest(decorator: RequestDecorator) {
        const { locale } = decorator.context;

        if (!this.translations[locale]) { return; }

        decorator.decorate('localizedTranslations', this.translations[locale]);
    };
}

export default TranslationsPlugin;

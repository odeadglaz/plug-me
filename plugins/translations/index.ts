// @ts-ignore
import I18nInstance from '@fiverr/i18n';
import { NodePlugin, RequestDecorator } from '../../base/plugin.base';
import { Expose } from '../base/decorators';
import { TranslationsMap, I18n } from './types';

export default class TranslationsPlugin extends NodePlugin {
    readonly name = 'translations';

    @Expose()
    i18n: I18n = new I18nInstance();

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
};

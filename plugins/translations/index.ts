import { HttpPlugin, RequestDecorator } from '../base/plugin';
import { Expose } from '../base/decorators';

type Translation = { [name: string]: string };
type TranslationsMap = { [locale: string]: Translation };

class TranslationsPlugin extends HttpPlugin {
    readonly name = 'translations';

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
    }

    decorateRequest = (decorator: RequestDecorator) => {
        const { locale } = decorator.context;

        if (!this.translations[locale]) { return; }

        decorator.decorate('localizedTranslations', this.translations[locale]);
    };

}

export default TranslationsPlugin;

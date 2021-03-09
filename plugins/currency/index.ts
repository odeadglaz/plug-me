import { isEmpty } from 'lodash';
import { logger } from '@fiverr-private/obs';
import { HttpPlugin, RequestDecorator, ResponseDecorator } from '../base/plugin';
import { PollingAction} from '../base/decorators';
import { default as fetchCurrencies, Currency } from './fetchCurrencies';

class CurrencyPlugin extends HttpPlugin {
    readonly name = 'currency';

    currencies: Currency[] = [];

    @PollingAction(60 * 1000)
    async init() {
        const currencies = await fetchCurrencies();
        console.log('Currencies init', currencies);
        this.currencies = currencies;
    }

    decorateRequest(decorator: RequestDecorator) {
        const { currency } = decorator.context;

        if (isEmpty(this.currencies)) {
            throw new Error('Empty currencies');
        }

        const matchedCurrency = this.currencies.find(({ name }) => name === currency);
        logger.info('Decorating request with currency', { matchedCurrency });
        decorator.decorate('sessionCurrency', matchedCurrency);
    };

    decorateResponse(decorator: ResponseDecorator) {
        decorator.setHeader('X-Custom-Currencies', this.currencies.join(','))
    }
}

export default CurrencyPlugin;

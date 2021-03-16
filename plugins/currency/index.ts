import { isEmpty } from 'lodash';
import { logger } from '@fiverr-private/obs';
import { NodePlugin, RequestDecorator } from '../../base/plugin.base';
import { PollingAction, Expose } from '../base/decorators';
import { fetchCurrencies } from './fetchCurrencies';
import { Currency } from './types';

export default class CurrencyPlugin extends NodePlugin {
    readonly name = 'currency';

    @Expose()
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
}

import { isEmpty } from 'lodash';
import { logger } from '@fiverr-private/obs';
import { HttpPlugin, RequestDecorator, ResponseDecorator } from '../base/plugin';
import {PollingAction} from '../base/decorators';

class CurrencyPlugin extends HttpPlugin {
    readonly name = 'currency';

    currencies: number[] = [];

    @PollingAction(1000)
    init() {
        const currencies = [Math.random(), Math.random()];
        console.log('Currencies init', currencies);
        this.currencies = currencies;
    }

    decorateRequest = (decorator: RequestDecorator) => {
        if (isEmpty(this.currencies)) {
            throw new Error('Empty currencies');
        }

        logger.info('Decorating request with currencies', this.currencies);
        decorator.decorate('currencies', this.currencies);
    };

    decorateResponse = (decorator: ResponseDecorator) => {
        decorator.setHeader('X-Custom-Currencies', this.currencies.join(','))
    }
}

export default CurrencyPlugin;

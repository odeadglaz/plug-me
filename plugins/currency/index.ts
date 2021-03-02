import { isEmpty } from 'lodash';
import { logger } from '@fiverr-private/obs';
import HttpPlugin, {PluginContext} from '../base/plugin';

class CurrencyPlugin extends HttpPlugin {
    currencies: number[] = [];

    static fetchStaticData(): Promise<object> {
        const currencies = [Math.random(), Math.random()];
        return Promise.resolve({ currencies });
    }

    setStaticData = ({ currencies = [] } = {}) => {
        this.currencies = currencies;
    }

    decorateRequest = (context: PluginContext) => {
        if (isEmpty(this.currencies)) {
            throw new Error('Empty currencies');
        }

        logger.info('Decorating request with currencies');
        context.addData({ currencies: this.currencies });
    };

    decorateResponse = (context: PluginContext) => {
        context.addHeader('X-Custom-Currencies', this.currencies.join(','))
    }
}

export default CurrencyPlugin;

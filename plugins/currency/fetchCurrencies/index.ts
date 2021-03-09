import axios from 'axios';
import { Currency, LayoutCurrency } from './type';

const LAYOUT_PHOENIX_URL = process.env.GENERAL_SERVICES_LAYOUT_PHOENIX_SERVICE;

/**
 * Formats currency data for display.
 * @param currencies
 * @return {Currency[]}
 */
const formatCurrencies = (currencies: LayoutCurrency[]) => currencies
    .map(({ code, template, symbol, exchange_rate: exchangeRate, round_amount: roundAmount }) => ({
        name: code,
        rate: parseFloat(exchangeRate),
        template: template.replace('{{symbol}}', symbol).replace('{{code}}', code),
        forceRound: roundAmount !== undefined,
        forceRoundFromAmount: roundAmount
    }));

const fetchCurrencies = async(): Promise<Currency[]> => {
    const url = `http://${LAYOUT_PHOENIX_URL}/api/v2/currencies/loggedOutHomePage`;
    const { data } = await axios.get(url);

    return formatCurrencies(data.currencies);
}

export { Currency };
export default fetchCurrencies;
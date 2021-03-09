export interface LayoutCurrency {
    id: number;
    code: string;
    symbol: string;
    name: string;
    template: string;
    round_amount: number;
    exchange_rate: string;
}

export interface Currency {
    name: string;
    template: string;
    rate: number;
    forceRound: boolean;
    forceRoundFromAmount: number;
}

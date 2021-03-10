export interface Currency {
    name: string;
    template: string;
    rate: number;
    forceRound: boolean;
    forceRoundFromAmount: number;
}

export interface CurrenciesPlugins {
}
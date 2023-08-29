export interface IPositions {
    amountCoin: number;
    core: number;
    email: string;
    entryPrice: number;
    id: number;
    liquidationPrice: number;
    margin: number;
    regime: 'cross' | 'isolated';
    side: 'buy' | 'sell';
    symbol: string;
    userid: number;
    PNL: number;
    ROE: number;
    RISK: number;
    SIZE: number;
    MARK_PRICE: number;
    LIQ_PRICE: number;
    ROUND: number;
}

export interface IFunding {
    symbol: string;
    symbolLogo: string;
    status: number;
    uMarginList: IMarginList[];
    cMarginList: IMarginList[];
    uIndexPrice: number;
    uPrice: number;
    cIndexPrice: number;
    cPrice: number;
}

export interface IMarginList {
    rate: number,
    exchangeLogo: string,
    exchangeName: string,
    status: number,
    nextFundingTime: number,
}

export interface ICoins {
    bestAsk: number;
    close: number;
    closeCandlestick: number;
    currency: string;
    high: number;
    id: number;
    image: string;
    low: number;
    open: number;
    pair: string;
    percentChange: number;
    symbol: string;
    volume: number;
}

export interface ISellBuy {
    amount: number;
    created_at: string;
    id: number;
    price: number;
    symbol: string;
    totalUsdt: number;
    percent: number;
}
import { IPositions } from "./futuresModel";

export interface ReqGetTotalBuy {
    limit: number;
    page: number;
    symbol: string;
}

export interface ReqOrderFuture {
    amount: string | number;
    regime: string;
    core: string | number;
    symbol: string;
    side: string;
    typeTrade: string;
    priceLimit?: string | number;
}

export interface ReqLimitPage {
    limit: number,
    page: number,
}

export type RootStackParamList = {
    Home: undefined;
    Futures: {
        position: IPositions
    };
};
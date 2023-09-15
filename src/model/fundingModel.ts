export interface IBank {
    id: number,
    image: number,
    created_at: string,
    name_banking: string,
    owner_banking: string,
    number_banking: string,
}

export interface IReqCreateDepositVND {
    amount: string;
    message: string;
    idBanking: string | number;
}

export interface IOpenOrder {
    id: number,
    core: number,
    type: number,
    cost: number,
    side: string,
    email: string,
    amount: number,
    symbol: string,
    regime: string,
    userid: number,
    SL: number | null,
    TP: number | null,
    typeTrade: string,
    amountCoin: number,
    idPosition: number,
    created_at: string,
    amountInput: number,
    amountPnL_SL: number,
    amountPnL_TP: number,
    orderEntryPrice: number,
    amountCoinInput: number,
    closeEntryPrice: number,
    liquidationPrice: number,
    triggerSL: null | string,
    triggerTP: null | string,
}

export interface IOpenOrderConver extends IOpenOrder {
    reducerOnly: boolean,
    showTPSL: number | boolean,
    triggerConditionsTP: string | null,
    triggerConditionsSL: string | null,
}

export interface IReqHistoryOpenOrder {
    page: number;
    limit: number;
    symbol: string;
}

export interface IOrderHistory {
    id: number;
    side: string;
    cost: number;
    core: number;
    type: number;
    email: string;
    userid: number;
    regime: string;
    amount: number;
    symbol: string;
    typeTrade: string;
    created_at: string;
    amountCoin: number;
    idPosition: number;
    liquidationPrice: number;
    orderEntryPrice: number;
    closeEntryPrice: number;
}
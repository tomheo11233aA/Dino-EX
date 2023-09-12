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
    id: number;
    cost: number;
    core: number;
    type: number;
    side: string;
    email: string;
    userid: number;
    amount: number;
    regime: string;
    symbol: string;
    typeTrade: string;
    created_at: string;
    amountCoin: number;
    idPosition: number;
    orderEntryPrice: number;
    closeEntryPrice: number;
    liquidationPrice: number;
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
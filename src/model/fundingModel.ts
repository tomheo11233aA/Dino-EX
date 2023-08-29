export interface IBank {
    created_at: string,
    id: number,
    image: number,
    name_banking: string,
    number_banking: string,
    owner_banking: string,
}

export interface IReqCreateDepositVND {
    idBanking: string | number;
    amount: string;
    message: string;
}
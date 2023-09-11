import { checkTransactionDepositVndThunk, getBankingThunk, getHistoryOpenOrderAllThunk, getHistoryOpenOrderThunk } from "@asyncThunk/fundingAsyncThunk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { depositStep } from "@util/contants";
import { IBank, IOpenOrder } from "src/model/fundingModel";
import { IDepositInfo } from "src/model/walletModel";

interface IFundingSlice {
    banks: IBank[],
    loading: boolean,
    openOrders: {
        data: IOpenOrder[];
    },
    deposit: {
        step: string;
        bankChoosed: IBank | null;
        transferInfo: IDepositInfo | null;
    },
}

const initialState: IFundingSlice = {
    banks: [],
    loading: false,
    openOrders: {
        data: [],
    },
    deposit: {
        step: depositStep.PAYMENT,
        bankChoosed: null,
        transferInfo: null,
    },
}

const fundingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBankChoosed: (state, action: PayloadAction<IBank>) => {
            state.deposit.bankChoosed = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getBankingThunk.fulfilled, (state, { payload }) => {
                // state.loading = false
                if (payload.status) {
                    state.banks = payload.data
                    state.deposit.bankChoosed = payload.data[0]
                }
            })
            .addCase(checkTransactionDepositVndThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(checkTransactionDepositVndThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                if (!payload.error) {
                    if (payload.status) {
                        if (payload.data.type_admin === 0 && payload.data.type_user === 0) {
                            state.deposit.step = depositStep.CONFIRM_PAYMENT
                            state.deposit.transferInfo = payload.data
                        } else if (payload.data.type_admin === 2 && payload.data.type_user === 0) {
                            if (payload.data.images) {
                                state.deposit.step = depositStep.DONE
                                state.deposit.transferInfo = payload.data
                            } else {
                                state.deposit.step = depositStep.SUBMIT_IMG
                                state.deposit.transferInfo = payload.data
                            }
                        }
                    } else {
                        state.deposit.step = depositStep.TRANSFER
                        state.deposit.transferInfo = null
                    }
                } else {
                    state.loading = true
                }
            })
            .addCase(getHistoryOpenOrderAllThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.openOrders.data = payload.data.array
                }
            })
            .addCase(getHistoryOpenOrderThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.openOrders.data = payload.data.array
                }
            })
    }
})

export const {
    setBankChoosed,
} = fundingSlice.actions

export default fundingSlice
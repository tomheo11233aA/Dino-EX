import { getListUserTraderThunk, getPositionToTraderThunk } from "@asyncThunk/copyTradeAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

interface ICopyTradeSlice {
    listUserTrader: {
        loading: boolean;
        data: any[];
        total: number;
    },
    positionToTrader: {
        loading: boolean;
        data: any[];
    };
    hotTrader: any;
}

const initialState: ICopyTradeSlice = {
    listUserTrader: {
        loading: false,
        data: [],
        total: 0,
    },
    positionToTrader: {
        loading: false,
        data: [],
    },
    hotTrader: {}
}

const copyTradeSlice = createSlice({
    name: 'copyTrade',
    initialState,
    reducers: {
        setHotTrader: (state, { payload }) => {
            state.hotTrader = payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getListUserTraderThunk.pending, (state) => {
                state.listUserTrader.loading = true
            })
            .addCase(getListUserTraderThunk.fulfilled, (state, { payload }) => {
                state.listUserTrader.loading = false
                if (payload.status) {
                    state.listUserTrader.data = payload.data.array
                    state.listUserTrader.total = payload.data.total
                }
            })
            .addCase(getPositionToTraderThunk.pending, (state) => {
                state.positionToTrader.loading = true
            })
            .addCase(getPositionToTraderThunk.fulfilled, (state, { payload }) => {
                state.positionToTrader.loading = false
                if (payload.status) {
                    state.positionToTrader.data = payload.data
                } else {
                    state.positionToTrader.data = []
                }
            })
    }
})

export const {
    setHotTrader,
} = copyTradeSlice.actions

export default copyTradeSlice
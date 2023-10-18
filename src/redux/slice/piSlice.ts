import { createSlice } from "@reduxjs/toolkit";

interface IPiSlice {
    chart: any[];
}

const initialState: IPiSlice = {
    chart: [],
}

const piSlice = createSlice({
    name: 'pi',
    initialState,
    reducers: {
        setChartPI: (state, { payload }) => {
            state.chart = payload
        },
        setChartPISocket: (state, { payload }) => {
            state.chart[state.chart.length - 1].close = payload
        }
    },
})

export const {
    setChartPI,
    setChartPISocket,
} = piSlice.actions

export default piSlice
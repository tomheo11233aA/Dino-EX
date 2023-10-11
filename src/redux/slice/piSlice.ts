import { createSlice } from "@reduxjs/toolkit";

interface IPiSlice {
    chart: any;
}

const initialState: IPiSlice = {
    chart: []
}

const piSlice = createSlice({
    name: 'pi',
    initialState,
    reducers: {
        setChart: (state, { payload }) => {
            state.chart = payload
        },
        setChartFromSocket: (state, { payload }) => {
            state.chart[state.chart.length - 1] = payload
        },
    },
})

export const {
    setChart,
    setChartFromSocket,
} = piSlice.actions

export default piSlice
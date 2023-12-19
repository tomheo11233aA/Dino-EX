import { convertTimeGetChart } from "@method/format";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { WritableDraft } from "immer/dist/internal";
import { ISellBuy } from "src/model/futuresModel";
import { ITimeLimit, Trade } from "src/model/tradeModel";

interface ITradeSlice {
    loading: boolean;
    dataTrade: Trade[];
    charts: IChart[];
    candles: any;
    highChart: number
    lowChart: number;
    chartItem: Trade | {};
    positionsTotal: number;
    bestAsk: number;
    typeCoin2: string;
    maxHighItem: any;
    minLowItem: any;
    heighValueChart: number;
    countCandles: number,
    scaleCandles: number,
    dPathMA: {
        ma7: string;
        ma25: string;
        ma99: string;
    };
    dPathGreen: '',
    dPathRed: '',
    countDown: number;
    timeLimit: ITimeLimit;
    closeTimestamp: number;
    listTimeLimit: ITimeLimit[];
    sells: ISellBuy[];
    buys: ISellBuy[];
}

const initialState: ITradeSlice = {
    loading: false,
    dataTrade: [],
    candles: [],
    charts: [],
    highChart: Number.MIN_VALUE,
    lowChart: Number.MAX_VALUE,
    chartItem: {},
    positionsTotal: 0,
    bestAsk: 0,
    typeCoin2: 'BTC',
    maxHighItem: null,
    minLowItem: null,
    heighValueChart: 0,
    countCandles: 0,
    scaleCandles: 0,
    dPathMA: {
        ma7: '',
        ma25: '',
        ma99: '',
    },
    dPathGreen: '',
    dPathRed: '',
    timeLimit: {},
    closeTimestamp: 0,
    listTimeLimit: [],
    countDown: 0,
    sells: [],
    buys: [],
}

const tradeSlice = createSlice({
    name: 'trade',
    initialState,
    reducers: {
        setBuys: (state, { payload }) => {
            const data = payload.sort((p1: any, p2: any) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0)
            state.buys = data.slice(0, 7)
        },
        setSells: (state, { payload }) => {
            const data = payload.sort((p1: any, p2: any) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0)
            state.sells = data.slice(0, 7)
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setTimeLimit: (state, action: PayloadAction<ITimeLimit>) => {
            state.timeLimit = action.payload
            state.loading = true
        },
        setListTimeLimit: (state, action: PayloadAction<ITimeLimit[]>) => {
            state.listTimeLimit = action.payload
            state.timeLimit = action.payload[0]
        },
        setTypeCoin2: (state, action: PayloadAction<string>) => {
            state.typeCoin2 = action.payload
        },
        setPositions: (state, action: PayloadAction<number>) => {
            state.positionsTotal = action.payload
        },
        setBestAsk: (state, action: PayloadAction<number>) => {
            state.bestAsk = action.payload
        },
        setChartFromAPI: (state, { payload }: PayloadAction<any>) => {
            state.countCandles = 0
            state.dataTrade = payload.arr
            state.candles = payload.arr.slice(payload.arr.length - payload.size_chart, payload.arr.length)
            state.closeTimestamp = state.dataTrade[state.dataTrade.length - 1]?.closeTimestamp
            handleSetChart(state, payload)
        },
        setChart: (state, { payload }) => {
            if (state.countCandles !== 0 || state.candles.length === 0) return
            const timeCurrency = Number((Date.now() / 1000).toFixed(0)) // Thời gian hiện tại
            state.countDown = state.closeTimestamp - timeCurrency + 3 // Thời gian đếm ngược
            for (let index = 0; index < payload.dataSocket.length; index++) {
                // Nếu timeString của dataSocket[index] === timeString được user chọn
                if (payload.dataSocket[index].timeString === state.timeLimit.timeString) {
                    let data = payload.dataSocket[index]
                    // countDown < 1 tức là hết thời gian đếm ngược
                    // Cập nhất lại giá trị của closeTimestamp
                    if (state.countDown < 1) {
                        if (state.timeLimit.timeString) state.closeTimestamp += convertTimeGetChart(state.timeLimit.timeString)
                    }
                    const lastChart = state.candles[state.candles.length - 1] // item cuối cùng của candles
                    // Nếu closeTimestamp do socket trả về != closeTimestamp của last chart thì sẽ push nến mới vào mảng chart
                    if (data.closeTimestamp != lastChart.closeTimestamp) {
                        data = {
                            ...data,
                            open: lastChart.close, // open, high, low, close nến mới = close nến cũ
                            high: lastChart.close, 
                            low: lastChart.close,
                            close: lastChart.close,
                        }

                        state.dataTrade.push(data) // push nến mới vào mảng
                        state.candles.push(data) // push nến mới vào candles
                        state.dataTrade.shift() // xóa item đầu tiên trong mảng
                        state.candles.shift() // xóa item đầu tiên trong nến

                    } else {
                        data = {
                            ...data,
                            close: payload.close, // Giá đóng hiện tại
                            open: state.candles[state.candles.length - 2].close, // open = close của nến áp chót
                            high: payload.close > lastChart.high ? payload.close : lastChart.close, // Nếu close hiện tại > high thì high = close
                            low: payload.close < lastChart.low ? payload.close : lastChart.low // Nếu close hiện tại < low thì low = close
                        }
                        // set lại item cuối cùng trong mảng
                        state.dataTrade[state.dataTrade.length - 1] = data
                        state.candles[state.candles.length - 1] = data
                    }
                    break
                }
            }
            handleSetChart(state, payload)
        },
        chartTranslate: (state, { payload }) => {
            // Khi user lướt chart về phía sau
            if (state.countCandles >= 395) return
            if ((state.countCandles + state.candles.length) >= state.dataTrade.length) return
            state.countCandles++
            const item = state.dataTrade[state.dataTrade.length - (state.candles.length + state.countCandles)]
            // Khi user lướt chart về phía sau, candles sẽ thêm item được lấy từ dataTrade để thêm vào phần tử đầu tiên trong candles
            // Đồng thời xóa phần tử cuối cùng trong candles
            state.candles.unshift(item)
            state.candles.pop()

            handleSetChart(state, payload)
        },
        chartTranslateReveser: (state, { payload }) => {
            // Khi user lướt chart về phía trước
            if (state.countCandles === 0) return
            state.countCandles--
            const item = state.dataTrade[state.dataTrade.length - (state.candles.length + state.countCandles) + state.candles.length - 1]
            // Khi user lướt chart về phía trước, candles sẽ thêm item được lấy từ dataTrade để thêm vào phần tử cuối cùng trong candles
            // Đồng thời xóa phần tử đầu tiên trong candles
            state.candles.push(item)
            state.candles.shift()

            handleSetChart(state, payload)
        },
        setZoom: (state, { payload }) => {
            // Bắt sự kiện khi user phóng to hoặc thu nhỏ chart
            if (state.candles.length < 1) return
            handleSetChart(state, payload)
        },
    },
})

export default tradeSlice

const handleSetChart = (state: WritableDraft<ITradeSlice>, payload: any) => {
    state.dPathGreen = '' // Nến xanh
    state.dPathRed = '' // Nế đỏ

    // High cao nhất trong candles, low thấp nhất trong candles
    let [maxHighItem, minLowItem]: any =
        [{ high: Number.MIN_SAFE_INTEGER }, { low: Number.MAX_SAFE_INTEGER }]

    for (let i = 0; i < state.candles.length; i++) {
        // Tìm high cao nhất trong candles
        maxHighItem = state.candles[i]?.high >= maxHighItem?.high ?
            { ...state.candles[i], position: i } : maxHighItem
        // Tìm low thấp nhất trong candles
        minLowItem = state.candles[i]?.low <= minLowItem?.low ?
            { ...state.candles[i], position: i } : minLowItem
    }

    const heighChart = maxHighItem.high - minLowItem.low // Chiều cao của chart | heighChart = high cao nhất - low thấp nhất
    maxHighItem.high = Number(maxHighItem.high) + (heighChart / 10) // Tăng giá trị của high cao nhất
    minLowItem.low = minLowItem.low - (heighChart / 10) // Giảm giá trị của low thấp nhất
    // Sau khi có giá trị mới của high cao nhất và low thấp nhất ta có heighValueChart = high = low
    const heighValueChart = maxHighItem.high - minLowItem.low
    // section = Chiều cao của candles trong SVG / chiều cao của chart Candles 
    const section = payload.heigh_candle / heighValueChart

    let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
    const SIZE = state.dataTrade.length - state.candles.length

    let candles = state.candles.map((item: IChart, index: number) => {
        // hightSVG là value dùng trong SVG được quy đổi từ high của mỗi item sang, tương tự như lowSVG, closeSVG, openSVG
        let highSVG = payload.heigh_candle - ((item?.high - minLowItem.low) * section) + payload.paddingTop // highSVG của nến
        let lowSVG = payload.heigh_candle - ((item?.low - minLowItem.low) * section) + payload.paddingTop // lowSVG của nến
        let closeSVG = payload.heigh_candle - ((item?.close - minLowItem.low) * section) + payload.paddingTop // closeSVG của nến
        let openSVG = payload.heigh_candle - ((item?.open - minLowItem.low) * section) + payload.paddingTop // openSVG của nến
        let colorChart =
            item?.close >= item?.open ? colors.greenCan : colors.red3

        let x = payload.gap_candle * index - payload.padding_right_candle // Điểm chính giữa của nến
        let x2 = x - (payload.width_candle / 2) + 0.5 // Điểm bắt đầu của nến
        let x3 = x + (payload.width_candle / 2) - 0.5 // Điểm kết thúc của nến
        // Vẽ thành một cây nến hoàn chỉnh
        const path = `
              M${x} ${highSVG} L${x} ${lowSVG}
              M${x2} ${openSVG} L${x3} ${openSVG}
              L${x3} ${closeSVG}
              L${x2} ${closeSVG}
              L${x2} ${openSVG}
            `
        // Nếu là nến xanh
        if (item?.close >= item?.open) {
            state.dPathGreen += path
        } else {
            state.dPathRed += path
        }

        if (index === 0) {
            for (let i = (SIZE - state.countCandles); i > (SIZE - 99 - state.countCandles); i--) {
                const close = Number(state.dataTrade[i]?.close) // Giá đóng của nến
                sumMA99 += close // tổng ma99
                if ((SIZE - i - state.countCandles) < 7) sumMA7 += close // tổng ma7
                if ((SIZE - i - state.countCandles) < 25) sumMA25 += close // tổng ma25
            }
        } else {
            const firtValueSumMA7 = Number(state.dataTrade[SIZE + index - 7 - state.countCandles]?.close) // tìm value đầu tiên trong sumMA7
            const firtValueSumMA25 = Number(state.dataTrade[SIZE + index - 25 - state.countCandles]?.close) // tìm value đầu tiên trong sumMA25
            const firtValueSumMA99 = Number(state.dataTrade[SIZE + index - 99 - state.countCandles]?.close) // tìm value đầu tiền trong sumMA99
            const current = Number(item?.close) // Giá đóng
            sumMA7 = sumMA7 - firtValueSumMA7 + current // tổng ma7
            sumMA25 = sumMA25 - firtValueSumMA25 + current // tổng ma25
            sumMA99 = sumMA99 - firtValueSumMA99 + current // tổng ma99
        }

        let dma7 = payload.heigh_candle - ((sumMA7 / 7 - minLowItem.low) * section) + payload.paddingTop || 0 // ma7 của nến
        let dma25 = payload.heigh_candle - ((sumMA25 / 25 - minLowItem.low) * section) + payload.paddingTop || 0 // ma25 của nến
        let dma99 = payload.heigh_candle - ((sumMA99 / 99 - minLowItem.low) * section) + payload.paddingTop || 0 // ma99 của nến

        const char = index === 0 ? 'M' : 'L'
        dPathMA7 += `${char}${x} ${dma7}` // đường thẳng ma7 của chart nến
        dPathMA25 += `${char}${x} ${dma25}` // đường thẳng ma25 của chart nến
        dPathMA99 += `${char}${x} ${dma99}` // đường thẳng ma99 của chart nến

        return {
            ...item,
            highSVG,
            lowSVG,
            colorChart,
            closeSVG,
            openSVG,
            ma7: sumMA7 / 7,
            ma25: sumMA25 / 25,
            ma99: sumMA99 / 99,
        }
    })
    state.candles = candles
    state.maxHighItem = maxHighItem
    state.minLowItem = minLowItem
    state.heighValueChart = heighValueChart
    state.dPathMA = {
        ma7: dPathMA7,
        ma25: dPathMA25,
        ma99: dPathMA99,
    }
}
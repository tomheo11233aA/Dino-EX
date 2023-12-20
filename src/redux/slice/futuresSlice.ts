import { cancelOpenOrderThunk, closeMarketFutureAllThunk, closeMarketFutureThunk, getChartFuturesThunk, getPositionThunk, getTotalBuyThunk, getTotalSellThunk, leverAdjustmentAPIThunk } from "@asyncThunk/futuresAsyncThunk";
import { convertTimeGetChart } from "@method/format";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { WritableDraft } from "immer/dist/internal";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ICoins, IPositions, ISellBuy, ITpslPosition, ITriggerTPSL } from "src/model/futuresModel";
import { ITimeLimit } from "src/model/tradeModel";

interface IfuturesSlice {
    loading: boolean,
    positions: IPositions[];
    position: IPositions | null;
    PNL: number;
    charts: IChart[];
    candles: IChart[];
    maxHighItem: any;
    minLowItem: any;
    heighValueChart: number;
    coins: ICoins[];
    symbol: string;
    currency: string;
    USDT: boolean;
    sells: ISellBuy[];
    buys: ISellBuy[];
    sellPrice: number | string;
    colorSellPrice: string;
    regime: 'Cross' | 'Isolated';
    typeTrade: 'Limit' | 'Market';
    side: 'buy' | 'sell';
    price: number | string;
    core: number;
    amount: number | string;
    leverAdjustment: {
        showModal: boolean;
        core: number;
        idPosition: number;
        loading: boolean;
    };
    dPathMA: {
        ma7: string;
        ma25: string;
        ma99: string;
    };
    countCandles: number;
    timeLimit: ITimeLimit;
    listTimeLimit: ITimeLimit[];
    closeTimestamp: number;
    countDown: number;
    stopProfit: {
        showModal: boolean;
        position: IPositions | null;
    },
    sliderListen: boolean;
    tp: number | string;
    sl: number | string;
    triggerTPSL: ITriggerTPSL;
    tpslPosition: ITpslPosition;
    loadingHistoryFuture: boolean;
    fee: number[],
    dPathGreen: string,
    dPathRed: string,
}

const initialState: IfuturesSlice = {
    loading: true,
    positions: [],
    position: null,
    PNL: 0,
    charts: [],
    candles: [],
    maxHighItem: null,
    minLowItem: null,
    heighValueChart: 0,
    sells: [],
    buys: [],
    sellPrice: 0,
    colorSellPrice: Colors.red3,
    coins: [],
    symbol: 'BTCUSDT',
    currency: 'BTC',
    USDT: false,
    regime: 'Cross',
    typeTrade: 'Market', // market is default
    side: 'buy',
    price: '',
    core: 1,
    amount: '',
    leverAdjustment: {
        showModal: false,
        core: 1,
        idPosition: -1,
        loading: false,
    },
    dPathMA: {
        ma7: '',
        ma25: '',
        ma99: '',
    },
    timeLimit: {},
    listTimeLimit: [],
    countCandles: 0,
    closeTimestamp: 0,
    countDown: 0,
    stopProfit: {
        showModal: false,
        position: null,
    },
    sliderListen: false,
    tp: '',
    sl: '',
    triggerTPSL: {
        tpsl: '',
        value: 'Mark',
        showOption: false,
    },
    tpslPosition: {
        position: null,
        showModal: false,
    },
    loadingHistoryFuture: false,
    fee: [0, 0],
    dPathGreen: '',
    dPathRed: '',
}

const futuresSlice = createSlice({
    name: 'futures',
    initialState,
    reducers: {
        setTPSLPosition: (state, action: PayloadAction<ITpslPosition>) => {
            state.tpslPosition = action.payload
        },
        setTriggerTPSL: (state, action: PayloadAction<ITriggerTPSL>) => {
            state.triggerTPSL = action.payload
        },
        setTP: (state, action: PayloadAction<number | string>) => {
            state.tp = action.payload
        },
        setSL: (state, action: PayloadAction<number | string>) => {
            state.sl = action.payload
        },
        setTimeLimit: (state, action: PayloadAction<ITimeLimit>) => {
            state.timeLimit = action.payload
            state.loading = true
        },
        setListTimeLimit: (state, action: PayloadAction<ITimeLimit[]>) => {
            state.listTimeLimit = action.payload
            state.timeLimit = action.payload[0]
        },
        setPNL: (state, action: PayloadAction<number>) => {
            state.PNL = action.payload
        },
        setPosition: (state, action: PayloadAction<IPositions | null>) => {
            state.position = action.payload
        },
        setChartItem: (state, action: PayloadAction<any>) => {
            state.charts[state.charts.length - 1] = action.payload
            state.candles[state.candles.length - 1] = action.payload
        },
        setCoins: (state, action: PayloadAction<ICoins[]>) => {
            state.coins = action.payload
        },
        setLeverAdjustment: (state, { payload }) => {
            state.leverAdjustment = payload
        },
        setRegime: (state, action: PayloadAction<'Cross' | 'Isolated'>) => {
            state.regime = action.payload
        },
        setCore: (state, action: PayloadAction<number>) => {
            state.core = action.payload
            state.amount = '0'
            state.sliderListen = !state.sliderListen
        },
        setSide: (state, action: PayloadAction<'buy' | 'sell'>) => {
            state.side = action.payload
        },
        setTypeTrade: (state, action: PayloadAction<'Limit' | 'Market'>) => {
            state.typeTrade = action.payload
        },
        setPrice: (state, action: PayloadAction<number | string>) => {
            state.price = action.payload
        },
        refreshWhenOrderFuture: (state) => {
            state.amount = ''
            state.sliderListen = !state.sliderListen
            state.price = state.coins.filter(coin => coin.symbol === state.symbol)[0].close
        },
        setSymbol: (state, action: PayloadAction<{ symbol: string, currency: string }>) => {
            state.symbol = action.payload.symbol
            state.currency = action.payload.currency
        },
        setSymbolLoading: (state, action: PayloadAction<{ symbol: string, currency: string }>) => {
            state.symbol = action.payload.symbol
            state.currency = action.payload.currency
            state.loading = true
        },
        setUSDT: (state, action: PayloadAction<boolean>) => {
            state.USDT = action.payload
            state.amount = ''
            state.sliderListen = !state.sliderListen
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setAmount: (state, action: PayloadAction<number | string>) => {
            state.amount = action.payload
        },
        setSells: (state, { payload }) => {
            setSellOrBuy(state, payload.array, 'sell')
        },
        setBuys: (state, { payload }) => {
            setSellOrBuy(state, payload.array, 'buy')
        },
        setChartFromAPI: (state, { payload }: PayloadAction<any>) => {
            state.countCandles = 0
            state.charts = payload.arr
            state.candles = payload.arr.slice(payload.arr.length - payload.size_chart, payload.arr.length)
            state.closeTimestamp = state.charts[state.charts.length - 1]?.closeTimestamp
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

                        state.charts.push(data) // push nến mới vào mảng
                        state.candles.push(data) // push nến mới vào candles
                        state.charts.shift() // xóa item đầu tiên trong mảng
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
                        state.charts[state.charts.length - 1] = data
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
            if ((state.countCandles + state.candles.length) >= state.charts.length) return
            state.countCandles++
            const item = state.charts[state.charts.length - (state.candles.length + state.countCandles)]
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
            const item = state.charts[state.charts.length - (state.candles.length + state.countCandles) + state.candles.length - 1]
            // Khi user lướt chart về phía trước, candles sẽ thêm item được lấy từ dataTrade để thêm vào phần tử cuối cùng trong candles
            // Đồng thời xóa phần tử đầu tiên trong candles
            state.candles.push(item)
            state.candles.shift()

            handleSetChart(state, payload)
        },
        setZoom: (state, { payload }) => {
            if (state.candles.length < 1) return
            handleSetChart(state, payload)
        },
        setStopProfit: (state, { payload }) => {
            state.stopProfit = payload
        },
        setFee: (state, { payload }) => {
            state.fee = payload
        }
    },
    extraReducers: builder => {
        builder.
            addCase(getPositionThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.positions = payload.data
                    state.core = state.positions.filter(item => item.symbol == state.symbol)[0]?.core || 1
                } else {
                    state.positions = []
                    state.core = 1
                }
            }).addCase(getChartFuturesThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.charts = payload.charts
                    state.candles = payload.candles
                    state.maxHighItem = payload.maxHighItem
                    state.minLowItem = payload.minLowItem
                    state.heighValueChart = payload.heighValueChart
                    state.dPathMA = payload.dPathMA
                }
            }).addCase(closeMarketFutureAllThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.PNL = 0
                    state.core = 1
                }
            }).addCase(closeMarketFutureThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.PNL = 0
                }
            }).addCase(leverAdjustmentAPIThunk.pending, (state) => {
                state.leverAdjustment.loading = true
            }).addCase(leverAdjustmentAPIThunk.fulfilled, (state, { payload }) => {
                state.leverAdjustment.loading = false
                if (payload.status) {
                    state.leverAdjustment.showModal = false
                    state.leverAdjustment.idPosition = -1
                    state.leverAdjustment.core = payload.core
                }
            })
            .addCase(getTotalSellThunk.pending, (state) => {
                state.sells = []
                state.sellPrice = 0
            })
            .addCase(getTotalSellThunk.fulfilled, (state, { payload }) => {
                if (state.symbol === 'XRPUSDT') return
                if (payload.status) {
                    setSellOrBuy(state, payload.data.array, 'sell')
                }
            })
            .addCase(getTotalBuyThunk.pending, (state) => {
                state.buys = []
            })
            .addCase(getTotalBuyThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    setSellOrBuy(state, payload.data.array, 'buy')
                }
            }).addCase(cancelOpenOrderThunk.pending, (state) => {
                state.loadingHistoryFuture = true
            })
            .addCase(cancelOpenOrderThunk.fulfilled, (state) => {
                state.loadingHistoryFuture = false
            })
    }
})

const handleSetChart = (state: WritableDraft<IfuturesSlice>, payload: any) => {
    state.dPathGreen = '' // Nến xanh
    state.dPathRed = '' // Nến đỏ

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
    maxHighItem.high = Number(maxHighItem.high) + (heighChart / 6) // Tăng giá trị của high cao nhất
    minLowItem.low = minLowItem.low - (heighChart / 10) // Giảm giá trị của low thấp nhất
    // Sau khi có giá trị mới của high cao nhất và low thấp nhất ta có heighValueChart = high = low
    const heighValueChart = maxHighItem.high - minLowItem.low
    // section = Chiều cao của candles trong SVG / chiều cao của chart Candles 
    const section = payload.heigh_candle / heighValueChart

    let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
    const SIZE = state.charts.length - state.candles.length

    let candles = state.candles.map((item: IChart, index: number) => {
        // hightSVG là value dùng trong SVG được quy đổi từ high của mỗi item sang, tương tự như lowSVG, closeSVG, openSVG
        let highSVG = payload.heigh_candle - ((item?.high - minLowItem.low) * section) // highSVG của nến
        let lowSVG = payload.heigh_candle - ((item?.low - minLowItem.low) * section) // lowSVG của nến
        let closeSVG = payload.heigh_candle - ((item?.close - minLowItem.low) * section) // closeSVG của nến
        let openSVG = payload.heigh_candle - ((item?.open - minLowItem.low) * section) // openSVG của nến
        let colorChart =
            item?.close >= item?.open ? colors.greenCan : colors.red3

        let x = payload.gap_candles * index - payload.padding_right_candle // Điểm chính giữa của nến
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
                const close = Number(state.charts[i]?.close) // Giá đóng của nến
                sumMA99 += close
                if ((SIZE - i - state.countCandles) < 7) sumMA7 += close // tổng ma7
                if ((SIZE - i - state.countCandles) < 25) sumMA25 += close // tổng ma25
            }
        } else {
            const firtValueSumMA7 = Number(state.charts[SIZE + index - 7 - state.countCandles]?.close) // tìm value đầu tiên trong sumMA7
            const firtValueSumMA25 = Number(state.charts[SIZE + index - 25 - state.countCandles]?.close) // tìm value đầu tiên trong sumMA25
            const firtValueSumMA99 = Number(state.charts[SIZE + index - 99 - state.countCandles]?.close) // tìm value đầu tiền trong sumMA99
            const current = Number(item?.close) // Giá đóng
            sumMA7 = sumMA7 - firtValueSumMA7 + current // tổng ma7
            sumMA25 = sumMA25 - firtValueSumMA25 + current // tổng ma25
            sumMA99 = sumMA99 - firtValueSumMA99 + current // tổng ma99
        }

        let dma7 = payload.heigh_candle - ((sumMA7 / 7 - minLowItem.low) * section) || 0 // ma7 của nến
        let dma25 = payload.heigh_candle - ((sumMA25 / 25 - minLowItem.low) * section) || 0 // ma25 của nến
        let dma99 = payload.heigh_candle - ((sumMA99 / 99 - minLowItem.low) * section) || 0 // ma99 của nến

        const char = index === 0 ? 'M' : 'L'
        dPathMA7 += `${char}${payload.gap_candles * index - payload.padding_right_candle} ${dma7}` // đường thẳng ma7 của chart nến
        dPathMA25 += `${char}${payload.gap_candles * index - payload.padding_right_candle} ${dma25}` // đường thẳng ma25 của chart nến
        dPathMA99 += `${char}${payload.gap_candles * index - payload.padding_right_candle} ${dma99}` // đường thẳng ma99 của chart nến

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

const setSellOrBuy = async (state: IfuturesSlice, array: any, type: 'sell' | 'buy') => {
    if (array.length > 0) {
        let price = 0
        if (state.coins.length > 0) {
            price = state.coins.filter(coin => coin.symbol === state.symbol)[0].close
        }
        const max_amount = Math.max.apply(Math, array.map((item: any) => item.amount))
        const min_amount = Math.min.apply(Math, array.map((item: any) => item.amount))
        const tb_amount = max_amount - min_amount

        if (type === 'sell') {
            state.colorSellPrice = array[0].price >= state.sellPrice ? colors.greenCan : colors.red3

            state.sellPrice = price < 10 ? price.toFixed(4) :
                (price > 9 && price < 51) ? price.toFixed(3) : price.toFixed(1)
        }

        array = array.sort((p1: any, p2: any) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0)
        array = array.map((item: any) => {
            return (
                {
                    ...item,
                    amount: item.amount * price,
                    price: price < 10 ? item.price.toFixed(4) :
                        (price > 9 && price < 51) ? item.price.toFixed(3) : item.price.toFixed(1),
                    percent: (item.amount - min_amount) * 100 / tb_amount
                }
            )
        })
        if (type === 'sell') {
            state.sells = array.slice(0, 7)
        } else {
            state.buys = array.slice(0, 7)
        }
    }
}

export default futuresSlice
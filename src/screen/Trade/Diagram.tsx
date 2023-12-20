import { useAppDispatch, useAppSelector, useTheme } from "@hooks/index"
import { convertTimeGetChart } from "@method/format"
import LogoChart from "@screen/Futures/LogoChart"
import { symbolFuturesSelector } from "@selector/futuresSelector"
import { candlesTradeSelector, countCandlesTradeSelector, countDownTradeSelector, dPathGreenTradeSelector, dPathMATradeSelector, dPathRedTradeSelector, heighValueChartTradeSelector, maxHighItemTradeSelector, minLowItemTradeSelector, timeLimitSelector } from "@selector/tradeSelector"
import { getChart } from "@service/tradeService"
import tradeSlice from "@slice/tradeSlice"
import { colors } from "@theme/colors"
import contants from "@util/contants"
import { height, width } from "@util/responsive"
import { useEffect } from "react"
import { AppState, AppStateStatus, StyleSheet } from "react-native"
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue } from "react-native-reanimated"
import { G, Svg } from "react-native-svg"
import { io } from "socket.io-client"
import { ICoins } from "src/model/futuresModel"
import Cursor from "./Cursor"
import LineX from "./LineX"
import MinMaxLowHigh from "./MinMaxLowHigh"
import PathMA from "./PathMA"

export const height_container = height * 35 / 100 // Chiều cao của SVG, cao 35% so với chiều cao màn hình
export const heigh_candle = height_container - 40 // Chiều cao của Nến trong chart
export const paddingTop = 20
export const size_chart = 50 // Số lượng Nến được hiển thị trong chart | 50 = 50 nến
const gap_candle = width * 2.55 / 100 // Khoảng cách các nến | bằng 2.55% của của chiều rộng màn hình
const width_candle = width * 2.052 / 100 // Chiều rộng của 1 nến | bằng 2.052% của chiều rộng màn hình
const width_candles = (width * 2.55 / 100) * 30 - width_candle // Tổng chiều rộng của 30 cây nến
const padding_right_candle = size_chart * gap_candle - width_candle - width_candles // padding right của chart nến
// Biểu đồ nến
export default () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector) // symbol hiện tại mà user chọn | BTCUSDT or ETHUSDT
    const timeLimit = useAppSelector(timeLimitSelector) // Thời gian giới hạn | Nếu hết thời gian thì thêm nến mới
    const candles = useAppSelector(candlesTradeSelector) // Mảng Nến
    const minLowItem = useAppSelector(minLowItemTradeSelector) // Object chứa vị trí của item có low thấp nhất trong candles
    const maxHighItem = useAppSelector(maxHighItemTradeSelector) // Object chứa vị trí của item có high cao nhất trong candles
    const heighValueChart = useAppSelector(heighValueChartTradeSelector) // Là chiều dài của Nến | vd: chart Nến có high cao nhất = 36000, low thấp nhất = 30000 => heighValueChart = high - low = 6000
    const dPathMA = useAppSelector(dPathMATradeSelector) // ma7, ma25, ma99 của chart
    const countDown = useAppSelector(countDownTradeSelector) // Thời gian đếm ngược
    const countCandles = useAppSelector(countCandlesTradeSelector)
    const dPathGreen = useAppSelector(dPathGreenTradeSelector) // Nến xanh
    const dPathRed = useAppSelector(dPathRedTradeSelector) // Nến đỏ

    const count = useSharedValue(0) // Tăng lên hoặc giảm xuống khi user trượt trên chart
    const scaleCount = useSharedValue(0) // Scale của chart
    const scaleSum = useSharedValue(2) // Tổng scale
    const widthCandle = useSharedValue(width_candle) // Chiều rộng của 1 nến
    const gapCandle = useSharedValue(gap_candle) // Khoảng cách giữa các nến
    const paddingRightCandles = useSharedValue(padding_right_candle) // padding right của chart nến

    useEffect((): any => {
        handleGetChart()

        const newSocket = io(contants.HOSTING)

        let close = 0 // Giá đóng của coin được user chọn
        newSocket.on('listCoin', (coins: ICoins[]) => {
            if (coins.length > 0) {
                for (let i = 0; i < coins.length; i++) {
                    if (coins[i].symbol === symbol) {
                        close = coins[i].close
                        break
                    }
                }
            }
        })

        // Lấy data nến
        newSocket.on(`${symbol}UPDATESPOT`, data => {
            if (data.length > 0) {
                dispatch(tradeSlice.actions.setChart({
                    close,
                    size_chart,
                    paddingTop,
                    heigh_candle,
                    dataSocket: data,
                    gap_candle: gapCandle.value,
                    width_candle: widthCandle.value,
                    padding_right_candle: paddingRightCandles.value,
                }))
            }
        })

        // lấy buy
        newSocket.on(`${symbol}BUY`, (data) => {
            if (data.array) {
                dispatch(tradeSlice.actions.setBuys(data.array))
            }
        })
        // lấy sell
        newSocket.on(`${symbol}SELL`, (data) => {
            if (data.array) {
                dispatch(tradeSlice.actions.setSells(data.array))
            }
        })

        AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'inactive') {
                newSocket.disconnect()
            }
        });

        return () => newSocket.disconnect()
    }, [])

    const handleGetChart = async () => {
        let time = 1 * 60
        if (timeLimit.timeString) {
            time = convertTimeGetChart(timeLimit.timeString)
        }
        const res = await getChart({
            limit: 500,
            symbol: symbol,
            time: time,
        })
        if (res.status) {
            dispatch(tradeSlice.actions.setChartFromAPI({
                arr: res.data.array,
                size_chart,
                heigh_candle,
                paddingTop,
                gap_candle: gapCandle.value,
                width_candle: widthCandle.value,
                padding_right_candle: paddingRightCandles.value,
            }))
        }
    }

    const handChartTranslate = () => {
        dispatch(tradeSlice.actions.chartTranslate({
            size_chart,
            heigh_candle,
            gap_candle: gapCandle.value,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
            width_candle: widthCandle.value,
        }))
    }

    const handleChartTranslateReveser = () => {
        dispatch(tradeSlice.actions.chartTranslateReveser({
            size_chart,
            heigh_candle,
            gap_candle: gapCandle.value,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
            width_candle: widthCandle.value,
        }))
    }

    // Bắt sự kiện khi user lướt trên màn hình
    const handleGestureEvent = useAnimatedGestureHandler({
        onActive(event, context) {
            // Lướt từ trái sang phải
            if (event.velocityX >= 0) {
                count.value++
                if (count.value > 4) {
                    count.value = 0
                    runOnJS(handChartTranslate)()
                }
            } else { // Lướt từ phải sang trái
                count.value--
                if (count.value < -4) {
                    count.value = 0
                    if (countCandles === 1) {
                        runOnJS(handleGetChart)()
                        return
                    }
                    runOnJS(handleChartTranslateReveser)()
                }
            }
        },
    })

    // Phóng to, thu nhỏ màn hình
    const handleZoom = () => {
        dispatch(tradeSlice.actions.setZoom({
            gap_candle: gapCandle.value,
            heigh_candle,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
            width_candle: widthCandle.value,
        }))
    }

    // Bắt sự kiện khi user dùng 2 ngón tay phóng to, thu nhỏ trên màn hình 
    const pinchHandle = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive(event, context) {
            // Phóng to
            if (event.velocity >= 0) {
                scaleCount.value++
                if (scaleCount.value > 5) {
                    scaleCount.value = 0
                    scaleSum.value = (scaleSum.value + 1 <= 10) ? (scaleSum.value + 1) : 10 // Giá trị zoom
                    gapCandle.value = width * (scaleSum.value + 0.55) / 100 // Tăng khoảng cách giữa các nến
                    widthCandle.value = width * (scaleSum.value + 0.052) / 100 // Tăng chiều rộng của 1 nến
                    paddingRightCandles.value = size_chart * gapCandle.value - widthCandle.value - width_candles // Tăng padding right của chart nến
                    runOnJS(handleZoom)()
                }
            } else { // thu nhỏ
                scaleCount.value--
                if (scaleCount.value < -5) {
                    scaleCount.value = 0
                    scaleSum.value = (scaleSum.value - 1 >= 1) ? (scaleSum.value - 1) : 1 // Giá trị zoom
                    gapCandle.value = width * (scaleSum.value + 0.55) / 100 // Giảm khoảng cách giữa các nến
                    widthCandle.value = width * (scaleSum.value + 0.052) / 100 // Giảm chiều rộng của 1 nến
                    paddingRightCandles.value = size_chart * gapCandle.value - widthCandle.value - width_candles
                    runOnJS(handleZoom)()
                }
            }
        },
    })

    return (
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
            <Animated.View style={[styles.container, { borderColor: theme.line, }]}>
                <LogoChart height={height_container} />
                <PinchGestureHandler onGestureEvent={pinchHandle}>
                    <Animated.View>
                        {candles.length > 0 &&
                            <Svg height={height_container} width={width}>
                                <G key={'G'}>
                                    <LineX
                                        {...{
                                            theme,
                                            candles,
                                            maxHighItem,
                                            heighValueChart,
                                            gap_candle: gapCandle.value,
                                            padding_right_candle: paddingRightCandles.value,
                                        }}
                                    />

                                    <MinMaxLowHigh
                                        {...{
                                            candles,
                                            size_chart,
                                            minLowItem,
                                            maxHighItem,
                                            gap_candle: gapCandle.value,
                                            padding_right_candle: paddingRightCandles.value,
                                        }}
                                    />
                                    <PathMA {...{ dPathMA, dPathGreen, dPathRed }} />
                                </G>
                                <Cursor
                                    {...{
                                        theme,
                                        candles,
                                        countDown,
                                        size_chart,
                                        gap_candle: gapCandle.value,
                                        padding_right_candle: paddingRightCandles.value,
                                    }}
                                />
                            </Svg>
                        }
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height_container,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.line,
    }
})
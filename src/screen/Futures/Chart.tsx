import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { ydmhm } from '@method/date'
import { convertTimeGetChart, numberCommasDot } from '@method/format'
import { candlesFuturesSelector, countCandlesFuturesSelector, dPathGreenFuturesSelector, dPathMAFuturesSelector, dPathRedFuturesSelector, heighValueChartFuturesSelector, maxHighItemFuturesSelector, minLowItemFuturesSelector, symbolFuturesSelector, timeLimitFuturesSelector } from '@selector/futuresSelector'
import { getChart } from '@service/tradeService'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import contants from '@util/contants'
import { height, width } from '@util/responsive'
import React, { useEffect } from 'react'
import { AppState, AppStateStatus, StyleSheet } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Reanimated, { runOnJS, useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated'
import { G, Line, Path, Svg, Text as TextSVG } from 'react-native-svg'
import { io } from 'socket.io-client'
import { ICoins } from 'src/model/futuresModel'
import { Trade } from 'src/model/tradeModel'
import LogoChart from './LogoChart'
import TimeLimitChart from './TimeLimitChart'

export const HEIGH_CONTAINER = height * 30 / 100 // Chiều cao của Container, cao 35% so với chiều cao màn hình
export const SIZE_CHART = 50 // Số lượng Nến được hiển thị trong chart | 50 = 50 nến
const HEIGH_SVG = HEIGH_CONTAINER - 30 // Chiều cao của SVG
const HEIGH_CANDLES = HEIGH_SVG - 20 // Chiểu cao của chart nến
const GAP_CANDLES = width * 2.55 / 100 // Khoảng cách các nến | bằng 2.55% của của chiều rộng màn hình
const WIDTH_CANDLE = width * 2.052 / 100 // Chiều rộng của 1 nến | bằng 2.052% của chiều rộng màn hình
const WIDTH_CANDLES = (width * 2.55 / 100) * 30 - WIDTH_CANDLE  // Tổng chiều rộng của 30 cây nến
const TOTAL_X_LINE = 4 // Số lượng đường thẳng gạch ngang
const PADDING_RIGHT_CANDLE = SIZE_CHART * GAP_CANDLES - WIDTH_CANDLE - WIDTH_CANDLES // Padding right chart nến
const TIMES = [0, 15, 30, 45]

export interface IChart extends Trade {
    closeSVG: number,
    openSVG: number,
    highSVG: number;
    lowSVG: number;
    colorChart: string;
    ma7: number;
    ma25: number;
    ma99: number;
    position: number;
}

interface Props {
    setOpenChart: Function
}
// Biểu đồ nến
const Chart = ({ setOpenChart }: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector) // symbol hiện tại mà user chọn | BTCUSDT or ETHUSDT
    const timeLimit = useAppSelector(timeLimitFuturesSelector) // Thời gian giới hạn | Nếu hết thời gian thì thêm nến mới
    const candles = useAppSelector(candlesFuturesSelector) // Mảng Nến
    const heighValueChart = useAppSelector(heighValueChartFuturesSelector) // Là chiều dài của Nến | vd: chart Nến có high cao nhất = 36000, low thấp nhất = 30000 => heighValueChart = high - low = 6000
    const maxHighItem = useAppSelector(maxHighItemFuturesSelector) // Object chứa vị trí của item có high cao nhất trong candles
    const minLowItem = useAppSelector(minLowItemFuturesSelector) // Object chứa vị trí của item có low thấp nhất trong candles
    const dPathMA = useAppSelector(dPathMAFuturesSelector) // ma7, ma25, ma99 của chart
    const countCandles = useAppSelector(countCandlesFuturesSelector)
    const dPathGreen = useAppSelector(dPathGreenFuturesSelector) // Nến xanh
    const dPathRed = useAppSelector(dPathRedFuturesSelector)  // Nến đỏ

    const count = useSharedValue(0) // Tăng lên hoặc giảm xuống khi user trượt trên chart
    const scaleCount = useSharedValue(0) // Scale của chart
    const scaleSum = useSharedValue(2) // Tổng scale
    const widthCandle = useSharedValue(WIDTH_CANDLE) // Chiều rộng của 1 nến
    const gapCandle = useSharedValue(GAP_CANDLES) // Khoảng cách giữa các nến
    const paddingRightCandles = useSharedValue(PADDING_RIGHT_CANDLE) // padding right của chart nến

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
                dispatch(futuresSlice.actions.setChart({
                    close,
                    dataSocket: data,
                    size_chart: SIZE_CHART,
                    heigh_candle: HEIGH_CANDLES,
                    gap_candles: gapCandle.value,
                    width_candle: widthCandle.value,
                    padding_right_candle: paddingRightCandles.value,
                }))
            }
        })

        AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'inactive') {
                newSocket.disconnect()
            }
            // if (nextAppState === 'active') {
            //     newSocket.connect()
            // }
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
            dispatch(futuresSlice.actions.setChartFromAPI({
                arr: res.data.array,
                size_chart: SIZE_CHART,
                heigh_candle: HEIGH_CANDLES,
                gap_candles: gapCandle.value,
                width_candle: widthCandle.value,
                padding_right_candle: paddingRightCandles.value,
            }))
        }
    }

    // Tạo được đường thẳng trục x trong chart
    const render_x_line = () => {
        return TIMES.map(
            (item: any, index: number) => {
                let gap_x_line = (HEIGH_CANDLES / (TOTAL_X_LINE - 1)) * index // Tính điểm y1, y2 của Line
                gap_x_line =
                    index === 3 ? gap_x_line - 1 : index === 0 ?
                        gap_x_line + 1 : gap_x_line

                const textValue = Number(maxHighItem?.high) - (heighValueChart / (TOTAL_X_LINE - 1)) * index // Giá trị của Line

                const x_point = gapCandle.value * item - paddingRightCandles.value // Tính x1, x2 của Line

                return (
                    <G key={`G_x_line_${index}`}>
                        <Line
                            key={`L_x_line_${index}`}
                            x1={0}
                            y1={gap_x_line}
                            x2={width}
                            y2={gap_x_line}
                            strokeWidth={0.5}
                            stroke={theme.gray}
                        />
                        <TextSVG
                            key={`T_x_line_${index}`}
                            x={width}
                            fill={colors.grayBlue}
                            y={index === 0 ? gap_x_line + 10 : gap_x_line}
                            textAnchor={'end'}
                            fontSize={9}
                        >
                            {numberCommasDot(textValue.toFixed(2))}
                        </TextSVG>

                        <Line
                            key={`l2_candles_Y ${index}`}
                            x1={x_point}
                            y1={0}
                            x2={x_point}
                            y2={HEIGH_CANDLES}
                            stroke={theme.gray2}
                            strokeWidth={1}
                        />
                        <TextSVG
                            key={`T_candles ${index}`}
                            x={x_point}
                            y={HEIGH_SVG - 10}
                            fontSize={9}
                            fill={colors.grayBlue}
                            textAnchor={'middle'}
                        >
                            {ydmhm(candles[item].time)}
                        </TextSVG>
                    </G>
                )
            })
    }
    // Show close hiện tại, ma7, ma25, ma99
    const render_cursor = () => {
        const lastChart = candles[candles.length - 1]
        const close = Number(maxHighItem?.high) - lastChart.close
        const percentClose = (close * 100 / heighValueChart)
        let closeSVG = (HEIGH_CANDLES * percentClose / 100)

        const ma7 = numberCommasDot(lastChart?.ma7?.toFixed(2)) || 0 // ma7 của item chart cuối cùng
        const ma25 = numberCommasDot(lastChart?.ma25?.toFixed(2)) || 0 // ma25 của item chart cuối cùng
        const ma99 = numberCommasDot(lastChart?.ma99?.toFixed(2)) || 0 // ma99 của item chart cuối cùng

        const x_text_ma7 = 7

        return (
            <G key={'G_cursor'}>
                <Line
                    key={'L_cursor_yellow'}
                    x1={WIDTH_CANDLES}
                    y1={closeSVG}
                    x2={width}
                    y2={closeSVG}
                    stroke={colors.yellow}
                    strokeWidth={1}
                    strokeDasharray={'1 2'}
                />
                <Line
                    key={'L_cursor'}
                    x1={width}
                    y1={closeSVG}
                    x2={width - 60}
                    y2={closeSVG}
                    stroke={theme.gray2}
                    strokeWidth={15}
                />
                <TextSVG
                    key={'text_close'}
                    fill={colors.yellowBold}
                    x={width - 4}
                    y={closeSVG + 4}
                    textAnchor={'end'}
                    fontSize={10}
                >
                    {numberCommasDot(Number(lastChart.close).toFixed(2))}
                </TextSVG>
                <TextSVG
                    key={'text_MA7'}
                    fill={colors.yellowBold}
                    x={x_text_ma7}
                    y={12}
                    textAnchor={'start'}
                    fontSize={9}
                >
                    {`MA(7): ${ma7}`}
                </TextSVG>
                <TextSVG
                    key={'text_M25'}
                    fill={colors.ma25}
                    x={x_text_ma7 + 90}
                    y={12}
                    textAnchor={'start'}
                    fontSize={9}
                >
                    {`MA(25): ${ma25}`}
                </TextSVG>
                <TextSVG
                    key={'text_MA99'}
                    fill={colors.ma99}
                    x={x_text_ma7 + 185}
                    y={12}
                    textAnchor={'start'}
                    fontSize={9}
                >
                    {`MA(99): ${ma99}`}
                </TextSVG>
                <Line
                    key={'L_MA'}
                    x1={0}
                    y1={18}
                    x2={width}
                    y2={18}
                    stroke={theme.gray2}
                    strokeWidth={1}
                />
            </G>
        )
    }
    // Show giá đóng cao nhất, thấp nhất của chart
    const render_max_min_candle = () => {
        const gap_x1_x2_line_max =
            SIZE_CHART / 2 < Number(maxHighItem?.position) ? -20 : 20 // khoảng cách x1 x2 đường thẳng cao nhất
        const gap_x1_x2_line_min =
            SIZE_CHART / 2 < Number(minLowItem?.position) ? -20 : 20 // Khoảng cách x1 x2 thấp nhất

        const x_line_max = gapCandle.value * Number(maxHighItem?.position) - paddingRightCandles.value // Tính x1, x2 cao nhất của đường thẳng
        const y_line_max = candles[Number(maxHighItem?.position)].highSVG // Tính y1, y2 cao nhất của đường thẳng

        const x_line_min = gapCandle.value * Number(minLowItem?.position) - paddingRightCandles.value // Tính x1, x2 thấp nhất của đường thẳng
        const y_line_min = candles[Number(minLowItem?.position)].lowSVG // Tính x1, x2 thấp nhất của đường thẳng

        const high = Number(candles[Number(maxHighItem?.position)].high).toFixed(2) // Value hight cao nhất của chart
        const low = Number(candles[Number(minLowItem?.position)].low).toFixed(2) // Value low thấp nhất của chart

        return (
            <G key={'G_min_max_candle'}>
                <Line
                    key={'L_max_candle'}
                    x1={x_line_max}
                    y1={y_line_max}
                    x2={x_line_max + gap_x1_x2_line_max}
                    y2={y_line_max}
                    strokeWidth={0.5}
                    stroke={colors.grayBlue}
                />
                <TextSVG
                    key={'text_max_chart'}
                    fontSize={10}
                    x={x_line_max + gap_x1_x2_line_max}
                    y={y_line_max}
                    fill={colors.grayBlue}
                    textAnchor={gap_x1_x2_line_max < 0 ? 'end' : 'start'}
                >
                    {numberCommasDot(high)}
                </TextSVG>

                <Line
                    key={'L_min_candle'}
                    x1={x_line_min}
                    y1={y_line_min}
                    x2={x_line_min + gap_x1_x2_line_min}
                    y2={y_line_min}
                    strokeWidth={0.5}
                    stroke={colors.grayBlue}
                />
                <TextSVG
                    key={'text_min_chart'}
                    fontSize={10}
                    x={x_line_min + gap_x1_x2_line_min}
                    y={y_line_min}
                    textAnchor={gap_x1_x2_line_min < 0 ? 'end' : 'start'}
                    fill={colors.grayBlue}
                >
                    {numberCommasDot(low)}
                </TextSVG>
            </G>
        )
    }
    // Show nến và các đường ma7, ma25, ma99
    const render_pathMA = () => {
        return (
            <G key={'G_Path'}>
                {/* Tạo nến xanh */}
                <Path
                    key={'G_Path_Candle_Green'}
                    d={dPathGreen}
                    stroke={colors.green2}
                    fill={colors.green2}
                />
                {/* Tạo nến đỏ */}
                <Path
                    key={'G_Path_Candle_Red'}
                    d={dPathRed}
                    stroke={colors.red3}
                    fill={colors.red3}
                />
                {/* Tạo đường ma7 */}
                <Path
                    key={'P_MA7'}
                    d={dPathMA.ma7}
                    strokeWidth={1}
                    stroke={colors.yellow}
                    fill={'none'}
                />
                {/* Tạo đường ma25 */}
                <Path
                    key={'P_MA25'}
                    d={dPathMA.ma25}
                    strokeWidth={1}
                    stroke={colors.ma25}
                    fill={'none'}
                />
                {/* Tạo đường ma99 */}
                <Path
                    key={'P_MA99'}
                    d={dPathMA.ma99}
                    strokeWidth={1}
                    stroke={colors.ma99}
                    fill={'none'}
                />
            </G>
        )
    }

    const handChartTranslate = () => {
        dispatch(futuresSlice.actions.chartTranslate({
            size_chart: SIZE_CHART,
            heigh_candle: HEIGH_CANDLES,
            gap_candles: gapCandle.value,
            width_candle: widthCandle.value,
            padding_right_candle: paddingRightCandles.value,
        }))
    }

    const handleChartTranslateReveser = () => {
        dispatch(futuresSlice.actions.chartTranslateReveser({
            size_chart: SIZE_CHART,
            heigh_candle: HEIGH_CANDLES,
            gap_candles: gapCandle.value,
            width_candle: widthCandle.value,
            padding_right_candle: paddingRightCandles.value,
        }))
    }
    // Phóng to, thu nhỏ màn hình
    const handleZoom = () => {
        dispatch(futuresSlice.actions.setZoom({
            gap_candles: gapCandle.value,
            heigh_candle: HEIGH_CANDLES,
            width_candle: widthCandle.value,
            padding_right_candle: paddingRightCandles.value
        }))
    }

    const panHandler = useAnimatedGestureHandler({
        onActive(event, context) {
            if (event.velocityX >= 0) {
                count.value++
                if (count.value > 4) {
                    count.value = 0
                    runOnJS(handChartTranslate)()
                }
            } else {
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
                    paddingRightCandles.value = SIZE_CHART * gapCandle.value - widthCandle.value - WIDTH_CANDLES // Tăng padding right của chart nến
                    runOnJS(handleZoom)()
                }
            } else { // thu nhỏ
                scaleCount.value--
                if (scaleCount.value < -5) {
                    scaleCount.value = 0
                    scaleSum.value = (scaleSum.value - 1 >= 1) ? (scaleSum.value - 1) : 1 // Giá trị zoom
                    gapCandle.value = width * (scaleSum.value + 0.55) / 100 // Giảm khoảng cách giữa các nến
                    widthCandle.value = width * (scaleSum.value + 0.052) / 100 // Giảm chiều rộng của 1 nến
                    paddingRightCandles.value = SIZE_CHART * gapCandle.value - widthCandle.value - WIDTH_CANDLES
                    runOnJS(handleZoom)()
                }
            }
        },
    })

    return (
        <PanGestureHandler onGestureEvent={panHandler}>
            <Reanimated.View style={[styles.container, { backgroundColor: theme.bg, borderColor: theme.gray }]}>
                <PinchGestureHandler onGestureEvent={pinchHandle}>
                    <Reanimated.View>
                        <LogoChart height={HEIGH_CONTAINER} />
                        <TimeLimitChart {...{ setOpenChart }} />
                        {candles.length > 0 &&
                            <Svg height={HEIGH_SVG}>
                                <G key={'G_candle_pathMA'}>
                                    {render_x_line()}
                                    {render_pathMA()}
                                    {render_max_min_candle()}
                                    {render_cursor()}
                                </G>
                            </Svg>
                        }
                    </Reanimated.View>
                </PinchGestureHandler>
            </Reanimated.View>
        </PanGestureHandler>
    )
}

export default Chart

const styles = StyleSheet.create({
    container: {
        height: HEIGH_CONTAINER,
        borderTopWidth: 0.5,
    }
})
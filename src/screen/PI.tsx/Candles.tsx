import { colors } from '@theme/colors'
import React, { memo } from 'react'
import Animated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated'
import { G, Line } from 'react-native-svg'
import { LENGHT_CHART } from '.'
import { GAP_CANDLE, HEIGHT_CANDLES, WIDTH_CANDLE } from './PiChart'

const LineAnimated = Animated.createAnimatedComponent(Line)
const GAnimated = Animated.createAnimatedComponent(G)

const Candles = ({
    piChart,
    minHighChart,
    maxHighChart,
    section,
    translateX,
}: any) => {
    console.log('render')
    return (
        <GAnimated
            style={useAnimatedStyle(() => {
                return {
                    transform: [{translateX: translateX.value}]
                }
            })}
        >
            {Array.from(new Array(LENGHT_CHART)).map((_, index) => {
                return (
                    <G key={index}>
                        <LineAnimated
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={0}
                            stroke={colors.green2}
                            strokeWidth={WIDTH_CANDLE}
                            animatedProps={useAnimatedProps(() => {
                                const x = GAP_CANDLE * index
                                let close = HEIGHT_CANDLES - ((piChart.value[index]?.close - minHighChart.value) * section.value)
                                const open = HEIGHT_CANDLES - ((piChart.value[index]?.open - minHighChart.value) * section.value)
                                const opacity = piChart.value[index]?.close > piChart.value[index]?.open ? 1 : 0
                                translateX.value > 6 && (close = open)
                                return {
                                    x1: x,
                                    y1: close,
                                    x2: x,
                                    y2: open,
                                    opacity: opacity
                                }
                            })}
                        />
                    </G>
                )
            })}

            {Array.from(new Array(LENGHT_CHART)).map((_, index) => {
                return (
                    <G key={index}>
                        <LineAnimated
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={0}
                            stroke={colors.red3}
                            strokeWidth={WIDTH_CANDLE}
                            animatedProps={useAnimatedProps(() => {
                                const x = GAP_CANDLE * index
                                const close = HEIGHT_CANDLES - ((piChart.value[index]?.close - minHighChart.value) * section.value)
                                const open = HEIGHT_CANDLES - ((piChart.value[index]?.open - minHighChart.value) * section.value)
                                const opacity = piChart.value[index]?.close < piChart.value[index]?.open ? 1 : 0
                                return {
                                    x1: x,
                                    y1: close,
                                    x2: x,
                                    y2: open,
                                    opacity: opacity
                                }
                            })}
                        />
                    </G>
                )
            })}
        </GAnimated>
    )
}

export default memo(Candles)
import React from 'react'
import Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated'
import { Svg } from 'react-native-svg'
import Candles from './Candles'
import { width } from '@util/responsive'
import { colors } from '@theme/colors'
import { db } from '@util/db'
import { LENGHT_CHART } from '.'
import { PanGestureHandler } from 'react-native-gesture-handler'

const HEIGHT_SVG = 200
const WIDHT_SVG = width
export const HEIGHT_CANDLES = HEIGHT_SVG
export const GAP_CANDLE = width * 2.55 / 100
export const WIDTH_CANDLE = width * 2.052 / 100

const PiChart = ({ data }: any) => {
  const piChart = useSharedValue<any>(db.slice(0, LENGHT_CHART))
  const maxHighChart = useSharedValue<number>(0)
  const minHighChart = useSharedValue<number>(0)
  const section = useSharedValue<number>(0)
  const translateX = useSharedValue<number>(0)

  let dataJson = JSON.stringify(data)
  piChart.value = JSON.parse(dataJson)

  maxHighChart.value = Math.max.apply(Math, piChart.value.map((item: any) => item.high))
  minHighChart.value = Math.min.apply(Math, piChart.value.map((item: any) => item.high))
  if (maxHighChart.value == -Infinity || maxHighChart.value == Infinity) {
    maxHighChart.value = 0
  }
  if (minHighChart.value == -Infinity || minHighChart.value == Infinity) {
    minHighChart.value = 0
  }

  const heightValueChart = maxHighChart.value - minHighChart.value
  section.value = HEIGHT_CANDLES / heightValueChart

  const handleGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
        ctx.startX = translateX.value
    },
    onActive: (e, ctx: any) => {
        translateX.value = ctx.startX + e.translationX
    },
  })

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
    >
      <Animated.View>
        <Svg
          width={WIDHT_SVG}
          height={HEIGHT_CANDLES}
        // style={{ backgroundColor: colors.grayBlue }}
        >
          <Candles
            piChart={piChart}
            maxHighChart={maxHighChart}
            minHighChart={minHighChart}
            section={section}
            translateX={translateX}
          />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default PiChart
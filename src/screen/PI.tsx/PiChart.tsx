import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { height, width } from '@util/responsive'
import React from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated'
import { Path, Svg } from 'react-native-svg'
import XLine from './XLine'
import PathLine from './PathLine'

export const HEIGHT_SVG = height * 35 / 100
export const WIDHT_SVG = width
const LENGTH_CHART = 50
export const PADDING_TOP = 20
export const TOTAL_CANDLE_IN_SCREEN = 30
export const HEIGHT_CANDLES = HEIGHT_SVG - 40
export const GAP_CANDLE = width * 2.55 / 100
export const WIDTH_CANDLE = width * 2.052 / 100
export const WIDTH_30_CANDLE = GAP_CANDLE * TOTAL_CANDLE_IN_SCREEN - WIDTH_CANDLE
export const PADING_RIGHT_CANDLES = LENGTH_CHART * GAP_CANDLE - WIDTH_CANDLE - WIDTH_30_CANDLE

const PiChart = ({ data, theme }: any) => {
  let dPatchGreen = ''
  let dPatchRed = ''
  const countCandles = useSharedValue(0)
  let ma = { ma7: '', ma25: '', ma99: '' }

  const translateX = useSharedValue(0)

  let [maxHighItem, minLowItem]: any =
    [{ high: Number.MIN_SAFE_INTEGER, position: 0 }, { low: Number.MAX_SAFE_INTEGER, position: 0 }]

  let chart = data.slice(data.length - LENGTH_CHART, data.length)

  const convertChart = () => {
    for (let i = 0; i < chart.length; i++) {
      maxHighItem = chart[i]?.high >= maxHighItem?.high ?
        { ...chart[i], position: i } : maxHighItem

      minLowItem = chart[i]?.low <= minLowItem?.low ?
        { ...chart[i], position: i } : minLowItem
    }

    const heighChart = maxHighItem.high - minLowItem.low
    maxHighItem.high = Number(maxHighItem.high) + (heighChart / 10)
    minLowItem.low = minLowItem.low - (heighChart / 10)
    const heighValueChart = maxHighItem.high - minLowItem.low
    const section = HEIGHT_CANDLES / heighValueChart

    let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
    const SIZE = data.length - chart.length

    for (let index = 0; index < chart.length; index++) {
      const item = chart[index]
      let highSVG = HEIGHT_CANDLES - ((item?.high - minLowItem.low) * section) + PADDING_TOP
      let lowSVG = HEIGHT_CANDLES - ((item?.low - minLowItem.low) * section) + PADDING_TOP
      let closeSVG = HEIGHT_CANDLES - ((item?.close - minLowItem.low) * section) + PADDING_TOP
      let openSVG = HEIGHT_CANDLES - ((item?.open - minLowItem.low) * section) + PADDING_TOP

      let x = GAP_CANDLE * index - PADING_RIGHT_CANDLES
      let x2 = x - (WIDTH_CANDLE / 2)
      let x3 = x + (WIDTH_CANDLE / 2)

      const path = `
        M${x} ${highSVG} L${x} ${lowSVG}
        M${x2} ${openSVG} L${x3} ${openSVG}
        L${x3} ${closeSVG}
        L${x2} ${closeSVG}
        L${x2} ${openSVG}
      `
      if (item?.close >= item?.open) {
        dPatchGreen += path
      } else {
        dPatchRed += path
      }

      if (index === 0) {
        for (let i = (SIZE - countCandles.value); i > (SIZE - 99 - countCandles.value); i--) {
          const close = Number(data[i]?.close)
          sumMA99 += close
          if ((SIZE - i - countCandles.value) < 7) sumMA7 += close
          if ((SIZE - i - countCandles.value) < 25) sumMA25 += close
        }
      } else {
        const firtValueSumMA7 = Number(data[SIZE + index - 7 - countCandles.value]?.close)
        const firtValueSumMA25 = Number(data[SIZE + index - 25 - countCandles.value]?.close)
        const firtValueSumMA99 = Number(data[SIZE + index - 99 - countCandles.value]?.close)
        const current = Number(item?.close)
        sumMA7 = sumMA7 - firtValueSumMA7 + current
        sumMA25 = sumMA25 - firtValueSumMA25 + current
        sumMA99 = sumMA99 - firtValueSumMA99 + current
      }

      let dma7 = HEIGHT_CANDLES - ((sumMA7 / 7 - minLowItem.low) * section) + PADDING_TOP || 0
      let dma25 = HEIGHT_CANDLES - ((sumMA25 / 25 - minLowItem.low) * section) + PADDING_TOP || 0
      let dma99 = HEIGHT_CANDLES - ((sumMA99 / 99 - minLowItem.low) * section) + PADDING_TOP || 0

      const char = index === 0 ? 'M' : 'L'
      dPathMA7 += `${char}${x} ${dma7}`
      dPathMA25 += `${char}${x} ${dma25}`
      dPathMA99 += `${char}${x} ${dma99}`

      ma = { ma7: dPathMA7, ma25: dPathMA25, ma99: dPathMA99 }
    }
  }

  convertChart()

  const handleGestureEvent = useAnimatedGestureHandler({
    onActive(event, context) {
      if (event.velocityX >= 0) {
        translateX.value++
        if (translateX.value > 4) {
          translateX.value = 0
          countCandles.value += 1
          // runOnJS(handChartTranslate)()
        }
      } else {

      }
    },
  })

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <Animated.View>
        <Svg
          width={WIDHT_SVG}
          height={HEIGHT_SVG}
        >
          <XLine
            theme={theme}
            maxHighItem={maxHighItem}
            minLowItem={minLowItem}
          />
          <PathLine
            ma={ma}
            dPatchRed={dPatchRed}
            dPatchGreen={dPatchGreen}
          />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default PiChart
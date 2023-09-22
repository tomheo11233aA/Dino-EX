import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { theme } from '@theme/index'
import { width } from '@util/responsive'
import React from 'react'
import { G, Line, Svg, Text as TextSVG } from 'react-native-svg'

const PADDING_H = 30
const WIDTH_SVG = width - PADDING_H
const HEIGHT_SVG = 200
const PADDING_LEFT_CHART = 30
const WIDTH_CHART = WIDTH_SVG - PADDING_LEFT_CHART
const PADDING_TOP_CHART = 10
const HEIGHT_CHART = HEIGHT_SVG - 40

const FONT = fonts.M17
const COLOR = colors.grayBlue

const ChartPNl = () => {
  const theme = useTheme()

  const render_x_line = () => {
    const size = 5
    return (
      <G>
        {
          Array.from(new Array(size)).map((_, index) => {
            let gap_x_line = (HEIGHT_CHART / (size - 1)) * index + PADDING_TOP_CHART
            let x_point = WIDTH_CHART + PADDING_LEFT_CHART

            return (
              <G key={'g_x_line' + index}>
                <Line
                  key={gap_x_line}
                  x1={PADDING_LEFT_CHART}
                  x2={x_point}
                  y1={gap_x_line}
                  y2={gap_x_line}
                  stroke={theme.gray2}
                />
                <TextSVG
                  x={0}
                  y={gap_x_line + 2}
                  fontFamily={FONT}
                  stroke={COLOR}
                >
                  {'-0,00'}
                </TextSVG>
              </G>
            )
          })
        }
      </G>
    )
  }

  const renderIndexDay = () => {
    const size = 4
    return (
      <G>
        {
          Array.from(new Array(size)).map((_, index) => {
            const WIDTH_CHART_ACTUAL = WIDTH_CHART - PADDING_LEFT_CHART
            let x_point = (WIDTH_CHART_ACTUAL / (size - 1)) * index + PADDING_LEFT_CHART

            return (
              <G key={'g_index_day' + index}>
                <TextSVG
                  x={x_point}
                  y={HEIGHT_SVG}
                  fontFamily={FONT}
                  // stroke={COLOR}
                >
                  {'09-16'}
                </TextSVG>
              </G>
            )
          })
        }
      </G>
    )
  }

  return (
    <Box marginTop={20}>
      <Svg width={WIDTH_SVG} height={HEIGHT_SVG}>
        {render_x_line()}
        {renderIndexDay()}
      </Svg>
    </Box>
  )
}

export default ChartPNl
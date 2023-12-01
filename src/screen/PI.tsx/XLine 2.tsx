import React from 'react'
import { G, Line, Text as TextSVG } from 'react-native-svg'
import { HEIGHT_CANDLES, HEIGHT_SVG, PADDING_TOP, WIDHT_SVG } from './PiChart'
import { colors } from '@theme/colors'
import { numberCommasDot } from '@method/format'

const XLine = ({ maxHighItem, minLowItem, theme }: any) => {
    const size = 4
    const gap_x_tb = (HEIGHT_CANDLES / (size - 1))
    const valueTB = ((maxHighItem.high - minLowItem.low) / (size - 1))

    return (
        <G>
            {Array.from(Array(size)).map((_, index) => {
                let gap = gap_x_tb * index + PADDING_TOP
                const textValue = Number(maxHighItem?.high) - valueTB * index

                return (
                    <G key={'g_xline' + index}>
                        <Line
                            x1={0}
                            y1={gap}
                            x2={WIDHT_SVG}
                            y2={gap}
                            stroke={theme.line2}
                        />
                        <TextSVG
                            key={`text_xline${index}`}
                            x={WIDHT_SVG}
                            fill={colors.grayBlue}
                            y={gap}
                            textAnchor={'end'}
                            fontSize={8}
                        >
                            {numberCommasDot(textValue?.toFixed(2))}
                        </TextSVG>
                    </G>
                )
            })}
            <Line
                key={'line_xline_1'}
                x1={0}
                y1={0}
                x2={WIDHT_SVG}
                y2={0}
                stroke={theme.line2}
            />
            <Line
                key={'line_xline_2'}
                x1={0}
                y1={HEIGHT_SVG - 1}
                x2={WIDHT_SVG}
                y2={HEIGHT_SVG - 1}
                stroke={theme.line2}
            />
        </G>
    )
}

export default XLine
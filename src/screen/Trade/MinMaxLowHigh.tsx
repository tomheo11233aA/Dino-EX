import { ydmhm } from "@method/date";
import { numberCommasDot } from "@method/format"
import { IChart } from "@screen/Futures/Chart";
import { HEIGHT_SVG, PADDING_TOP } from "@screen/PI.tsx/PiChart";
import { colors } from "@theme/colors";
import { G, Line, Text as TextSVG } from "react-native-svg"

interface Props {
    theme: any;
    candles: IChart[];
    size_chart: number;
    gap_candle: number;
    minLowItem: IChart | null;
    maxHighItem: IChart | null;
    padding_right_candle: number;
}

export default ({
    theme,
    candles,
    minLowItem,
    gap_candle,
    size_chart,
    maxHighItem,
    padding_right_candle,
}: Props) => {
    const gap_x1_x2_line_max =
        size_chart / 2 < Number(maxHighItem?.position) ? -20 : 20
    const gap_x1_x2_line_min =
        size_chart / 2 < Number(minLowItem?.position) ? -20 : 20

    const x_line_max = gap_candle * Number(maxHighItem?.position) - padding_right_candle
    const y_line_max = candles[Number(maxHighItem?.position)].highSVG

    const x_line_min = gap_candle * Number(minLowItem?.position) - padding_right_candle
    const y_line_min = candles[Number(minLowItem?.position)].lowSVG

    const high = Number(candles[Number(maxHighItem?.position)].high).toFixed(2)
    const low = Number(candles[Number(minLowItem?.position)].low).toFixed(2)

    const sizeDay = [15, 30, 45]

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
                y={y_line_max}
                x={x_line_max + gap_x1_x2_line_max}
                fontSize={8}
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
                fontSize={8}
                fill={colors.grayBlue}
                x={x_line_min + gap_x1_x2_line_min}
                y={y_line_min}
                textAnchor={gap_x1_x2_line_min < 0 ? 'end' : 'start'}
            >
                {numberCommasDot(low)}
            </TextSVG>
            {sizeDay.map((item, index) => {
                const x_point = gap_candle * item - padding_right_candle

                return (
                    <G key={'g_day' + item}>
                        <Line
                            key={`l2_candles_Y ${index}`}
                            x1={x_point}
                            y1={0}
                            x2={x_point}
                            y2={HEIGHT_SVG - PADDING_TOP}
                            stroke={theme.line2}
                            strokeWidth={0.5}
                        />
                        <TextSVG
                            key={`T_l2_candles_Y ${index}`}
                            x={x_point}
                            y={HEIGHT_SVG - 10}
                            fontSize={8}
                            fill={colors.grayBlue}
                            textAnchor={'middle'}
                        >
                            {ydmhm(candles[item].time)}
                        </TextSVG>
                    </G>
                )
            })}
        </G>
    )
}
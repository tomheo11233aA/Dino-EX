import Box from '@commom/Box'
import { colors } from '@theme/colors'
import React from 'react'
import { LineChart } from 'react-native-wagmi-charts'

const Line = ({ data, theme }: any) => {
    return (
        <Box>
            <LineChart.Provider data={data}>
                <LineChart
                    height={50}
                    width={100}
                >
                    <LineChart.Path width={1.5} color={colors.green2} >
                        <LineChart.Gradient />
                    </LineChart.Path>
                    <LineChart.CursorLine>
                        <LineChart.Tooltip 
                            textStyle={{
                                color: theme.black
                            }}
                        />
                    </LineChart.CursorLine>
                </LineChart>
            </LineChart.Provider>
        </Box>
    )
}

export default Line
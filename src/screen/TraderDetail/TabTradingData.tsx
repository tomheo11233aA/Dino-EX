import Box from '@commom/Box'
import React from 'react'
import StatisticsTradingData from './StatisticsTradingData'
import ROI from './ROI'

const TabTradingData = ({ theme, t }: any) => {
    return (
        <Box>
            <StatisticsTradingData {...{ theme, t }} />
            <ROI {...{ theme, t }} />
        </Box>
    )
}

export default TabTradingData
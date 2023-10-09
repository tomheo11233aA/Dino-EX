import Box from '@commom/Box'
import React from 'react'
import StatisticsTradingData from './StatisticsTradingData'
import ROI from './ROI'
import WeeklyProfit from './WeeklyProfit'
import RiskAssessment from './RiskAssessment'

const TabTradingData = ({ theme, t }: any) => {
    return (
        <Box>
            <StatisticsTradingData {...{ theme, t }} />
            <ROI {...{ theme, t }} />
            <WeeklyProfit {...{ theme, t }} />
            <RiskAssessment {...{ theme, t }} />
        </Box>
    )
}

export default TabTradingData
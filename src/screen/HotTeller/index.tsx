import { useTheme } from '@hooks/index'
import Safe from '@reuse/Safe'
import React from 'react'
import Header from './Header'
import WeekDayTeller from './WeekDayTeller'
import { useTranslation } from 'react-i18next'
import HotTraders from './HotTraders'

const HotTeller = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Safe paddingHorizontal={15}>
            <Header {...{ theme, t }} />
            <WeekDayTeller {...{ theme, t }} />
            <HotTraders {...{ theme, t }} />
        </Safe>
    )
}

export default HotTeller
import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import { USDTFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Profile } from 'src/model/userModel'
import Amount from './Amount'
import Slider from './Slider'

const AmountSlider = () => {
    const hint = useSharedValue(true)
    const enter = useSharedValue(false)
    const positionX = useSharedValue(0)
    const textSize = useSharedValue(15)
    const textFont = useSharedValue(fonts.RM)
    const USDT = useAppSelector(USDTFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)

    const core = useAppSelector(coreFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const exchangeRate = coins.filter(item => item.symbol == symbol)[0]?.close || 0
    const max = USDT ? core * profile.balance : core * profile.balance / exchangeRate

    return (
        <Box>
            <Amount
                {...{
                    max,
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
            <Slider
                {...{
                    max,
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
        </Box>
    )
}

export default AmountSlider
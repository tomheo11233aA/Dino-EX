import Box from '@commom/Box'
import React, { useEffect } from 'react'
import Amount from './Amount'
import Slider from './Slider'
import { useSharedValue } from 'react-native-reanimated'
import { fonts } from '@theme/fonts'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { USDTFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'
import { getValueConfig } from '@service/fundingService'
import futuresSlice from '@slice/futuresSlice'

const AmountSlider = () => {
    const dispatch = useAppDispatch()
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

    useEffect(() => {
        hadleGetValueConfig()
    }, [])

    const hadleGetValueConfig = async () => {
        const resStart = await getValueConfig('FEEFUTURESTART')
        const resClose = await getValueConfig('FEEFUTURECLOSE')

        let data = [{ value: 0 }, { value: 0 }]
        if (resStart.status) {
            data[0] = resStart.data[0]
        }
        if (resClose.status) {
            data[1] = resClose.data[0]
        }

        dispatch(futuresSlice.actions.setFeeOrderFuture(data))
    }

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
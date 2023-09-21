import Box from '@commom/Box'
import React from 'react'
import Amount from './Amount'
import Slider from './Slider'
import { useSharedValue } from 'react-native-reanimated'
import { fonts } from '@theme/fonts'
import { useAppSelector } from '@hooks/index'
import { coreFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'

const AmountSlider = () => {
    const hint = useSharedValue(true)
    const enter = useSharedValue(false)
    const positionX = useSharedValue(0)
    const textSize = useSharedValue(15)
    const textFont = useSharedValue(fonts.RM)

    const core = useAppSelector(coreFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const max = core * profile.balance

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
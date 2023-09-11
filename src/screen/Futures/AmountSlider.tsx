import Box from '@commom/Box'
import React from 'react'
import Amount from './Amount'
import Slider from './Slider'
import { useSharedValue } from 'react-native-reanimated'
import { fonts } from '@theme/fonts'

const AmountSlider = () => {
    const hint = useSharedValue(true)
    const enter = useSharedValue(false)
    const positionX = useSharedValue(0)
    const textSize = useSharedValue(15)
    const textFont = useSharedValue(fonts.RM)

    return (
        <Box>
            <Amount
                {...{
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
            <Slider
                {...{
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
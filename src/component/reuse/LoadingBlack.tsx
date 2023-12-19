import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'

// Component có biểu tượng loading màu đen
const LoadingBlack = ({size = 40}) => {
    return (
        <Box alignCenter>
            <LottieAnimation
                source={require('@lotties/loadingblack.json')}
                size={size}
            />
        </Box>
    )
}

export default LoadingBlack
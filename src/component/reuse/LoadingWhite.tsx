import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'

// Component có biểu tượng loading màu trắng
const LoadingWhite = () => {
    return (
        <Box alignCenter>
            <LottieAnimation
                source={require('@lotties/loadingwhite.json')}
                size={40}
            />
        </Box>
    )
}

export default LoadingWhite
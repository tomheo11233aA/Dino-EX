import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'

// Component có biểu tượng loading màu vàng
const LoadingYellow = () => {
    return (
        <Box alignCenter>
            <LottieAnimation
                source={require('@lotties/loadingyellow.json')}
                size={40}
            />
        </Box>
    )
}

export default LoadingYellow
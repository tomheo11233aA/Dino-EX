import Box from '@commom/Box'
import { useAppSelector, useTheme } from '@hooks/index'
import { convertToValueSpot } from '@method/format'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { walletSpotSelector } from '@selector/spotSelector'
import React from 'react'
import Balance from './Balance'
import Coins from './Coins'
import Convert from './Convert'

const Spot = () => {
    const theme = useTheme()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const wallet = useAppSelector(walletSpotSelector)

    const spot = convertToValueSpot(coins, wallet)

    return (
        <Box>
            <Balance {...{spot}} />
            <Box height={5} backgroundColor={theme.gray} marginTop={20} />
            <Convert />
            <Coins data={spot.coins} />
        </Box>
    )
}

export default Spot
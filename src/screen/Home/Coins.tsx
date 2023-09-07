import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { useNavigation } from '@react-navigation/native'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { setCoinChoosed } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { screen } from '@util/screens'
import React from 'react'
import { ICoins } from 'src/model/futuresModel'
import { Coin } from 'src/model/tradeModel'
import CoinItem from './CoinItem'
import { useTranslation } from 'react-i18next'

const Coins = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()
    const coins = useAppSelector(coinsFuturesChartSelector)

    const handleMoveTrade = (coin: Coin) => {
        dispatch(setCoinChoosed(coin))
        navigation.navigate(screen.TRADE)
        // navigation.navigate(screen.EARN)
    }

    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={colors.gray2} size={12}>{t('Name')}</Txt>
                <Box row >
                    <Txt color={colors.gray2} size={12}>{t('Last Price')}</Txt>

                    <Box width={80} alignEnd marginLeft={20}>
                        <Txt
                            color={colors.gray2}
                            size={12}
                        >
                            {t('24h chg%')}
                        </Txt>
                    </Box>
                </Box>
            </Box>
            <Box marginTop={10}>
                {coins.map((coin: ICoins) =>
                    <CoinItem
                        key={coin.id}
                        coin={coin}
                        theme={theme}
                        onMoveTrade={handleMoveTrade}
                    />
                )}
            </Box>
        </Box >
    )
}

export default Coins
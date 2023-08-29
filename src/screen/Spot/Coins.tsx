import { getWalletThunk } from '@asyncThunk/spotAsyncThunk'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useTheme } from '@hooks/index'
import HideWallet from '@screen/Overview/HideWallet'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { Coin } from 'src/model/tradeModel'
import CoinItem from './CoinItem'
import { useTranslation } from 'react-i18next'

const Coins = ({ data }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        handleGetWallet()
    }, [])

    const handleGetWallet = async () => {
        await dispatch(getWalletThunk())
    }

    return (
        <Box paddingHorizontal={15} paddingBottom={500}>
            <Box marginBottom={15} row justifySpaceBetween>
                <Txt fontFamily={fonts.AS} size={16} color={theme.black}>{t('Balances')}</Txt>
                <Icon
                    size={15}
                    resizeMode={'contain'}
                    source={require('@images/home/search.png')}
                />
            </Box>

            <HideWallet t={t} />
            <Box>
                {data.map((coin: Coin) =>
                    <CoinItem
                        coin={coin}
                        key={coin.id}
                        theme={theme}
                    />
                )}
            </Box>
        </Box>
    )
}

export default Coins
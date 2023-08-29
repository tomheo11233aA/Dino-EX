import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import LoadingWhite from '@reuse/LoadingWhite'
import { USDTFuturesSelector, amountFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, priceFuturesSelector, regimeFuturesSelector, sideFuturesSelector, symbolFuturesSelector, typeTradeFuturesSelector } from '@selector/futuresSelector'
import { orderFuture } from '@service/tradeService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const BuySellButton = ({ toastTopRef }: any) => {
    const dispatch = useAppDispatch()
    const side = useAppSelector(sideFuturesSelector)
    const amount = useAppSelector(amountFuturesSelector)
    const regime = useAppSelector(regimeFuturesSelector)
    const core = useAppSelector(coreFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const typeTrade = useAppSelector(typeTradeFuturesSelector)
    const priceLimit = useAppSelector(priceFuturesSelector)
    const USDT = useAppSelector(USDTFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const [loading, setLoading] = useState<boolean>(false)
    const { t } = useTranslation()

    const handleOrderFuture = async () => {
        let close: number = 0
        for (let index = 0; index < coins.length; index++) {
            if (coins[index].symbol === symbol) {
                close = coins[index].close
                break
            }
        }
        setLoading(true)
        const res = await orderFuture({
            amount: USDT ?
                amount : (Number(amount) * close),
            regime: regime.toLocaleLowerCase(),
            core,
            symbol,
            side,
            typeTrade,
            priceLimit,
        })
        console.log('res: ', res)
        if (!res.error) {
            if (res.status) {
                toastTopRef.current.slideDown(t(res.message), true)
                await dispatch(getProfileThunk())
            } else {
                toastTopRef.current.slideDown(t(res.message), true)
            }
        }

        setLoading(false)
    }

    return (
        <Btn
            onPress={handleOrderFuture}
            disabled={loading}
            backgroundColor={side === 'buy' ? colors.green2 : colors.red2}
            height={37}
            radius={5}
            marginTop={12}
        >
            {loading ?
                <LoadingWhite /> :
                <Txt color={colors.white} size={15} fontFamily={fonts.SGM}>
                    {side === 'buy' ? t('Buy/Long') : t('Sell/Long')}
                </Txt>
            }
        </Btn>
    )
}

export default BuySellButton
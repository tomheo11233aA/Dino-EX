import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import LoadingWhite from '@reuse/LoadingWhite'
import { USDTFuturesSelector, amountFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, feeOrderFutureSelector, priceFuturesSelector, regimeFuturesSelector, sideFuturesSelector, slFutureSelector, symbolFuturesSelector, tpFutureSelector, triggerTPSLFutureSelector, typeTradeFuturesSelector } from '@selector/futuresSelector'
import { orderFuture } from '@service/tradeService'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ModalAlertOrder from './ModalAlertOrder'
import { profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'
import { PERCENT_90 } from './Amount'

const BuySellButton = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const tp = useAppSelector(tpFutureSelector)
    const sl = useAppSelector(slFutureSelector)
    const side = useAppSelector(sideFuturesSelector)
    const core = useAppSelector(coreFuturesSelector)
    const USDT = useAppSelector(USDTFuturesSelector)
    const amount = useAppSelector(amountFuturesSelector)
    const regime = useAppSelector(regimeFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const priceLimit = useAppSelector(priceFuturesSelector)
    const typeTrade = useAppSelector(typeTradeFuturesSelector)
    const triggerTPSL = useAppSelector(triggerTPSLFutureSelector)
    const feeOrderFuture = useAppSelector(feeOrderFutureSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [isShowModalAlert, setShowModalAlert] = useState<boolean>(false)

    const feeStart = feeOrderFuture[0]?.value || 0
    const feeEnd = feeOrderFuture[1]?.value || 0

    const exchangeRate = coins.filter(item => item.symbol == symbol)[0]?.close || 0

    const handleOrderFuture = async () => {
        let amountFee = amount
        const max = USDT ? core * profile.balance : core * profile.balance / exchangeRate
        if ((Number(amountFee) * 100 / max) >= PERCENT_90) {
            const start = Number(amountFee) * (feeStart / 100)
            const end = Number(amountFee) * (feeEnd / 100)
            amountFee = Number(amountFee) - start - end
        }
        setLoading(true)
        const res = await orderFuture({
            amount: USDT ? Number(amountFee) : Number(amountFee) * exchangeRate,
            regime: regime.toLocaleLowerCase(),
            core,
            symbol,
            side,
            typeTrade,
            priceLimit,
            triggerTP: triggerTPSL.tpsl === 'TPSL' ? triggerTPSL.value : undefined,
            triggerSL: triggerTPSL.tpsl === 'TPSL' ? triggerTPSL.value : undefined,
            TP: triggerTPSL.tpsl !== 'TPSL' ? undefined : tp !== '' ? tp : undefined,
            SL: triggerTPSL.tpsl !== 'TPSL' ? undefined : sl !== '' ? sl : undefined,
        })

        if (!res.error) {
            if (res.status) {
                await dispatch(getProfileThunk())
                dispatch(futuresSlice.actions.refreshWhenOrderFuture())
            }
            setShowModalAlert(true)
            setMessage(res.message)
        }

        setLoading(false)
    }

    return (
        <Box>
            <Btn
                radius={5}
                height={37}
                marginTop={12}
                disabled={loading}
                onPress={handleOrderFuture}
                backgroundColor={side === 'buy' ? colors.green2 : colors.red2}
            >
                {loading ?
                    <LoadingWhite /> :
                    <Txt color={colors.white} size={15} fontFamily={fonts.SGM}>
                        {side === 'buy' ? t('Buy/Long') : t('Sell/Long')}
                    </Txt>
                }
            </Btn>
            {isShowModalAlert &&
                <ModalAlertOrder
                    message={message}
                    setMessage={setMessage}
                    show={isShowModalAlert}
                    setShow={setShowModalAlert}
                />
            }
        </Box>
    )
}

export default BuySellButton
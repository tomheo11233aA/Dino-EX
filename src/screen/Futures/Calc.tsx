import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import { calcPositions, numberCommasDot } from '@method/format'
import { USDTFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, currencyFuturesSelector, positionsFuturesSelector, triggerTPSLFutureSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Profile } from 'src/model/userModel'
import ReduceOnly from './ReduceOnly'
import TPSL from './TPSL'

const Calc = ({ theme }: any) => {
    const { t } = useTranslation()
    const core = useAppSelector(coreFuturesSelector)
    const USDT = useAppSelector(USDTFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const currency = useAppSelector(currencyFuturesSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const triggerTPSL = useAppSelector(triggerTPSLFutureSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    let MAX: number | string = 0.000
    let symbol_coin = currency

    let BALANCE: number = profile.balance
    let COIN_PRICE: number = 0

    if (coins.length > 0) {
        const positionObj = calcPositions(positions, coins)
        BALANCE = profile.balance + positionObj.pnl + positionObj.margin
        COIN_PRICE = BALANCE / coins[0].close
    }

    if (USDT) {
        MAX = numberCommasDot((core * BALANCE).toFixed(2))
        symbol_coin = 'USDT'
    } else if (coins.length > 0) {
        MAX = numberCommasDot((core * COIN_PRICE).toFixed(2))
    }

    return (
        <Box>
            <TPSL {...{ triggerTPSL, theme }} />
            <ReduceOnly {...{ triggerTPSL, theme, t }} />

            <Box row justifySpaceBetween marginTop={5}>
                <Txt color={colors.gray5} size={12}>{t('Max')}</Txt>
                <Txt size={14} fontFamily={'Myfont21-Regular'} color={theme.black}>{`${MAX} `}
                    <Txt size={11} fontFamily={fonts.IBMPR} color={theme.black}>{symbol_coin}</Txt>
                </Txt>
            </Box>
            <Box row justifySpaceBetween>
                <Box>
                    <View style={styles.txtContent}>
                    </View>
                    <View style={[styles.txtContent2, { backgroundColor: theme.bg }]}>
                        <Text style={styles.text}>{t('Cost')}</Text>
                    </View>
                </Box>

                <Txt size={14} fontFamily={'Myfont21-Regular'} color={theme.black}>0{' '}
                    <Txt size={11} fontFamily={fonts.IBMPR} color={theme.black}>USDT</Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default Calc

const styles = StyleSheet.create({
    text: {
        color: colors.gray5,
        fontSize: 12,
    },
    txtContent: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        height: 15,
        borderColor: colors.gray5,
        position: 'absolute',
    },
    txtContent2: {
        marginTop: -1,
        height: 15,
        paddingRight: 2,
    }
})
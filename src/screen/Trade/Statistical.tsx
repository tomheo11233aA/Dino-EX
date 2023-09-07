import { getCoinsFromSocket, useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { coinChoosedSpotSelector } from '@selector/spotSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import Item24h from './Item24h'

const Statistical = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)
    
    getCoinsFromSocket()

    let [close, percentChange, color] = [0, '0', colors.greenCan]
    if (coins.length > 0) {
        const index = coins.findIndex(coin => coin.symbol === coinChoosed.symbol)
        if (index >= 0) {
            close = coins[index]?.close
            percentChange = coins[index]?.percentChange >= 0 ? `+${coins[index]?.percentChange}` : `${coins[index]?.percentChange}`
            color = coins[index]?.percentChange >= 0 ? colors.greenCan : colors.redCan
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center' }}>
                <Text style={styles.textLagre}>
                    {numberCommasDot(close)}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={[styles.textSmall, { color: theme.black }]}>
                        {'≈ '}
                        <Text style={[styles.textSmall, { color: theme.black, fontFamily: fonts.M24, fontSize: 15 }]}>
                            {numberCommasDot(close)}
                        </Text>
                        <Text style={{ fontFamily: fonts.IBMPM, fontSize: 12 }}>
                            {' $'}
                        </Text>
                    </Text>
                    <Text style={[styles.textSmall, { marginLeft: 10, fontFamily: fonts.M24, fontSize: 14 }]}>
                        {numberCommasDot(percentChange)}
                        <Text style={[styles.textSmall]}>{'%'}</Text>
                    </Text>
                </View>
                <View style={[styles.defiContainer, { backgroundColor: theme.yellow5 }]}>
                    <Text style={{ color: colors.yellowBold, fontSize: 9 }}>{'DeFi >'}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Item24h
                        title={t('24h High')}
                        value={'0,2776'}
                        topValue={2}
                    />
                    <Item24h
                        title={t('24h Low')}
                        value={'0,2622'}
                        topValue={2}
                    />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Item24h
                        title={'24h Vol(BNB)'}
                        value={'22,78M'}
                    />
                    <Item24h
                        title={'24h Vol(USDT)'}
                        value={'6,13M'}
                        topValue={-1}
                    />
                </View>
            </View>
        </View>
    )
}

export default Statistical

const styles = StyleSheet.create({
    defiContainer: {
        backgroundColor: colors.lightYellow2,
        alignSelf: 'flex-start',
        padding: 2,
        marginTop: 3,
    },
    textSmall: {
        fontWeight: '500',
        fontSize: 13,
        color: colors.greenCan,
        fontFamily: fonts.FSCR
    },
    textLagre: {
        color: colors.redCan,
        fontWeight: 'bold',
        fontFamily: fonts.M31,
        fontSize: 24,
        transform: [
            {scaleY: 1.1}
        ]
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: -10,
    }
})
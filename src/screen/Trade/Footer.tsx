import Img from '@commom/Img'
import { useAppDispatch, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import futuresSlice from '@slice/futuresSlice'
import { setSide } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { height } from '@util/responsive'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IOption {
    icon: ImageProps,
    title: string,
}

const Footer = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    return (
        <View style={[styles.footer, { backgroundColor: theme.white5}]}>
            <View style={styles.option}>
                <Option
                    title={t('More')}
                    icon={require('@images/trade/dot.png')}
                />
                <Option
                    title={t('Warn')}
                    icon={require('@images/trade/bell.png')}
                />
                <Option
                    title={t('Margin')}
                    icon={require('@images/trade/margin.png')}
                />
                <Option
                    title={t('Net')}
                    icon={require('@images/trade/net.png')}
                />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(setSide('buy'))
                        navigate(screen.TRADES_STACK)
                    }}
                    style={[styles.buySellButton, { backgroundColor: '#2fbd85' }]}
                >
                    <Text style={styles.buySellText}>{t('Buy')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(setSide('sell'))
                        navigate(screen.TRADES_STACK)
                    }}
                    style={[styles.buySellButton, { backgroundColor: '#f6465d' }]}
                >
                    <Text style={styles.buySellText}>{t('Sell')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Option = ({ icon, title }: IOption) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }}>
            <Img
                source={icon}
                width={15}
                height={15}
                resizeMode={'contain'}
            />
            <Text
                numberOfLines={1}
                style={{ color: colors.grayBlue, fontSize: 11 }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Footer

const styles = StyleSheet.create({
    option: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 14,
    },
    buySellText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buySellButton: {
        height: 40,
        width: 100,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    footer: {
        flexDirection: 'row',
        height: height * 11 / 100,
        padding: 10,
    }
})
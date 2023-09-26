import Img from '@commom/Img'
import { useAppDispatch, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import futuresSlice from '@slice/futuresSlice'
import { setSide } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
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
        <View style={[styles.footer, { backgroundColor: theme.white5 }]}>
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
                        dispatch(futuresSlice.actions.setSide('buy'))
                        navigate(screen.FUTURES_STACK)
                    }}
                    style={[styles.buySellButton, { backgroundColor: '#2fbd85' }]}
                >
                    <Text style={styles.buySellText}>{t('Buy')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(futuresSlice.actions.setSide('sell'))
                        navigate(screen.FUTURES_STACK)
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
                width={14}
                height={14}
                source={icon}
                marginBottom={6}
                resizeMode={'contain'}
            />
            <Text
                numberOfLines={1}
                style={{
                    fontFamily: fonts.IBMPR,
                    color: colors.grayBlue,
                    fontSize: 9,
                    transform: [{ scaleX: 0.9 }]
                }}
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
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buySellText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buySellButton: {
        margin: 5,
        height: 38,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    footer: {
        padding: 10,
        flexDirection: 'row',
        height: height * 11 / 100,
    }
})
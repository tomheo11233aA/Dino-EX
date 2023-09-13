import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const HEGIHT_LINE = 4

const Item = ({ item, theme, t, index, data }: any) => {
    const marginBotom = useSharedValue(0)

    const stylesAnimated = useAnimatedStyle(() => {
        return {
            marginBottom: marginBotom.value
        }
    })

    const color = item.side === 'Buy' ? colors.green2 : colors.red3

    return (
        <Animated.View
            style={[
                {
                    width: '100%',
                    marginTop: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                },
                stylesAnimated,
            ]}
            onLayout={(e) => {
                if (index === (data.length - 1)) {
                    marginBotom.value = -(e.nativeEvent.layout.height / 2 - (HEGIHT_LINE / 2))
                }
            }}
        >
            <Box width={20} height={HEGIHT_LINE} backgroundColor={theme.gray2} />

            <Box
                row
                flex={1}
                paddingVertical={15}
                paddingHorizontal={13}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                        {item.title}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={13}>
                        {t('Side')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={5}>
                        {t('Amount')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={5}>
                        {t('Price Actived')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={6}>
                        {t('Price')}
                    </Txt>
                </Box>

                <Box>
                    <Txt
                        size={11}
                        color={colors.grayBlue}
                        fontFamily={fonts.IBMPR}
                    >
                        {t(item.status)}
                    </Txt>
                    <Txt
                        size={11}
                        marginTop={13}
                        color={colors.green2}
                        fontFamily={fonts.IBMPR}
                    >
                        {t(item.side)}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M23}
                    >
                        {'153,4 '}
                        <Txt color={theme.black} size={11}>USDT</Txt>
                    </Txt>
                    <Box backgroundColor={theme.gray} padding={4} marginTop={5} radius={3}>
                        <Txt
                            size={13}
                            color={theme.black}
                            fontFamily={fonts.M23}
                        >
                            {'30.676,0 '}
                            <Txt color={theme.black} size={11}>USDT</Txt>
                        </Txt>
                    </Box>
                    <Box backgroundColor={theme.gray} padding={4} marginTop={5} radius={3}>
                        <Txt
                            size={11}
                            color={theme.black}
                            fontFamily={fonts.IBMPR}
                        >
                            {t('Activated')}
                        </Txt>
                    </Box>
                </Box>

                {/* <Box row justifySpaceBetween>
                    <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                        {item.title}
                    </Txt>
                    <Txt
                        size={12}
                        color={colors.grayBlue}
                        fontFamily={fonts.IBMPR}
                    >
                        {t(item.status)}
                    </Txt>
                </Box>

                <Box row justifySpaceBetween marginTop={13}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={12}>
                        {t('Side')}
                    </Txt>
                    <Txt
                        size={12}
                        color={colors.green2}
                        fontFamily={fonts.IBMPR}
                    >
                        {t(item.side)}
                    </Txt>
                </Box>

                <Box row justifySpaceBetween alignCenter marginVertical={5}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={12}>
                        {t('Amount')}
                    </Txt>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.M23}
                    >
                        {'153,4 '}
                        <Txt color={theme.black} size={11}>USDT</Txt>
                    </Txt>
                </Box>

                <Box row justifySpaceBetween alignCenter marginBottom={5}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={12}>
                        {t('Price')}
                    </Txt>

                    <Box backgroundColor={theme.gray} padding={5}>
                        <Txt
                            color={theme.black}
                            fontFamily={fonts.M23}
                        >
                            {'30.676,0 '}
                            <Txt color={theme.black} size={11}>USDT</Txt>
                        </Txt>
                    </Box>
                </Box>

                <Box row justifySpaceBetween alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={12}>
                        {t('Price')}
                    </Txt>

                    <Box backgroundColor={theme.gray} padding={5}>
                        <Txt
                            size={12}
                            color={theme.black}
                            fontFamily={fonts.IBMPR}
                        >
                            {t('Activated')}
                        </Txt>
                    </Box>
                </Box> */}
            </Box>
        </Animated.View>
    )
}

export default Item
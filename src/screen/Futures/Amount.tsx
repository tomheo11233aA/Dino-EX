import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { USDTFuturesSelector, amountFuturesSelector, currencyFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Animated, { SharedValue, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Profile } from 'src/model/userModel'
import { WIDTH_SLIDE } from './Slider'

interface Props {
    hint: SharedValue<Boolean>;
    enter: SharedValue<boolean>;
    textSize: SharedValue<number>;
    textFont: SharedValue<string>;
    positionX: SharedValue<number>;
}

const TextInputAnimation = Animated.createAnimatedComponent(TextInput)

const Amount = ({
    hint,
    enter,
    textSize,
    textFont,
    positionX,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const USDT = useAppSelector(USDTFuturesSelector)
    const amount = useAppSelector(amountFuturesSelector)
    const currency = useAppSelector(currencyFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const animatedProps: any = useAnimatedProps(() => {
        if (enter.value) {
            return {
                text: `${Number(amount).toFixed(0)}`
            }
        } else {
            const percent = positionX.value * 100 / WIDTH_SLIDE
            const amount = profile.balance * percent / 100

            return {
                text: hint.value ? '' : `${amount.toFixed(0)}`
            }
        }
    })

    const textStyle = useAnimatedStyle(() => {
        return {
            fontFamily: textFont.value,
            fontSize: textSize.value,
        }
    })

    return (
        <Box>
            <Box row>
                <Btn
                    onPress={() => dispatch(futuresSlice.actions.setUSDT(false))}
                    flex={1}
                    alignCenter
                    justifyCenter
                    height={25}
                    backgroundColor={theme.gray2}
                    marginRight={2}
                >
                    <Txt
                        size={12}
                        fontFamily={fonts.SGM}
                        color={USDT ? colors.grayBlue : theme.black}
                    >
                        {currency}
                    </Txt>
                </Btn>

                <Btn
                    onPress={() => dispatch(futuresSlice.actions.setUSDT(true))}
                    flex={1}
                    alignCenter
                    justifyCenter
                    height={25}
                    backgroundColor={theme.gray2}
                >
                    <Txt
                        size={12}
                        fontFamily={fonts.SGM}
                        color={USDT ? theme.black : colors.grayBlue}
                    >
                        USDT
                    </Txt>
                </Btn>
            </Box>

            <Box
                row
                height={45}
                alignCenter
                marginVertical={2}
                justifySpaceBetween
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Btn
                    onPress={() => {
                        if (Number(amount) > 0) {
                            enter.value = true
                            positionX.value = 0
                            const newAmount = Number(amount) - 1
                            dispatch(futuresSlice.actions.setAmount(newAmount))
                        }
                    }}
                >
                    <Txt size={20} bold color={colors.grayBlue}>ー</Txt>
                </Btn>

                <Box flex={1} height={30}>
                    <TextInputAnimation
                        onChangeText={(txt: string) => {
                            if (txt === '') {
                                hint.value = true
                                textSize.value = 15
                                textFont.value = fonts.RM
                            }
                            positionX.value = 0
                            enter.value = true
                            dispatch(futuresSlice.actions.setAmount(txt))
                        }}
                        placeholder={'Amount'}
                        keyboardType={'number-pad'}
                        animatedProps={animatedProps}
                        selectionColor={colors.yellow}
                        placeholderTextColor={colors.grayBlue}
                        style={
                            [{
                                height: '100%',
                                textAlign: 'center',
                                color: theme.black
                            },
                                textStyle
                            ]}
                    />
                </Box>

                <Btn
                    onPress={() => {
                        enter.value = true
                        positionX.value = 0
                        const newAmount = Number(amount) + 1
                        dispatch(futuresSlice.actions.setAmount(newAmount))
                    }}
                >
                    <Txt style={styles.txt}>+</Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default Amount

const styles = StyleSheet.create({
    input: {
        height: Platform.OS === 'ios' ? 30 : 40,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        textAlign: 'center',
        fontFamily: fonts.SGM,
    },
    txt: {
        fontSize: 30,
        color: colors.grayBlue,
    }
})
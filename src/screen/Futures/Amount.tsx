import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { USDTFuturesSelector, amountFuturesSelector, currencyFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const Amount = ({ theme }: any) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const amount = useAppSelector(amountFuturesSelector)
    const USDT = useAppSelector(USDTFuturesSelector)
    const currency = useAppSelector(currencyFuturesSelector)

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
                alignCenter
                justifySpaceBetween
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
                height={45}
                marginVertical={2}
            >
                <Btn
                    onPress={() => {
                        const n = Number(amount) - 1
                        if (n >= 0) {
                            dispatch(futuresSlice.actions.setAmount(n))
                        }
                    }}
                >
                    <Txt size={20} bold color={colors.grayBlue}>ー</Txt>
                </Btn>

                <Box flex={1} height={30}>
                    <TextInput
                        value={amount.toString()}
                        onChangeText={(text: string) => dispatch(futuresSlice.actions.setAmount(text))}
                        style={[
                            styles.input, {
                                fontFamily: amount.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                                fontSize: amount.toString() === '' ? 15 : 18,
                                color: theme.black,
                            }
                        ]}
                        placeholderTextColor={colors.grayBlue}
                        placeholder={String(t('Amount'))}
                        keyboardType={'decimal-pad'}
                        selectionColor={colors.yellow}
                    />
                </Box>

                <Btn
                    onPress={() => {
                        const n = Number(amount) + 1
                        dispatch(futuresSlice.actions.setAmount(n))
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
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import BoxLine from '@reuse/BoxLine'
import { slFutureSelector, tpFutureSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'

interface Props {
    type: '' | 'TPSL' | 'RO';
    setType: Function;
    theme: any
}

const TPSL = ({ type, setType, theme }: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const tp = useAppSelector(tpFutureSelector)
    const sl = useAppSelector(slFutureSelector)

    return (
        <Box>
            <Box row justifySpaceBetween>
                <Btn
                    onPress={() => setType((type === 'RO' || type === '') ? 'TPSL' : '')}
                    row
                    alignEnd
                    marginBottom={10}
                    alignSelf={'flex-start'}
                >
                    {type === 'TPSL' ?
                        <Box
                            width={12}
                            height={12}
                            radius={50}
                            borderColor={theme.gray6}
                            marginRight={7}
                            alignCenter
                            justifyCenter
                            backgroundColor={colors.yellow}
                        >
                            <Txt size={10} color={colors.white}>✓</Txt>
                        </Box>
                        :
                        <Box
                            width={12}
                            height={12}
                            backgroundColor={theme.gray3}
                            radius={50}
                            borderWidth={1}
                            borderColor={theme.gray6}
                            marginRight={7}
                        />
                    }

                    <BoxLine title={'TP/SL'} />
                </Btn>
                {type === 'TPSL' && <Txt color={colors.yellowBold} size={12} fontFamily={fonts.RM}>{t('Advanced')}</Txt>}
            </Box>

            {type === 'TPSL' &&
                <Box row marginBottom={10}>
                    <TextInput
                        value={tp.toString()}
                        onChangeText={(txt: string) => {
                            dispatch(futuresSlice.actions.setTP(txt))
                        }}
                        style={
                            [styles.input, {
                                color: theme.black,
                                textAlign: tp.toString().length < 10 ? 'center' : 'auto',
                                backgroundColor: theme.gray2,
                                fontSize: tp.toString() === '' ? 15 : 18,
                                fontFamily: tp.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                            }]
                        }
                        placeholderTextColor={colors.grayBlue}
                        placeholder={t('Take Profit')}
                        keyboardType={'decimal-pad'}
                        selectionColor={colors.yellow}
                    />
                    <TextInput
                        value={sl.toString()}
                        onChangeText={(txt: string) => {
                            dispatch(futuresSlice.actions.setSL(txt))
                        }}
                        style={
                            [styles.input, {
                                marginLeft: 7,
                                color: theme.black,
                                backgroundColor: theme.gray2,
                                fontSize: sl.toString() === '' ? 15 : 18,
                                textAlign: sl.toString().length < 10 ? 'center' : 'auto',
                                fontFamily: sl.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                            }]
                        }
                        placeholderTextColor={colors.grayBlue}
                        placeholder={t('Stop Loss')}
                        keyboardType={'decimal-pad'}
                        selectionColor={colors.yellow}
                    />
                </Box>
            }
        </Box>
    )
}

export default TPSL

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingHorizontal: 5,
        height: Platform.OS === 'ios' ? 40 : 40,
    },
})
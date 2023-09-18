import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index';
import { numberCommasDot } from '@method/format';
import Modality from '@reuse/Modality';
import { coinsFuturesChartSelector, tpslPositionFutureSelector } from '@selector/futuresSelector';
import futuresSlice from '@slice/futuresSlice';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { height, width } from '@util/responsive';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import MLTPSLPosition from './MLTPSLPosition';

const RADIUS_CONTENT = 10
const TEXT_SIZE = 12

const ModalTPSLPosition = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const coins = useAppSelector(coinsFuturesChartSelector)
    const tpslPosition = useAppSelector(tpslPositionFutureSelector)

    const position = tpslPosition.position

    const side = position?.side === 'buy' ? 'Long' : 'Short'
    const color = position?.side === 'buy' ? colors.green2 : colors.red3

    let rounding: number = 1
    let mark_price: number = 0
    if (coins.length > 0) {
        let index = coins.findIndex(coin => coin.symbol === position?.symbol)
        index = index < 0 ? 0 : index
        const close = coins[index].close
        mark_price = close
        rounding = close < 10 ? 4 : (close > 9 && close < 51) ? 3 : 1
    }

    return (
        <Modality
            show={tpslPosition.showModal}
        >
            <Pressable onPress={() => {
                dispatch(futuresSlice.actions.setTPSLPosition({
                    showModal: false,
                    position: tpslPosition.position,
                }))
            }}>
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                width={width}
                paddingTop={10}
                paddingBottom={50}
                paddingHorizontal={15}
                backgroundColor={theme.bg}
                borderTopLeftRadius={RADIUS_CONTENT}
                borderTopRightRadius={RADIUS_CONTENT}
            >
                <Box row justifySpaceBetween>
                    <Txt fontFamily={fonts.AS} size={16} color={theme.black}>
                        TP/SL position
                    </Txt>
                    <Btn
                        onPress={() => {
                            dispatch(futuresSlice.actions.setTPSLPosition({
                                position,
                                showModal: false,
                            }))
                        }}
                    >
                        <Icon
                            size={14}
                            source={require('@images/future/close.png')}
                        />
                    </Btn>
                </Box>

                <Box
                    marginTop={15}
                    paddingBottom={15}
                    borderBottomWidth={1}
                    borderColor={theme.gray2}
                >
                    <Box row alignCenter justifySpaceBetween>
                        <Txt color={colors.gray5} size={TEXT_SIZE}>{t('Symbol')}</Txt>
                        <Txt color={color} size={TEXT_SIZE}>
                            {`${position?.symbol} ${t('Perpetual')} / ${t(side)} `}
                            <Txt fontFamily={fonts.M23} size={TEXT_SIZE + 2} color={color}>
                                {position?.core}
                                <Txt color={color} size={TEXT_SIZE}>x</Txt>
                            </Txt>
                        </Txt>
                    </Box>

                    <Box row alignCenter justifySpaceBetween marginTop={10}>
                        <Txt color={colors.gray5} size={TEXT_SIZE}>{`${t('Entry Price')} (USDT)`}</Txt>
                        <Txt
                            fontFamily={fonts.M23}
                            size={TEXT_SIZE + 2}
                            color={theme.black}
                        >
                            {numberCommasDot(position?.entryPrice?.toFixed(rounding))}
                        </Txt>
                    </Box>

                    <Box row alignCenter justifySpaceBetween marginTop={10}>
                        <Txt color={colors.gray5} size={TEXT_SIZE}>
                            {`${t('Mark Price')} (USDT)`}
                        </Txt>
                        <Txt
                            fontFamily={fonts.M23}
                            size={TEXT_SIZE + 2}
                            color={theme.black}
                        >
                            {numberCommasDot(mark_price?.toFixed(rounding))}
                        </Txt>
                    </Box>
                </Box>

                <MLTPSLPosition
                    value={1.000}
                    onCancel={() => { }}
                    title={'Take profit'}
                    trigger={'Mark Price >= '}
                />
                <Box row>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR}>{'When '}</Txt>
                    <Txt color={theme.black} fontFamily={fonts.IBMPR}>{'Mark Price'}</Txt>
                </Box>

                <MLTPSLPosition
                    value={0.100}
                    title={'Stop loss'}
                    onCancel={() => { }}
                    trigger={'Last Price <= '}
                />
            </Box>
        </Modality>
    )
}

export default ModalTPSLPosition

const styles = StyleSheet.create({
    textGray: {
        color: colors.grayBlue,
    }
})
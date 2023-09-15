import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { IOpenOrder } from 'src/model/fundingModel'

interface Props {
    t: any;
    theme: any;
    item: IOpenOrder;
    onCancelOpenOrder: Function;
}

const WIDTH = 77

const ItemOpenOrder = ({
    t,
    item,
    theme,
    onCancelOpenOrder,
}: Props) => {
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
    const showTPSL = (item.typeTrade === 'Limit' && (item.TP || item.SL)) ||
        (item.idPosition === 0 && (item.typeTrade === 'Take Profit Market' || item.typeTrade === 'Stop Market'))

    const reducerOnly = (item.typeTrade === 'Limit') ||
        (item.typeTrade === 'Take Profit Market' || item.typeTrade === 'Stop Market')

    let triggerConditionsTP = null
    if (item.TP) {
        if (item.side === 'sell') {
            triggerConditionsTP = `${item.triggerTP + ' price'} >= `
        } else {
            triggerConditionsTP = `${item.triggerTP + ' price'} <= `
        }
    }

    let triggerConditionsSL = null
    if (item.SL) {
        if (item.side === 'sell') {
            triggerConditionsSL = `${item.triggerSL + ' price'} <= `
        } else {
            triggerConditionsSL = `${item.triggerSL + ' price'} >= `
        }
    }

    return (
        <Box
            key={item.id}
            marginTop={10}
            paddingTop={10}
            borderTopWidth={1}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween alignCenter>
                <Txt size={16} fontFamily={fonts.IBMPM} color={theme.black}>
                    {`${item.symbol} ${t('Perpetual')
                        }`}
                </Txt>
                <Txt fontFamily={fonts.M23} color={colors.grayBlue} size={14}>
                    {item.created_at}
                </Txt>
            </Box>
            <Txt
                size={16}
                fontFamily={fonts.IBMPM}
                color={item.side === 'buy' ? colors.green2 : colors.red2}
            >
                {`${item.typeTrade} / ${t(side)}`}
            </Txt >
            <Box paddingLeft={20} marginTop={10} row>
                <CircularProgress
                    value={0}
                    radius={20}
                    valueSuffix='%'
                    activeStrokeWidth={5}
                    inActiveStrokeWidth={5}
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeColor={colors.gray5}
                    activeStrokeColor={item.side === 'buy' ? colors.green2 : colors.red2}
                />
                <Box marginLeft={15}>
                    <Box row>
                        <Box width={WIDTH}>
                            <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                {t('Amount')} (USDT)
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M24} color={theme.black}>
                            {numberCommasDot('0.0')}
                            <Txt color={colors.gray5}>
                                {' /'} {numberCommasDot(item.amount?.toFixed(1))}
                            </Txt>
                        </Txt>
                    </Box>

                    <Box row marginTop={5}>
                        <Box width={WIDTH}>
                            <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                {t('Price')}
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M24} color={theme.black}>
                            {numberCommasDot(item?.orderEntryPrice?.toFixed(1))}
                        </Txt>
                    </Box>

                    {triggerConditionsTP &&
                        <Box row marginTop={5} alignCenter>
                            <Box>
                                <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                    {t(triggerConditionsTP)}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.M24} color={theme.black}>
                                {numberCommasDot(item.TP)}
                            </Txt>
                        </Box>
                    }

                    {triggerConditionsSL &&
                        <Box row marginTop={5} alignCenter>
                            <Box>
                                <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                    {t(triggerConditionsSL)}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.M24} color={theme.black}>
                                {numberCommasDot(item.SL)}
                            </Txt>
                        </Box>
                    }

                    {reducerOnly &&
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                    {t('Reduce Only')}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.IBMPR} color={theme.black} size={12}>
                                {t('Yes')}
                            </Txt>
                        </Box>
                    }

                    {(showTPSL && (item.TP || item.SL)) &&
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                    TP/SL
                                </Txt>
                            </Box>
                            <Btn onPress={() => navigate(screen.TPSL, { itemOpenOrder: item })}>
                                <Txt fontFamily={fonts.IBMPR} color={colors.yellow} size={12}>
                                    {t('View')}
                                </Txt>
                            </Btn>
                        </Box>
                    }
                </Box>
            </Box>
            <Box alignEnd>
                <Btn
                    onPress={() => onCancelOpenOrder(item)}
                    radius={3}
                    paddingVertical={5}
                    paddingHorizontal={10}
                    backgroundColor={theme.gray2}
                >
                    <Txt fontFamily={fonts.IBMPM} size={13} color={theme.black}>
                        {t('Cancel')}
                    </Txt>
                </Btn>
            </Box>
        </Box >
    )
}

export default ItemOpenOrder
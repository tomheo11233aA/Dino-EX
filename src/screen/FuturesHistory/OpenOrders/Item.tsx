import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { convertTPSL, numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import { StyleSheet } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { IOpenOrder } from 'src/model/fundingModel'

interface Props {
    t: any;
    theme: any;
    item: IOpenOrder;
    onCancelOpenOrder: Function;
}

const WIDTH = 71.5

const Item = ({
    t,
    item,
    theme,
    onCancelOpenOrder,
}: Props) => {
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
    const itemConver = convertTPSL(item, t)

    return (
        <Box
            key={itemConver.id}
            paddingVertical={20}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween alignCenter>
                <Txt size={13} fontFamily={fonts.IBMPM} color={theme.black}>
                    {`${itemConver.symbol} ${t('Perpetual')}`}
                </Txt>
                <Txt fontFamily={fonts.M23} color={colors.grayBlue} size={13}>
                    {itemConver.created_at}
                </Txt>
            </Box>
            <Txt
                size={12}
                fontFamily={fonts.IBMPM}
                color={itemConver.side === 'buy' ? colors.green2 : colors.red2}
            >
                {`${itemConver.typeTrade} / ${t(side)}`}
            </Txt>
            <Box paddingLeft={20} marginTop={10} row>
                <CircularProgress
                    value={0}
                    radius={17}
                    valueSuffix='%'
                    activeStrokeWidth={5}
                    inActiveStrokeWidth={5}
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeColor={colors.gray5}
                    activeStrokeColor={itemConver.side === 'buy' ? colors.green2 : colors.red2}
                />
                <Box marginLeft={15} flex={1}>
                    <Box row>
                        <Box width={WIDTH}>
                            <Txt style={styles.textGray}>
                                {t('Amount')} (USDT)
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M17} color={theme.black} size={13}>
                            {numberCommasDot('0.0')}
                            <Txt color={colors.gray5}>
                                {' /'} {numberCommasDot(itemConver.amount?.toFixed(1))}
                            </Txt>
                        </Txt>
                    </Box>

                    <Box row marginTop={5}>
                        <Box width={WIDTH}>
                            <Txt style={styles.textGray}>
                                {t('Price')}
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M17} color={theme.black} size={13}>
                            {numberCommasDot(itemConver?.orderEntryPrice?.toFixed(1))}
                        </Txt>
                    </Box>

                    {itemConver.triggerConditionsTP &&
                        <Box row marginTop={5} alignCenter>
                            <Box>
                                <Txt style={styles.textGray}>
                                    {t(itemConver.triggerConditionsTP)}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.M17} color={theme.black} size={13}>
                                {numberCommasDot(itemConver.TP)}
                            </Txt>
                        </Box>
                    }

                    {itemConver.triggerConditionsSL &&
                        <Box row marginTop={5} alignCenter>
                            <Box>
                                <Txt style={styles.textGray}>
                                    {t(itemConver.triggerConditionsSL)}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.M17} color={theme.black} size={13}>
                                {numberCommasDot(itemConver.SL)}
                            </Txt>
                        </Box>
                    }

                    {itemConver.reducerOnly &&
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    {t('Reduce Only')}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.IBMPR} color={theme.black} size={11}>
                                {t('Yes')}
                            </Txt>
                        </Box>
                    }

                    {(itemConver.showTPSL && (itemConver.TP || itemConver.SL)) &&
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    TP/SL
                                </Txt>
                            </Box>
                            <Btn onPress={() => navigate(screen.TPSL, { itemOpenOrder: item })}>
                                <Txt fontFamily={fonts.IBMPR} color={colors.yellow} size={11}>
                                    {t('View')}
                                </Txt>
                            </Btn>
                        </Box>
                    }

                    <Btn
                        radius={3}
                        paddingVertical={4}
                        paddingHorizontal={15}
                        alignSelf={'flex-end'}
                        backgroundColor={theme.gray2}
                        onPress={() => onCancelOpenOrder(item)}
                    >
                        <Txt fontFamily={fonts.IBMPM} size={9} color={theme.black}>
                            {t('Cancel')}
                        </Txt>
                    </Btn>
                </Box>
            </Box>
        </Box>
    )
}

export default Item

const styles = StyleSheet.create({
    textGray: {
        fontSize: 11,
        color: colors.gray5,
        fontFamily: fonts.IBMPR,
    }
})
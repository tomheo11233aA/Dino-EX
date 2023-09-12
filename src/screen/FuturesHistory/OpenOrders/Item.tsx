import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { IOpenOrder } from 'src/model/fundingModel'

interface Props {
    t: any;
    theme: any;
    item: IOpenOrder;
    onCancelOpenOrder: Function;
}

const Item = ({
    t,
    item,
    theme,
    onCancelOpenOrder,
}: Props) => {
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
    return (
        <Box
            key={item.id}
            paddingVertical={20}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween alignCenter>
                <Txt size={13} fontFamily={fonts.IBMPM} color={theme.black}>
                    {`${item.symbol} ${t('Perpetual')}`}
                </Txt>
                <Txt fontFamily={fonts.M23} color={colors.grayBlue} size={13}>
                    {item.created_at}
                </Txt>
            </Box>
            <Txt
                size={12}
                fontFamily={fonts.IBMPM}
                color={item.side === 'buy' ? colors.green2 : colors.red2}
            >
                {`${item.typeTrade} / ${t(side)}`}
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
                    activeStrokeColor={item.side === 'buy' ? colors.green2 : colors.red2}
                />
                <Box marginLeft={15} flex={1}>
                    <Box row>
                        <Box width={70}>
                            <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={11}>
                                {t('Amount')} (USDT)
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M17} color={theme.black} size={13}>
                            {numberCommasDot(item.amount?.toFixed(3))}
                            <Txt color={colors.gray5}>
                                {' /'} {numberCommasDot('0.000')}
                            </Txt>
                        </Txt>
                    </Box>

                    <Box
                        row
                        alignEnd
                        justifySpaceBetween
                    >
                        <Box row flex={1}>
                            <Box width={70}>
                                <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={11}>
                                    {t('Price')}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.M17} color={theme.black} size={13}>
                                {numberCommasDot('0.000')}
                            </Txt>
                        </Box>

                        <Btn
                            radius={3}
                            paddingVertical={4}
                            paddingHorizontal={15}
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
        </Box>
    )
}

export default Item
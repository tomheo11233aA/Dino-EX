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
    t: any,
    theme: any,
    item: IOpenOrder,
}

const ItemOpenOrder = ({
    t,
    item,
    theme,
}: Props) => {
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
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
                    {`${item.symbol} ${t('Perpetual')}`}
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
            </Txt>
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
                        <Box width={70}>
                            <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                {t('Amount')} (USDT)
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M24} color={theme.black}>
                            {numberCommasDot(item.amount?.toFixed(3))}
                            <Txt color={colors.gray5}>
                                {' / '} {numberCommasDot('0.000')}
                            </Txt>
                        </Txt>
                    </Box>

                    <Box row>
                        <Box width={70}>
                            <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                                {t('Price')}
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M24} color={theme.black}>
                            {numberCommasDot('0.000')}
                        </Txt>
                    </Box>
                </Box>
            </Box>
            <Box alignEnd>
                <Btn
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
        </Box>
    )
}

export default ItemOpenOrder
import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { fonts } from '@theme/fonts'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { numberCommasDot } from '@method/format'

const IBMPR = fonts.IBMPR
const ItemWithdrawHistory = ({ item, index, theme }:any) => {
    return (
        <Box
            key={index}
            row
            justifySpaceBetween
            marginTop={25}
        >
            <Box>
                <Txt fontFamily={fonts.IBMPM} marginBottom={5} size={13} color={theme.black}>
                    {item.symbol}
                </Txt>
                <Txt size={11} color={colors.grayBlue} fontFamily={IBMPR}>
                    {item.toAddress}
                </Txt>
                <Txt size={11} color={colors.grayBlue} fontFamily={IBMPR}>
                    {item.created_at}
                </Txt>
            </Box>

            <Box>
                <Txt fontFamily={fonts.M24} color={theme.black}>
                    {numberCommasDot(item.amount)}
                </Txt>
                <Box row alignCenter marginTop={5}>
                    <Txt color={colors.greenCan} size={5} marginRight={2}>
                        ●
                    </Txt>
                    <Txt color={colors.grayBlue} size={10} fontFamily={IBMPR}>
                        Done
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default ItemWithdrawHistory
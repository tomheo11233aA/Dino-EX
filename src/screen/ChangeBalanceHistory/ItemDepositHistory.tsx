import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const ItemDepositHistory = ({ item, theme }: any) => {
    return (
        <Box
            key={item.id}
            justifySpaceBetween
            marginTop={25}
        >
            <Box row alignCenter justifySpaceBetween>
                <Txt fontFamily={fonts.SGM} size={13} color={theme.black}>
                    {'USDT'}
                </Txt>

                <Txt fontFamily={fonts.M24} size={15} color={theme.black}>
                    {item.amount}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={5}>
                <Txt size={13} color={colors.grayBlue} fontFamily={fonts.M23}>
                    {item.created_at}
                </Txt>
                <Box row alignCenter>
                    <Txt color={colors.greenCan} size={5} marginRight={2}>
                        ●
                    </Txt>
                    <Txt color={colors.grayBlue} size={10} fontFamily={fonts.IBMPR}>
                        Completed
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default ItemDepositHistory
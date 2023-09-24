import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'

const ItemDepositHistory = ({ item, theme, t }: any) => {
    return (
        <Btn
            onPress={() => navigate(screen.DEPOSIT_DETAIL)}
            justifySpaceBetween
            marginTop={25}
            alignCenter={false}
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
                        {t('Completed')}
                    </Txt>
                </Box>
            </Box>
        </Btn>
    )
}

export default ItemDepositHistory
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    title: any;
    value?: number;
}

const ItemUSDT = ({ title, value }: Props) => {
    const theme = useTheme()

    return (
        <Box row justifySpaceBetween alignCenter marginTop={5}>
            <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR}>
                {title}
            </Txt>
            <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7} size={15}>
                {'0,00'}
                <Txt color={theme.black} size={12} fontFamily={fonts.IBMPR}>
                    {' USDT'}
                </Txt>
            </Txt>
        </Box>
    )
}

export default ItemUSDT
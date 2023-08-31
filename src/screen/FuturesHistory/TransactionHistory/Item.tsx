import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';

interface Props {
    t: any;
    item: any;
    theme: any;
}

const Item = ({
    t,
    item,
    theme,
}: Props) => {
    return (
        <Box
            borderBottomWidth={1}
            borderColor={theme.gray}
            paddingVertical={20}
        >
            <Box row alignCenter justifySpaceBetween>
                <Txt color={theme.black} fontFamily={fonts.AS} size={16}>
                    {item.symbol}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={15}>
                    {item.date}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginVertical={10}>
                <Txt color={colors.grayBlue}>
                    {'Type'}
                </Txt>
                <Txt color={theme.black}>
                    {item.type}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginBottom={10}>
                <Txt color={colors.grayBlue}>
                    {'Code'}
                </Txt>
                <Txt color={theme.black}>
                    {item.code}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween>
                <Txt color={colors.grayBlue}>
                    {'Amount'}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M24} size={15}>
                    {item.amount}
                </Txt>
            </Box>
        </Box>
    )
}

export default Item
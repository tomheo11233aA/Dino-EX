import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { IHistoryChangeBalance } from 'src/model/fundingModel';
import { numberCommasDot } from '@method/format';

interface Props {
    t: any;
    item: IHistoryChangeBalance;
    theme: any;
}

const IBMPR = fonts.IBMPR
const SIZE_12 = 12

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
                <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                    {item.title}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={12}>
                    {item.created_at}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginVertical={10}>
                <Txt style={styles.textGray} size={12}>
                    {'Type'}
                </Txt>
                <Txt color={theme.black} fontFamily={IBMPR} size={SIZE_12}>
                    {item.type}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginBottom={10}>
                <Txt style={styles.textGray} size={SIZE_12}>
                    {'Code'}
                </Txt>
                <Txt color={theme.black} fontFamily={IBMPR} size={SIZE_12}>
                    {`${item.symbol} ${t('Perpetual')}`}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween>
                <Txt style={styles.textGray} size={SIZE_12}>
                    {'Amount'}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {numberCommasDot(item.amount)}
                </Txt>
            </Box>
        </Box>
    )
}

export default Item

const styles = StyleSheet.create({
    textGray: {
        color: colors.grayBlue,
        fontSize: 13,
        fontFamily: fonts.IBMPR
    }
})
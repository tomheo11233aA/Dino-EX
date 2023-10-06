import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import Icon from '@commom/Icon';

interface Props {
    theme: any;
    t: any;
}

const WeekDayTeller = ({ theme, t }: Props) => {
    return (
        <Box
            row
            alignCenter
            marginTop={15}
            justifySpaceBetween
        >
            <Box>
                <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                    {t('Hot trader')}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={4}>
                    {t('Hot traders in the past 7 days')}
                </Txt>
            </Box>
            <Icon
                size={10}
                resizeMode={'contain'}
                tintColor={theme.black}
                source={require('@images/wallet/right_arrow.png')}
            />
        </Box>
    )
}

export default WeekDayTeller
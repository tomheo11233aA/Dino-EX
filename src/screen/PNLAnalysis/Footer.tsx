import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ChartPNl from './ChartPNl'

const FONT = fonts.IBMPM

const Footer = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box paddingHorizontal={15} marginTop={20}>
            <Box row alignStart>
                <Box alignCenter flex={1}>
                    <Txt fontFamily={FONT} color={theme.black} >
                        Account overview
                    </Txt>
                    <Box width={40} height={3} backgroundColor={colors.yellow} marginTop={7} />
                </Box>
                <Box flex={1} alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={FONT}>
                        Detail
                    </Txt>
                </Box>
            </Box>

            <Txt color={theme.black} marginTop={20} fontFamily={FONT}>
                {t('PNL hằng ngày')}
            </Txt>
            <Txt color={colors.grayBlue} fontFamily={fonts.M23} marginTop={10}>
                {'2023-09-22'}
            </Txt>
            <Txt color={theme.black} fontFamily={fonts.M24} marginTop={5} size={15}>
                {'0,00'}
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                    {' USDT'}
                </Txt>
            </Txt>

            <ChartPNl />
        </Box>
    )
}

export default Footer
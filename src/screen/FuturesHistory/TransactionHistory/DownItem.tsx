import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    title: string;
    value: string;
    marginRight?: number;
}

const DownItem = ({
    title,
    value,
    marginRight = 20,
}: Props) => {
    const { t } = useTranslation()

    return (
        <Box row alignCenter marginRight={marginRight}>
            <Txt
                size={13}
                fontFamily={fonts.IBMPM}
                color={colors.grayBlue}
            >
                {t(title) + t(value)}
            </Txt>
            <Icon
                size={14}
                source={require('@images/trade/more.png')}
            />
        </Box>
    )
}

export default DownItem
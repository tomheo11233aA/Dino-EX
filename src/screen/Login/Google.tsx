import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const Google = ({ t, theme }: any) => {
    return (
        <Box
            alignCenter
            justifyCenter
            backgroundColor={theme.gray}
            row
            height={50}
        >
            <Img
                source={require('@images/login/google.png')}
                width={20}
                height={20}
                marginRight={10}
            />
            <Txt size={16} fontFamily={fonts.SGM} color={theme.black}>
                {t('Continue with Google')}
            </Txt>
        </Box>
    )
}

export default Google
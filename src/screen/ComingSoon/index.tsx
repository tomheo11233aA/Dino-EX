import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { applyLetterSpacing } from '@method/format'
import { colors } from '@theme/colors'
import { height, width } from '@util/responsive'
import React from 'react'

const ComingSoon = ({
    flex = 1,
    marginTop = -height * 20 / 100
}) => {
    const theme = useTheme()
    return (
        <Box
            flex={flex}
            alignCenter
            justifyCenter
            backgroundColor={theme.bg}
            marginTop={marginTop}
        >
            <Icon
                size={width * 90 / 100}
                marginLeft={20}
                source={require('@images/planet2.png')}
            />
            <Txt
                bold
                size={20}
                marginTop={-50}
                color={colors.yellow}
            >
                {applyLetterSpacing('COMING SOON', 10)}
            </Txt>
        </Box>
    )
}

export default ComingSoon
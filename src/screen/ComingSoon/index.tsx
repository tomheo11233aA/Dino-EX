import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { applyLetterSpacing } from '@method/format'
import { colors } from '@theme/colors'
import { height, width } from '@util/responsive'
import React from 'react'

const ComingSoon = ({
    flex = 1,
    marginTop = -height * 20 / 100
}) => {
    return (
        <Box
            flex={flex}
            alignCenter
            justifyCenter
            backgroundColor={'white'}
            marginTop={marginTop}
        >
            <Icon
                size={width * 90 / 100}
                marginLeft={20}
                source={require('@images/planet2.png')}
            />
            <Txt bold size={20} color={colors.yellow} marginTop={-50}>
                {applyLetterSpacing('COMING SOON', 10)}
            </Txt>
        </Box>
    )
}

export default ComingSoon
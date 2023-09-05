import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import CheckItem from './CheckItem'

const Side = () => {
    const theme = useTheme()

    return (
        <Box marginTop={40}>
            <Box
                paddingVertical={10}
                borderBottomWidth={1}
                borderColor={theme.gray2}
            >
                <Txt color={colors.grayBlue} size={16} fontFamily={fonts.AS}>
                    Direction
                </Txt>
            </Box>
            <Box row>
                <Box flex={1}>
                    <CheckItem title={'Buy'} />
                </Box>
                <Box flex={1}>
                    <CheckItem title={'Sell'} />
                </Box>
            </Box>

            <Box row marginTop={30}>
                <Box
                    flex={1}
                    radius={3}
                    alignCenter
                    marginRight={10}
                    paddingVertical={10}
                    backgroundColor={theme.gray2}
                >
                    <Txt color={theme.black} fontFamily={fonts.RM}>Reset</Txt>
                </Box>
                <Box
                    flex={1}
                    radius={3}
                    alignCenter
                    paddingVertical={10}
                    backgroundColor={colors.yellow}
                >
                    <Txt color={colors.black} fontFamily={fonts.RM}>Confirm</Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Side
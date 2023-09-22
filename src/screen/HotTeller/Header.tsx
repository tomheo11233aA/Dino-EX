import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const IBMPM = fonts.IBMPM

const Header = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box>
            <Box row justifySpaceBetween>
                <Btn onPress={() => goBack()}>
                    <Icon
                        size={14}
                        tintColor={theme.black}
                        source={require('@images/coppyTrade/close.png')}
                    />
                </Btn>
                <Box
                    row
                    alignStart
                >
                    <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12}>
                        {t('My orders')}
                    </Txt>
                    <Btn marginLeft={25}>
                        <Icon
                            size={14}
                            resizeMode={'contain'}
                            tintColor={theme.black}
                            source={require('@images/p2p/menu.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row marginTop={20}>
                <Txt color={theme.black} fontFamily={IBMPM} size={18}>
                    {t('Copy')}
                </Txt>
                <Txt color={colors.grayBlue} marginLeft={10} fontFamily={IBMPM} size={18}>
                    {t('Information resource')}
                </Txt>
            </Box>

            <Box row>
                <Box>
                    <Txt color={theme.black}>
                        Contract
                    </Txt>
                </Box>
                <Txt>Spot</Txt>
            </Box>
        </Box>
    )
}

export default Header
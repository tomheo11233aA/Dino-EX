import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const SIZE_12 = 12
const MRT_25 = 25
const Infomation = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box paddingHorizontal={15}>
            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Box row alignCenter>
                    <Txt style={styles.textGray}>
                        {t('Confirm') + '  '}
                    </Txt>
                    <Icon
                        size={11}
                        source={require('@images/future/info.png')}
                    />
                </Box>
                <Txt color={theme.black} fontFamily={fonts.M23}>12345</Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Wallet')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={SIZE_12}>
                    {t('Spot wallet')}
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Network')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={SIZE_12}>
                    {t('BSC')}
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignStart marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Address')}
                </Txt>
                <Box row width={'60%'} marginRight={15} alignStart>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.IBMPR}
                        size={SIZE_12}
                        right
                    >
                        {t('0x5d63hd7shs7ds83he398hd83d387dg3dg83hd39d83h93')}
                    </Txt>
                    <Btn marginLeft={10}>
                        <Icon
                            size={12}
                            source={require('@images/wallet/copy.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row justifySpaceBetween alignStart marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Address')}
                </Txt>
                <Box row width={'60%'} marginRight={15} alignStart>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.IBMPR}
                        size={SIZE_12}
                        right
                        line
                    >
                        {t('0x5d63hd7shs7ds83he398hd83d387dg3dg83hd39d83h93')}
                    </Txt>
                    <Btn marginLeft={10}>
                        <Icon
                            size={12}
                            source={require('@images/wallet/copy.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Time')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {t('2022-05-26 18:39:40')}
                </Txt>
            </Box>

            <Box alignSelf={'center'} marginTop={30}>
                <Txt size={SIZE_12} color={colors.yellow} fontFamily={fonts.IBMPM}>
                    {t('Do you need help? See frequently asked questions')}
                </Txt>
            </Box>
        </Box>
    )
}

export default Infomation

const styles = StyleSheet.create({
    textGray: {
        fontSize: 12,
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    }
})
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'

const QRReferral = ({ t }: any) => {
    return (
        <Box row marginTop={10} width={'100%'} alignCenter>
            <Box
                padding={3}
                alignCenter
                justifyCenter
                backgroundColor={'white'}
            >
                <QRCode
                    size={40}
                    color='black'
                    backgroundColor='white'
                    value={'https://www.binance.info/vi/futures/ref/170597461'}
                />
            </Box>

            <Box marginLeft={10} flex={1}>
                <Txt color={colors.gray5} size={9}>{t('Referral code')}</Txt>
                <Txt
                    color={colors.white}
                    fontFamily={fonts.M24}
                    size={23}
                    numberOfLines={10}
                    marginVertical={2}
                >
                    {'170597461'}
                </Txt>
                <Txt color={colors.yellow} size={9}>
                    {t('Download the Binance App')}
                </Txt>
            </Box>
        </Box>
    )
}

export default QRReferral
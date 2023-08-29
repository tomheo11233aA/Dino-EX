import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()
  return (
    <Box flex={1} backgroundColor={colors.white} paddingHorizontal={10}>
      <Box flex={1} alignCenter justifyCenter marginTop={40}>
        <Box backgroundColor={colors.gray2} width={170} height={170} radius={170} alignCenter justifyCenter>
          <Img
            source={require('@images/wallet/phone.png')}
            width={200}
            height={200}
          />
        </Box>
        <Txt marginTop={40} bold size={25}>{t('Welcome to Binance')}</Txt>
      </Box>

      <Box row alignCenter justifySpaceBetween marginTop={10} marginBottom={10}>
        <Btn width={'48%'} backgroundColor={colors.gray3} height={50} radius={20}>
          <Txt bold size={17}>{t('Sing Up')}</Txt>
        </Btn>

        <Btn
          onPress={() => navigate(screen.LOGIN)}
          width={'48%'}
          backgroundColor={colors.yellow}
          height={50}
          radius={20}
        >
          <Txt bold size={17}>{t('Log In')}</Txt>
        </Btn>
      </Box>
    </Box>
  )
}

export default Login
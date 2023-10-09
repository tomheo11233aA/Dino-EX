import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { heightBottomTab } from '@util/responsive'
import React from 'react'
import Header from './Header'
import { hideBottomTab, useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box'
import Information from './Information'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'

const SignUpTrader = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  hideBottomTab()
  
  return (
    <Box flex={1} backgroundColor={theme.bg}>
      <KeyBoardSafe paddingBottom={heightBottomTab()}>
        <Header {...{ theme, t }} />
        <Information {...{ theme, t }} />
      </KeyBoardSafe>
      <Box
        paddingTop={20}
        marginBottom={40}
        paddingHorizontal={15}
      >
        <Btn
          radius={3}
          paddingVertical={10}
          backgroundColor={colors.yellow}
        >
          <Txt fontFamily={fonts.IBMPM}>
            {t('Apply Now')}
          </Txt>
        </Btn>

        <Txt center color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={10}>
          {t("If you're already a widely followed trader, please ")}
          <Txt color={colors.yellowBold} size={12}>
            {t('submit your application via the KOL channel')}
          </Txt>
        </Txt>
      </Box>
    </Box>
  )
}

export default SignUpTrader
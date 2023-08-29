import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Back from '@reuse/Back'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { fonts } from '@theme/fonts'
import React from 'react'
import Appearance from './Appearance'
import { useTheme } from '@hooks/index'
import General from './General'
import { useTranslation } from 'react-i18next'

const Setting = () => {
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <KeyBoardSafe>
      <Box padding={15}>
        <Back />
        <Txt
          size={23}
          fontFamily={fonts.AS}
          marginTop={18}
          color={theme.black}
        >
          {t('Settings')}
        </Txt>
        <General {...{ t, i18n }} />
        <Appearance {...{ t, i18n }}  />
      </Box>
    </KeyBoardSafe>
  )
}

export default Setting
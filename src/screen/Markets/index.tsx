import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { heightBottomTab } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Coins from './Coins'
import Search from './Search'
import SpotFutures from './SpotFutures'
import Type from './Type'

const Markets = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <KeyBoardSafe
      bg={theme.bg}
      paddingBottom={heightBottomTab()}
    >
      <Search theme={theme} />
      <Type t={t} theme={theme}
      />
      <Box
        paddingTop={15}
        paddingHorizontal={15}
        backgroundColor={theme.bg}
      >
        <SpotFutures theme={theme} t={t} />
        <Coins />
      </Box>
    </KeyBoardSafe>
  )
}

export default Markets
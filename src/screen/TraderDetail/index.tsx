import Box from '@commom/Box'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Avatar from './Avatar'
import { useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import Local from './Local'
import Statistics from './Statistics'
import TransactionData from './TransactionData'

const TraderDetail = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box flex={1}>
      <KeyBoardSafe>
        <Avatar {...{ theme, t }} />
        <Local {...{ theme, t }} />
        <Statistics {...{ theme, t }} />
        <TransactionData {...{ theme, t }} />
      </KeyBoardSafe>
    </Box>
  )
}

export default TraderDetail
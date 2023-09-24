import Box from '@commom/Box'
import { hideBottomTab, useTheme } from '@hooks/index'
import { useRoute } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { height } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Available from './Available'
import Balance from './Balance'
import Header from './Header'
import History from './History'
import TradeSpot from './TradeSpot'
import Footer from './Footer'

const SpotCoin = () => {
  const theme = useTheme()
  const route = useRoute<any>()
  const { coin } = route.params
  const { t } = useTranslation()

  hideBottomTab()

  return (
    <Box flex={1}>
      <KeyBoardSafe bg={theme.gray10} paddingBottom={0}>
        <Box height={height}>
          <Header {...{ theme, coin }} />
          <Box backgroundColor={theme.bg} marginTop={10} paddingHorizontal={15} flex={1}>
            <Balance {...{ theme, coin, t }} />
            <Available {...{ theme, coin, t }} />
            <TradeSpot {...{ theme, t }} />
            <History />
          </Box>
        </Box>
      </KeyBoardSafe>
      <Footer {...{ coin }} />
    </Box>
  )
}

export default SpotCoin
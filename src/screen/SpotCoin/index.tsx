import Box from '@commom/Box'
import { hideBottomTab, useTheme } from '@hooks/index'
import { useRoute } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { height } from '@util/responsive'
import React from 'react'
import Available from './Available'
import Balance from './Balance'
import Earn from './Earn'
import Header from './Header'
import History from './History'
import TradeBuySellCrypto from './TradeBuySellCrypto'
import TradeSpot from './TradeSpot'
import { useTranslation } from 'react-i18next'
import { HEIGHT_BOTTOM_TAB } from '@navigation/Container'
import ComingSoon from '@screen/ComingSoon'

const SpotCoin = () => {
  const theme = useTheme()
  const route = useRoute<any>()
  const { coin } = route.params
  const { t } = useTranslation()
  
  // hideBottomTab()

  return (
    // <KeyBoardSafe bg={theme.gray10} paddingBottom={HEIGHT_BOTTOM_TAB / 2}>
    //   <Box height={height}>
    //     <Header {...{ theme, coin }} />
    //     <Box backgroundColor={theme.bg} marginTop={10} paddingHorizontal={15} flex={1}>
    //       <Balance {...{ theme, coin, t }} />
    //       <Available {...{ theme, coin, t }} />
    //       <TradeBuySellCrypto />
    //       <Earn {...{ theme, t }} />
    //       <TradeSpot {...{ theme, t }} />
    //       <History {...{ coin }} />
    //     </Box>
    //   </Box>
    // </KeyBoardSafe>
    
    <ComingSoon />
  )
}

export default SpotCoin
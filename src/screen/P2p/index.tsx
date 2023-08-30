import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import React from 'react'
import BuySell from './BuySell'
import Header from './Header'
import { HEIGHT_BOTTOM_TAB } from '@navigation/Container'

const P2p = () => {
  return (
    <KeyBoardSafe bg={colors.yellow2} paddingBottom={HEIGHT_BOTTOM_TAB / 2}>
      <Header />
      <BuySell />
    </KeyBoardSafe>
  )
}

export default P2p
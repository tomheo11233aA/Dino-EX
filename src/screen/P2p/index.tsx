import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import React from 'react'
import BuySell from './BuySell'
import Header from './Header'

const P2p = () => {
  return (
    <KeyBoardSafe bg={colors.yellow2} paddingBottom={0}>
      <Header />
      <BuySell />
    </KeyBoardSafe>
  )
}

export default P2p
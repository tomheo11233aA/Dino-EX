import { useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React, { useState } from 'react'
import Header from './Header'
import Tabs from './Tabs'
import TransactionHistory from './TransactionHistory'
import OrderHistory from './OrderHistory'
import PositionHistory from './PositionHistory'
import TWAPHistory from './TWAPHistory'
import FundingFee from './FundingFee'
import OpenOrders from './OpenOrders'
import TradeHistory from './TradeHistory'

const FuturesHistory = () => {
  const theme = useTheme()
  const [tab, setTab] = useState<string>('Open Orders')
  return (
    <KeyBoardSafe bg={theme.bg} paddingHorizontal={15}>
      <Header />
      <Tabs {...{ tab, setTab }} />
      {tab === 'Open Orders' ?
        <OpenOrders /> : tab === 'Order History' ?
          <OrderHistory /> : tab === 'Position History' ?
            <PositionHistory /> : tab === 'Trade History' ?
              <TradeHistory /> : tab === 'TWAP History' ?
                <TWAPHistory /> : tab === 'Transaction History' ?
                  <TransactionHistory /> : <FundingFee />
      }
    </KeyBoardSafe>
  )
}

export default FuturesHistory
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Safe from '@reuse/Safe'
import { profileUserSelector } from '@selector/userSelector'
import React, { useState } from 'react'
import { Profile } from 'src/model/userModel'
import FundingFee from './FundingFee'
import Header from './Header'
import ModalFilter from './ModalFilter'
import OpenOrders from './OpenOrders'
import OrderHistory from './OrderHistory'
import PositionHistory from './PositionHistory'
import TWAPHistory from './TWAPHistory'
import Tabs from './Tabs'
import TradeHistory from './TradeHistory'
import TransactionHistory from './TransactionHistory'

const FuturesHistory = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState<string>('Transaction History')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const profile: Profile = useAppSelector<any>(profileUserSelector)

  return (
    <Safe bg={theme.bg} paddingHorizontal={15}>
      <Header {...{ setShowFilter }} />
      <Tabs {...{ tab, setTab }} />
      {tab === 'Open Orders' ?
        <OpenOrders /> : tab === 'Order History' ?
          <OrderHistory /> : tab === 'Position History' ?
            <PositionHistory /> : tab === 'Trade History' ?
              <TradeHistory /> : tab === 'TWAP History' ?
                <TWAPHistory /> : tab === 'Transaction History' ?
                  <TransactionHistory /> : <FundingFee />
      }
      <ModalFilter
        show={showFilter}
        setShow={setShowFilter}
      />
    </Safe>
  )
}

export default FuturesHistory
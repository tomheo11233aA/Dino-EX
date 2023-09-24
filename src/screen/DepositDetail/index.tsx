import React from 'react'
import TopBar from './TopBar'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Amount from './Amount'
import Infomation from './Infomation'

const DepositDetail = () => {
  return (
    <KeyBoardSafe>
        <TopBar />
        <Amount />
        <Infomation />
    </KeyBoardSafe>
  )
}

export default DepositDetail
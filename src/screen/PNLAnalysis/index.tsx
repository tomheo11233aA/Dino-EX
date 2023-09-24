import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Header from './Header'
import DatePNL from './DatePNL'
import Footer from './Footer'
import { hideBottomTab } from '@hooks/index'

const PNLAnalysis = () => {
  hideBottomTab()

  return (
    <KeyBoardSafe>
      <Header />
      <DatePNL />
      <Footer />
    </KeyBoardSafe>
  )
}

export default PNLAnalysis
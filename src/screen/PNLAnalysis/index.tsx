import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Header from './Header'
import Date from './Date'
import Footer from './Footer'
import { hideBottomTab } from '@hooks/index'

const PNLAnalysis = () => {
  hideBottomTab()

  return (
    <KeyBoardSafe>
      <Header />
      <Date />
      <Footer />
    </KeyBoardSafe>
  )
}

export default PNLAnalysis
import Box from '@commom/Box'
import React from 'react'
import BuyOrSell from './BuyOrSell'
import Limit from './Limit'
import Price from './Price'
import Amount from './Amount'
import Calc from './Calc'
import BuySellButton from './BuySellButton'
import Avbl from './Avbl'
import Slider from './Slider'
import { useTheme } from '@hooks/index'

const BuySellLong = ({ toastTopRef }: any) => {
  const theme = useTheme()
  return (
    <Box width={'63%'} paddingHorizontal={10}>
      <BuyOrSell theme={theme} />
      <Avbl theme={theme} />
      <Limit theme={theme} />
      <Price theme={theme} />
      <Amount theme={theme} />
      <Slider />
      <Calc theme={theme}/>
      <BuySellButton toastTopRef={toastTopRef} />
    </Box>
  )
}

export default BuySellLong
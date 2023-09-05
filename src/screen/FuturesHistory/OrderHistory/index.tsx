import Box from '@commom/Box'
import React from 'react'
import DownItem from '../TransactionHistory/DownItem'
import { colors } from '@theme/colors'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import Item from './Item'

const OrderHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const data = [
    {
      symbol: 'BTCUSDT',
      date: '2023-05-16 13:58:57',
      side: 'Sell',
      type: 'Market',
      amount: '0,001',
      price: '27.059,6',
    },
    {
      symbol: 'BTCUSDT',
      date: '2023-05-16 13:58:57',
      side: 'Buy',
      type: 'Market',
      amount: '0,001',
      price: '27.059,6',
    },
  ]

  return (
    <Box>
      <Box row justifySpaceBetween>
        <Box
          row
          alignCenter
          marginTop={10}
        >
          <DownItem
            title={'Asset: '}
            value={'All'}
          />
          <DownItem
            title={'Type: '}
            value={'All'}
          />
        </Box>

        <Box row alignCenter marginTop={10}>
          <Box
            width={13}
            height={13}
            radius={50}
            marginRight={5}
            borderWidth={1}
            borderColor={colors.grayBlue}
          />
          <Txt color={colors.grayBlue} fontFamily={fonts.AS}>
            {t('Grid')}
          </Txt>
        </Box>
      </Box>
      {
        data.map((item) =>
          <Item
            t={t}
            item={item}
            theme={theme}
            key={Math.random()}
          />
        )
      }
    </Box>
  )
}

export default OrderHistory
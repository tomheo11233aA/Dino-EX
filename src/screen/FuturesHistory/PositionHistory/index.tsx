import Box from '@commom/Box'
import Txt from '@commom/Txt'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DownItem from '../TransactionHistory/DownItem'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import Item from './Item'
import { useTheme } from '@hooks/index'

const PositionHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const data = [
    {
      symbol: 'BTCUSDT',
      regime: 'Cross',
      side: 'Buy',
      PNL: '-0,00',
      entryPrice: '27.063,4',
      closePrice: '27.059,6',
      ClosingVolume: '0,00',
      MaximumVolume: '0,00 BTC',
      open: '2023-05-16 13:53:15',
      close: '2023-05-16 13:56:57',
    },
    {
      symbol: 'BTCUSDT',
      regime: 'Cross',
      side: 'Sell',
      PNL: '-0,00',
      entryPrice: '27.063,4',
      closePrice: '27.059,6',
      ClosingVolume: '0,00',
      MaximumVolume: '0,00 BTC',
      open: '2023-05-16 13:53:15',
      close: '2023-05-16 13:56:57',
    },
  ]

  return (
    <Box>
      <Box
        row
        alignCenter
        marginTop={10}
        justifySpaceBetween
      >
        <DownItem
          value={'All'}
          title={'Type: '}
        />
        <Txt color={colors.gray2} size={12}>
          {t('Last update:')}
          <Txt color={colors.gray2} fontFamily={fonts.M17} size={13}>
            {' 2023-08-31 09:57:34'}
          </Txt>
        </Txt>
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

export default PositionHistory
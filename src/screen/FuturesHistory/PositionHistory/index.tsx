import Box from '@commom/Box'
import Txt from '@commom/Txt'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DownItem from '../TransactionHistory/DownItem'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import Item from './Item'
import { useAppSelector, useTheme } from '@hooks/index'
import { coinsFuturesChartSelector, positionsFuturesSelector } from '@selector/futuresSelector'
import Scroll from '@commom/Scroll'
import { Profile } from 'src/model/userModel'
import { profileUserSelector } from '@selector/userSelector'

const PositionHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const coins = useAppSelector(coinsFuturesChartSelector)
  const positions = useAppSelector(positionsFuturesSelector)
  const profile: Profile = useAppSelector<any>(profileUserSelector)

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
    <Box flex={1}>
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
        <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
          {t('Last update')}
          <Txt color={colors.grayBlue} fontFamily={fonts.M17} size={13}>
            {': 2023-08-31 09:57:34'}
          </Txt>
        </Txt>
      </Box>
      <Scroll flex={1}>
        {
          positions.map((item) =>
            <Item
              t={t}
              item={item}
              theme={theme}
              coins={coins}
              profile={profile}
              key={Math.random()}
            />
          )
        }
      </Scroll>
    </Box>
  )
}

export default PositionHistory
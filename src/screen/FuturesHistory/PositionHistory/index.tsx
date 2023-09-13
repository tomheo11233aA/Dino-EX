import Box from '@commom/Box'
import Txt from '@commom/Txt'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import DownItem from '../TransactionHistory/DownItem'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import Item from './Item'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { coinsFuturesChartSelector, positionsFuturesSelector } from '@selector/futuresSelector'
import Scroll from '@commom/Scroll'
import { Profile } from 'src/model/userModel'
import { profileUserSelector } from '@selector/userSelector'
import { positionsHistoryFundingSelector } from '@selector/fundingSelector'
import { getListPositionCloseThunk } from '@asyncThunk/fundingAsyncThunk'

const PositionHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const coins = useAppSelector(coinsFuturesChartSelector)
  const profile: Profile = useAppSelector<any>(profileUserSelector)
  const positionsHistory = useAppSelector(positionsHistoryFundingSelector)

  console.log(positionsHistory.data)

  useEffect(() => {   
      dispatch(getListPositionCloseThunk())
  }, [])

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
            {': --'}
          </Txt>
        </Txt>
      </Box>
      <Scroll flex={1}>
        {
          positionsHistory.data.map((item) =>
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
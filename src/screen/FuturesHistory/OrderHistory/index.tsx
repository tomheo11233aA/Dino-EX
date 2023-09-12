import Box from '@commom/Box'
import React, { useEffect, useState } from 'react'
import DownItem from '../TransactionHistory/DownItem'
import { colors } from '@theme/colors'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import Item from './Item'
import { getHistoryOrder } from '@service/fundingService'
import { getHistoryOrderThunk } from '@asyncThunk/fundingAsyncThunk'
import { orderHistorysFundingSelector } from '@selector/fundingSelector'
import ModalAsset from './ModalAsset'
import ModalType from './ModalType'

const OrderHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const orderHistory = useAppSelector(orderHistorysFundingSelector)

  const [type, setType] = useState('All')
  const [typeTrade, setTypeTrade] = useState('All')
  const [isShowModalAsset, setShowModalAsset] = useState(false)
  const [isShowModalType, setShowModalType] = useState(false)

  useEffect(() => {
    handleGetHistoryOrder()
  }, [])

  const handleGetHistoryOrder = async () => {
    dispatch(getHistoryOrderThunk({
      page: 1,
      limit: 1000,
    }))
  }

  const handleSetType = (symbol: string) => {
    if (symbol === 'All') {
      handleGetHistoryOrder()
    } else {
      dispatch(getHistoryOrderThunk({
        page: 1,
        limit: 100,
        symbol: symbol,
      }))
    }
    setType(symbol)
    setShowModalAsset(false)
  }

  const handleSetTypeTrade = (typeTrade: string) => {
    if (typeTrade === 'All') {
      handleGetHistoryOrder()
    } else {
      dispatch(getHistoryOrderThunk({
        page: 1,
        limit: 1000,
        typeTrade: typeTrade,
      }))
    }
    setTypeTrade(typeTrade)
    setShowModalType(false)
  }

  return (
    <Box>
      <Box row justifySpaceBetween>
        <Box
          row
          alignCenter
          marginTop={10}
        >
          <DownItem
            value={type}
            title={'Asset: '}
            onPress={() => setShowModalAsset(true)}
          />
          <DownItem
            value={typeTrade}
            title={'Type: '}
            onPress={() => setShowModalType(true)}
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
          <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={12}>
            {t('Grid')}
          </Txt>
        </Box>
      </Box>
      {
        orderHistory.data.map((item) =>
          <Item
            t={t}
            item={item}
            theme={theme}
            key={Math.random()}
          />
        )
      }

      <ModalAsset
        type={type}
        show={isShowModalAsset}
        onSetType={handleSetType}
        setShow={setShowModalAsset}
      />
      <ModalType
        type={typeTrade}
        show={isShowModalType}
        onSetType={handleSetTypeTrade}
        setShow={setShowModalType}
      />
    </Box>
  )
}

export default OrderHistory
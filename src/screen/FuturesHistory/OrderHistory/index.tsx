import { getHistoryOrderThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { orderHistorysFundingSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import DownItem from '../TransactionHistory/DownItem'
import ModalAsset from './ModalAsset'
import ModalType from './ModalType'
import { StyleSheet } from 'react-native'

const OrderHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const orderHistory = useAppSelector(orderHistorysFundingSelector)
  const [type, setType] = useState('All')
  const [typeTrade, setTypeTrade] = useState('All')
  const [isShowModalType, setShowModalType] = useState(false)
  const [isShowModalAsset, setShowModalAsset] = useState(false)

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

  const renderItem = ({ item }: any) => {
    const color = item.side === 'buy' ? colors.green2 : colors.red3
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
    return (
      <Box
        paddingVertical={15}
        borderBottomWidth={1}
        borderColor={theme.gray2}
      >
        <Box row justifySpaceBetween>
          <Box>
            <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
              {item.symbol} {t('Perpetual')}
            </Txt>
            <Txt color={color} fontFamily={fonts.IBMPM} size={11}>
              {t(side)} / {t(item.typeTrade)}
            </Txt>
          </Box>

          <Box alignEnd>
            <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={13}>
              {item.created_at}
            </Txt>
            {item.type === 1 ?
              <Box
                marginTop={5}
                paddingVertical={2}
                paddingHorizontal={5}
                backgroundColor={theme.green}
              >
                <Txt color={colors.green} size={9}>
                  {t('Matched')}
                </Txt>
              </Box> :
              <Box
                marginTop={5}
                paddingVertical={2}
                paddingHorizontal={5}
                backgroundColor={theme.gray2}
              >
                <Txt color={colors.grayBlue} size={9}>
                  {t('Canceled')}
                </Txt>
              </Box>
            }

          </Box>
        </Box>

        <Box
          row
          alignCenter
          marginTop={10}
          justifySpaceBetween
        >
          <Txt color={theme.black} size={12}>
            {`${t('Amount')} (BTC)`}
          </Txt>
          <Txt
            size={13}
            color={theme.black}
            fontFamily={fonts.M23}
          >
            {numberCommasDot(item.amount?.toFixed(2))}
            <Txt color={colors.grayBlue} size={13}>
              {' / 0,00'}
            </Txt>
          </Txt>
        </Box>

        <Box
          row
          alignCenter
          marginTop={10}
          justifySpaceBetween
        >
          <Txt color={theme.black} size={12} fontFamily={fonts.IBMPR}>
            {t('Price')}
          </Txt>
          <Txt color={theme.black} fontFamily={fonts.M23} size={13}>
            {'--'}
            <Txt color={colors.grayBlue} size={13}>
              {' / 0,00'}
            </Txt>
          </Txt>
        </Box>

        {/* <Box
          row
          alignCenter
          marginTop={10}
          justifySpaceBetween
        >
          <Txt color={theme.black}>
            {'Reduce Only'}
          </Txt>
  
          <Txt color={theme.black} size={15}>
            {' Correct'}
          </Txt>
        </Box> */}
      </Box>
    )
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
        <FlatList
          renderItem={renderItem}
          initialNumToRender={10}
          data={orderHistory.data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
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
        setShow={setShowModalType}
        onSetType={handleSetTypeTrade}
      />
    </Box>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
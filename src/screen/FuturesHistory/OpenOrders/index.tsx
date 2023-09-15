import { getHistoryOpenOrderAllThunk, getHistoryOpenOrderThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { openOrdersFundingSelector } from '@selector/fundingSelector'
import { cancelOpenOrder } from '@service/fundingService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { IOpenOrder } from 'src/model/fundingModel'
import DownItem from '../TransactionHistory/DownItem'
import Item from './Item'
import ModalAsset from './ModalAsset'

const OpenOrders = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [type, setType] = useState('All')
  const [isShowModalAsset, setShowModalAsset] = useState(false)

  const openOrders = useAppSelector(openOrdersFundingSelector)

  useEffect((): any => {
    getHistoryOpenOrderAll()
  }, [])

  const handleSetType = (symbol: string) => {
    if (symbol === 'All') {
      dispatch(getHistoryOpenOrderAllThunk({
        page: 1,
        limit: 100,
      }))
    } else {
      dispatch(getHistoryOpenOrderThunk({
        page: 1,
        limit: 100,
        symbol: symbol,
      }))
    }
    setType(symbol)
    setShowModalAsset(false)
  }

  const getHistoryOpenOrderAll = async () => {
    dispatch(getHistoryOpenOrderAllThunk({
      limit: 10,
      page: 1,
    }))
  }

  const handleCancelOpenOrder = async (item: IOpenOrder) => {
    const res = await cancelOpenOrder(item.id)
    if (res.error) {
      return Alert.alert(t(res.message))
    }
    if (res.status) {
      handleSetType(type)
    }
  }

  return (
    <Box flex={1}>
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
            value={'All'}
            title={'Type: '}
          />
        </Box>

        <Box
          radius={2}
          padding={3}
          marginTop={10}
          backgroundColor={theme.gray2}
        >
          <Txt color={theme.black} size={11} fontFamily={fonts.IBMPM}>
            {t('Cancel all')}
          </Txt>
        </Box>
      </Box>

      {openOrders.data.length === 0 ?
        <Box alignCenter marginTop={100}>
          <Icon
            size={70}
            resizeMode={'contain'}
            source={require('@images/future/find.png')}
          />
          <Txt
            size={13}
            marginTop={20}
            fontFamily={fonts.IBMPR}
            color={colors.grayBlue}
          >
            {t('Not positions')}
          </Txt>
        </Box> :
        <Scroll flexGrow={1} paddingBottom={100}>
          {openOrders.data.map((item) =>
            <Item
              t={t}
              item={item}
              key={item.id}
              theme={theme}
              onCancelOpenOrder={handleCancelOpenOrder}
            />
          )}
        </Scroll>
      }
      <ModalAsset
        type={type}
        show={isShowModalAsset}
        onSetType={handleSetType}
        setShow={setShowModalAsset}
      />
    </Box>
  )
}

export default OpenOrders
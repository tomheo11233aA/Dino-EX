import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { delay } from '@method/alert'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingYellow from '@reuse/LoadingYellow'
import ToastTop from '@reuse/ToastTop'
import Login from '@screen/Wallet/Login'
import { loadingFuturesSelector } from '@selector/futuresSelector'
import { isLoginUserSelector } from '@selector/userSelector'
import futuresSlice from '@slice/futuresSlice'
import React, { useEffect, useRef } from 'react'
import Drawer from './Drawer'
import Header from './Header'
import OpenCloseChart from './OpenCloseChart'
import Transaction from './Transaction'
import { useNavigation } from '@react-navigation/native'
import { styles } from '@navigation/Container'

const Futures = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const drawerRef = useRef(null)
  const toastTopRef = useRef(null)
  const isLogin = useAppSelector(isLoginUserSelector)
  const loading = useAppSelector(loadingFuturesSelector)
  const navigation = useNavigation()

  useEffect(() => {
    if (loading) {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
      delay(1000).then(() => dispatch(futuresSlice.actions.setLoading(false)))
    }
  }, [loading])

  return (
    <>
      {isLogin ?
        <Box flex={1}>
          {!loading ?
            <>
              <Box flex={1}>
                <ToastTop ref={toastTopRef} />
                <KeyBoardSafe bg={theme.gray5} paddingBottom={0}>
                  <Header drawerRef={drawerRef} />
                  <Transaction toastTopRef={toastTopRef} />
                </KeyBoardSafe>
                <OpenCloseChart />
              </Box>
              <Drawer ref={drawerRef} />
            </> :
            <Box flex={1} alignCenter justifyCenter backgroundColor={theme.bg}>
              <LoadingYellow />
            </Box>
          }
        </Box>
        :
        <Login />
      }
    </>
  )
}

export default Futures
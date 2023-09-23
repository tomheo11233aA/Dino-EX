import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { delay } from '@method/alert'
import { HEIGHT_BOTTOM_TAB, styles } from '@navigation/Container'
import { useNavigation } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingYellow from '@reuse/LoadingYellow'
import Login from '@screen/Wallet/Login'
import { loadingFuturesSelector } from '@selector/futuresSelector'
import { isLoginUserSelector } from '@selector/userSelector'
import futuresSlice from '@slice/futuresSlice'
import { height } from '@util/responsive'
import React, { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import Drawer from './Drawer'
import Header from './Header'
import OpenCloseChart from './OpenCloseChart'
import Transaction from './Transaction'

const Futures = () => {
  const theme = useTheme()
  const drawerRef = useRef(null)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  
  const isLogin = useAppSelector(isLoginUserSelector)
  const loading = useAppSelector(loadingFuturesSelector)

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      dispatch(futuresSlice.actions.setLoading(true))
    }
  }

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
              <Box height={height - HEIGHT_BOTTOM_TAB}>
                <KeyBoardSafe bg={theme.gray5} paddingBottom={100}>
                  <Header drawerRef={drawerRef} />
                  <Transaction />
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
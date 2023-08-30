import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { delay } from '@method/alert'
import { HEIGHT_BOTTOM_TAB, styles } from '@navigation/Container'
import { useNavigation } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingYellow from '@reuse/LoadingYellow'
import ToastTop from '@reuse/ToastTop'
import Login from '@screen/Wallet/Login'
import { loadingSpotSelector } from '@selector/spotSelector'
import { isLoginUserSelector } from '@selector/userSelector'
import { setLoading } from '@slice/spotSlice'
import React, { useEffect, useRef } from 'react'
import Drawer from './Drawer'
import Header from './Header'
import OpenCloseChart from './OpenCloseChart'
import Transaction from './Transaction'
import { height } from '@util/responsive'
import ComingSoon from '@screen/ComingSoon'

const Trades = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const drawerRef = useRef(null)
  const toastTopRef = useRef(null)

  const isLogin = useAppSelector(isLoginUserSelector)
  const loading = useAppSelector(loadingSpotSelector)

  useEffect(() => {
    if (loading) {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
      delay(1000).then(() => dispatch(setLoading(false)))
    }
  }, [loading])

  return (
    // <>
    //   {isLogin ?
    //     <Box flex={1}>
    //       {!loading ?
    //         <>
    //           <Box height={height - HEIGHT_BOTTOM_TAB}>
    //             <ToastTop ref={toastTopRef} />
    //             <KeyBoardSafe bg={theme.gray5} paddingBottom={0}>
    //               <Header drawerRef={drawerRef} />
    //               <Transaction toastTopRef={toastTopRef} />
    //             </KeyBoardSafe>
    //             <OpenCloseChart />
    //           </Box>
    //           <Drawer ref={drawerRef} />
    //         </> :
    //         <Box flex={1} alignCenter justifyCenter backgroundColor={theme.bg}>
    //           <LoadingYellow />
    //         </Box>
    //       }
    //     </Box>
    //     :
    //     <Login />
    //   }
    // </>

    <ComingSoon />
  )
}

export default Trades
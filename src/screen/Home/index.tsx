import Box from '@commom/Box'
import { useAppSelector, useTheme } from '@hooks/index'
import { HEIGHT_BOTTOM_TAB, styles } from '@navigation/Container'
import { useNavigation } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { isLoginUserSelector } from '@selector/userSelector'
import React, { useEffect } from 'react'
import Balance from './Balance'
import Coins from './Coins'
import Funding from './Funding'
import Header from './Header'
import KYCStatus from './KYCStatus'
import Login from './Login'
import Options from './Options'
import TypeCoin from './TypeCoin'
import ComingSoon from '@screen/ComingSoon'

const Home = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const isLogin = useAppSelector(isLoginUserSelector)

  useEffect((): any => {
    const focus = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
    })

    return () => { focus }
  }, [theme])

  return (
    <KeyBoardSafe paddingBottom={HEIGHT_BOTTOM_TAB / 2}>
      <Box paddingHorizontal={15} paddingTop={10}>
        <Header />
        {!isLogin && <Login />}
        {isLogin && <Balance />}
        {/* <KYCStatus /> */}
        <Options />
        <Funding />
        <TypeCoin />
        <Coins />
      </Box>
    </KeyBoardSafe>
  )
}

export default Home
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
import Login from './Login'
import Options from './Options'
import TypeCoin from './TypeCoin'
import { StatusBar } from 'react-native'

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
    <KeyBoardSafe paddingBottom={100}>
      <StatusBar barStyle={theme.bg === 'white' ? 'dark-content' : 'light-content'} />
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
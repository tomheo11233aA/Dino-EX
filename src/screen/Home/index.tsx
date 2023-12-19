import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { styles } from '@navigation/Container'
import { useNavigation } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { isLoginUserSelector } from '@selector/userSelector'
import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import Balance from './Balance'
import Coins from './Coins'
import Funding from './Funding'
import Header from './Header'
import Login from './Login'
import Options from './Options'
import TypeCoin from './TypeCoin'
import { getValueConfig } from '@service/userService'
import contants from '@util/contants'
import { useTranslation } from 'react-i18next'
import { delay } from '@method/alert'
import LoadingYellow from '@reuse/LoadingYellow'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import KYCStatus from './KYCStatus'

const Home = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const isLogin = useAppSelector(isLoginUserSelector) // user đã login chưa

  const [refesh, setRefesh] = useState(false)

  useEffect((): any => {
    const focus = navigation.addListener('focus', () => {
      // Nếu màn hình được focus thì hiện bottom tab
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
    })

    return () => { focus }
  }, [theme])

  useEffect(() => {
    handleGetValueConfig()
  }, [])

  const handleGetValueConfig = async () => {
      // Lấy version app từ server
    const res = await getValueConfig('VERSIONAPP')
    if (res.status) {
      const versionCurren = res.data[0].data
      const versionInApp = contants.VERSION
      // Nếu versionInApp != versionCurren thì thông báo cho user cập nhật app
      if (versionCurren != versionInApp) {
        Alert.alert(t('You are using the old version, please update the application to the new version for the best experience.'))
      }
    } else {
      Alert.alert(t(res.message))
    }
  }

  // Refesh lại trang khi trượt scroll xuống
  const handleRefesh = async () => {
    setRefesh(true)
    dispatch(getProfileThunk())
    await delay(2000)
    setRefesh(false)
  }

  return (
    <>
      {refesh ?
        <Box flex={1} backgroundColor={theme.bg} alignCenter justifyCenter>
          <LoadingYellow />
        </Box>
        :
        <KeyBoardSafe
          refesh={refesh}
          onRefesh={handleRefesh}
          paddingBottom={100}
        >
          <StatusBar barStyle={theme.bg === 'white' ? 'dark-content' : 'light-content'} />
          <Box paddingHorizontal={15} paddingTop={10}>
            <Header />
            {!isLogin && <Login />}
            {isLogin && <Balance />}
            {isLogin && <KYCStatus />}
            <Options />
            <Funding />
            <TypeCoin />
            <Coins />
          </Box>
        </KeyBoardSafe>
      }
    </>
  )
}

export default Home
import Box from '@commom/Box'
import { useAppSelector, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import ToastTop from '@reuse/ToastTop'
import Earn from '@screen/Earn'
import Funding from '@screen/Funding'
import Future from '@screen/Future'
import Margin from '@screen/Margin'
import Overview from '@screen/Overview'
import Spot from '@screen/Spot'
import { isLoginUserSelector } from '@selector/userSelector'
import React, { useRef, useState } from 'react'
import Login from './Login'
import Tab from './Tab'
const Wallet = () => {
  const theme = useTheme()
  const toastTopRef = useRef(null)
  const [tab, setTab] = useState('Overview')
  const isLogin = useAppSelector(isLoginUserSelector)

  return (
    <>
      {!isLogin ?
        <Login /> :
        <Box flex={1}>
          <ToastTop ref={toastTopRef} />
          <KeyBoardSafe bg={theme.gray2} paddingBottom={0}>
            <Tab {...{ tab, setTab }} />
            <Box
              flex={1}
              backgroundColor={theme.bg}
              paddingTop={20}
              borderTopLeftRadius={30}
              borderTopRightRadius={30}
            >
              {tab === 'Overview' ?
                <Overview /> : tab === 'Spot' ?
                  <Spot /> : tab === 'Funding' ?
                    <Funding /> : tab === 'Margin' ?
                      <Margin /> : tab === 'Earn' ?
                        <Earn /> : <Future />
              }
            </Box>
          </KeyBoardSafe>
        </Box>
      }
    </>
  )
}

export default Wallet
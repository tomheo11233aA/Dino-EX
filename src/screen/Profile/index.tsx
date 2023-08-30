import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { hideBottomTab } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import BinancePro from './BinancePro'
import Header from './Header'
import Infomation from './Infomation'
import List from './List'
import Menu from './Menu'
import Referral from './Referral'
import { useTranslation } from 'react-i18next'
import ComingSoon from '@screen/ComingSoon'

const Profile = () => {
  const { t } = useTranslation()
  
  // hideBottomTab()

  return (
    // <KeyBoardSafe paddingBottom={20}>
    //   <Box paddingHorizontal={15}>
    //     <Header />
    //     <Infomation {...{ t }} />
    //     <Menu {...{ t }}/>
    //     <BinancePro />
    //     <Referral {...{ t }} />
    //     <List {...{ t }} />
    //     <Txt
    //       size={10}
    //       marginTop={30}
    //       fontFamily={fonts.SGM}
    //       color={colors.grayBlue2}
    //     >
    //      {t('Please do not disclose SMS and Google Authentication codes to anyone, including Binance customer support.')}
    //     </Txt>
    //   </Box>
    // </KeyBoardSafe>

    <ComingSoon />
  )
}

export default Profile
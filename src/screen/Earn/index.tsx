import { hideBottomTab, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Header from './Header'
import Box from '@commom/Box'
import Options from './Options'
import ListCoin from './ListCoin'
import { HEIGHT_BOTTOM_TAB } from '@navigation/Container'
import ComingSoon from '@screen/ComingSoon'

const Earn = () => {
  const theme = useTheme()

  return (
    // <KeyBoardSafe bg={theme.gray5} paddingBottom={HEIGHT_BOTTOM_TAB / 2}>
    //   <Header />
    //   <Box
    //     flex={1}
    //     marginTop={30}
    //     borderTopLeftRadius={20}
    //     borderTopRightRadius={20}
    //     backgroundColor={theme.bg}
    //   >
    //     <Options />
    //     <ListCoin />
    //   </Box>
    // </KeyBoardSafe>

    <ComingSoon />
  )
}

export default Earn
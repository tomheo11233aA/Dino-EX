import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { hideBottomTab, useAppSelector, useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { hotTraderCopyTradeSelector } from '@selector/copyTradeSelector'
import { profileUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Profile } from 'src/model/userModel'
import TPSL from './TPSL'
import Pair from './Pair'
import Leverage from './Leverage'

const CopyTrade = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const hotTrader = useAppSelector(hotTraderCopyTradeSelector)
  const profile: Profile = useAppSelector<any>(profileUserSelector)

  const [TP, setTP] = useState('')
  const [SL, setSL] = useState('')
  const [arraySymbol, setArrSymbol] = useState([])
  const [margin, setMargin] = useState('')

  hideBottomTab()

  return (
    <Box
      flex={1}
      backgroundColor={theme.bg}
    >
      <KeyBoardSafe paddingHorizontal={15}>
        <Box row justifySpaceBetween>
          <Back size={16} color={theme.black} />
          <Txt color={theme.black} fontFamily={fonts.IBMPM} size={16}>
            {`${t('Copy')} ${hotTrader.email}`}
          </Txt>
          <Txt></Txt>
        </Box>

        <Box marginTop={25}>
          <Txt color={theme.black} fontFamily={fonts.IBMPM}>
            {t('Copy by')}
          </Txt>
          <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={13} marginTop={10}>
            {t('Every trade')}
          </Txt>
        </Box>

        <Txt color={theme.black} fontFamily={fonts.IBMPM} marginTop={20}>
          {t('Margin Type')}
        </Txt>
        <Box
          radius={7}
          marginTop={10}
          borderWidth={1}
          paddingVertical={5}
          paddingHorizontal={15}
          alignSelf={'flex-start'}
          borderColor={colors.yellow}
        >
          <Txt color={colors.yellow} size={12}>USDT</Txt>
        </Box>

        <Txt fontFamily={fonts.IBMPM} color={theme.black} marginTop={25}>
          {t('Margin')}
        </Txt>
        <Input
          radius={7}
          height={40}
          marginTop={15}
          value={margin}
          borderWidth={1}
          font={fonts.M24}
          color={theme.black}
          paddingHorizontal={10}
          onChangeText={setMargin}
          keyboardType={'numeric'}
          borderColor={theme.gray2}
        />
        <Txt
          size={12}
          marginTop={10}
          color={colors.grayBlue}
          fontFamily={fonts.IBMPR}
        >
          {t('When a trader opens a trade, the estimated margin of your order is 2 USDT Std. Futures Account (Avail.)')}
          <Txt fontFamily={fonts.M23} color={theme.black}>
            {` ${profile.balance?.toFixed(2)}`}
            <Txt color={theme.black} size={12}>
              {' USDT'}
            </Txt>
          </Txt>
        </Txt>

        <TPSL {...{ theme, t, TP, SL, setTP, setSL }} />
        <Pair {...{ theme, t, arraySymbol, setArrSymbol }} />
        <Leverage {...{ theme, t }} />
      </KeyBoardSafe>
    </Box>
  )
}

export default CopyTrade
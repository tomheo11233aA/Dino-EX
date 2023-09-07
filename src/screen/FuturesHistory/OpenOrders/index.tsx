import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import DownItem from '../TransactionHistory/DownItem'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@hooks/index'
import Icon from '@commom/Icon'

const OpenOrders = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box>
      <Box row justifySpaceBetween>
        <Box
          row
          alignCenter
          marginTop={10}
        >
          <DownItem
            title={'Asset: '}
            value={'All'}
          />
          <DownItem
            title={'Type: '}
            value={'All'}
          />
        </Box>

        <Box
          radius={2}
          padding={3}
          marginTop={10}
          backgroundColor={theme.gray2}
        >
          <Txt color={theme.black} size={11} fontFamily={fonts.IBMPM}>
            {t('Cancel all')}
          </Txt>
        </Box>
      </Box>

      <Box alignCenter marginTop={100}>
        <Icon
          size={70}
          resizeMode={'contain'}
          source={require('@images/future/find.png')}
        />
        <Txt
          size={13}
          marginTop={20}
          fontFamily={fonts.IBMPR}
          color={colors.grayBlue}
        >
          {t('Not positions')}
        </Txt>
      </Box>
    </Box>
  )
}

export default OpenOrders
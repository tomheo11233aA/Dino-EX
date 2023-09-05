import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Time = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const times = ['1 day', '1 week', '1 month', '3 month']

  return (
    <Box>
      <Txt color={colors.grayBlue} size={15} fontFamily={fonts.SGM}>
        Time
      </Txt>
      <Box
        row
        marginTop={10}
        borderTopWidth={1}
        justifySpaceBetween
        paddingVertical={15}
        borderColor={theme.gray2}
      >
        {times.map((time) =>
          <Box
            key={time}
            alignCenter
            width={'23%'}
            paddingVertical={3}
            paddingHorizontal={7}
            backgroundColor={theme.gray2}
          >
            <Txt
              fontFamily={fonts.IBMPM}
              color={colors.grayBlue}
            >
              {time}
            </Txt>
          </Box>
        )}
      </Box>

      <Box row alignCenter justifySpaceBetween>
        <Box
          radius={3}
          paddingVertical={10}
          paddingHorizontal={30}
          backgroundColor={theme.gray2}
        >
          <Txt color={theme.black} fontFamily={fonts.M24} size={16}>
            2023-06-02
          </Txt>
        </Box>
        <Box>
          <Txt color={theme.black}>{t('to')}</Txt>
        </Box>
        <Box
          radius={3}
          paddingVertical={10}
          paddingHorizontal={30}
          backgroundColor={theme.gray2}
        >
          <Txt color={theme.black} fontFamily={fonts.M24} size={16}>
            2023-08-31
          </Txt>
        </Box>
      </Box>

      <Txt color={colors.grayBlue} marginVertical={20} size={13}>
        {t('The system only displays transaction history within the past 3 months. For more data, go to the web and export the report.')}
      </Txt>
    </Box>
  )
}

export default Time
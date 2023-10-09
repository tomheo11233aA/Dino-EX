import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import TabTradingData from './TabTradingData'

const TransactionData = ({ theme, t }: any) => {
  const [tabChoosed, setTabChoosed] = useState('Trading data')
  const tabs = ['Trading data', 'Position', 'Copiers']

  return (
    <Box paddingHorizontal={15} marginTop={20}>
      <Box row borderBottomWidth={1} borderColor={theme.gray2}>
        {tabs.map((tab) =>
          <Btn
            key={tab}
            marginRight={20}
            justifySpaceBetween
          >
            <Txt
              marginVertical={10}
              fontFamily={fonts.IBMPM}
              color={tabChoosed == tab ? theme.black : colors.grayBlue}
            >
              {t(tab)}
            </Txt>
            {tabChoosed == tab &&
              <Box width={'100%'} height={2} backgroundColor={theme.black} marginBottom={-1} />
            }
          </Btn>
        )}
      </Box>

      <TabTradingData {...{ theme, t }} />
    </Box>
  )
}

export default TransactionData
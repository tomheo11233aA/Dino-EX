import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'

const TransactionData = ({ theme, t }: any) => {
  const [tabChoosed, setTabChoosed] = useState('Trading data')
  const tabs = ['Trading data', 'Position', 'Copiers']

  return (
    <Box paddingHorizontal={15} marginTop={20}>
      <Box row borderBottomWidth={1} borderColor={theme.gray2}>
        {tabs.map((tab) =>
          <Box marginRight={20} height={30} justifySpaceBetween>
            <Txt
              fontFamily={fonts.IBMPM}
              color={tabChoosed == tab ? theme.black : colors.grayBlue}
            >
              {t(tab)}
            </Txt>
            {tabChoosed == tab &&
              <Box width={'100%'} height={2} backgroundColor={theme.black} marginBottom={-1} />
            }
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TransactionData
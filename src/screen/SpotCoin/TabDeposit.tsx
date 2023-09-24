import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@hooks/index'
import { historyDeposit } from 'src/model/walletModel'
import { getDepositBalance } from '@service/walletService'
import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import ItemWithdrawHistory from '@screen/ChangeBalanceHistory/ItemWithdrawHistory'

const TabDeposit = () => {
  const theme = useTheme()
  const [historyDeposits, setHistoryDeposit] = useState<historyDeposit[]>([])

  useEffect(() => {
      handleGetDepositBalance()
  }, [])

  const handleGetDepositBalance = async () => {
      const res = await getDepositBalance({ limit: 1000, page: 1 })
      if (res.status) {
          setHistoryDeposit(res.data.array)
      }
  }

  return (
    <Box maxHeight={400} marginTop={10}>
      <Scroll nestedScrollEnabled={true} paddingBottom={20}>
        {historyDeposits.map((item, index) =>
          <ItemWithdrawHistory
            theme={theme}
            item={item}
            key={item.id}
          />
        )}
      </Scroll>
    </Box>
  )
}

export default TabDeposit
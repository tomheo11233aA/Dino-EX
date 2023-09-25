import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { useTheme } from '@hooks/index'
import ItemDepositHistory from '@screen/ChangeBalanceHistory/ItemDepositHistory'
import { getHistoryDeposit } from '@service/walletService'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { historyDeposit } from 'src/model/walletModel'

const TabDeposit = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [historyDeposits, setHistoryDeposit] = useState<historyDeposit[]>([])

  useEffect(() => {
    handleGetHistoryDeposit()
  }, [])

  const handleGetHistoryDeposit = async () => {
    const res = await getHistoryDeposit({ limit: 1000, page: 1 })
    if (res.status) {
      setHistoryDeposit(res.data.array)
    }
  }

  return (
    <Box maxHeight={400} marginTop={10}>
      <Scroll nestedScrollEnabled={true} paddingBottom={20}>
        {historyDeposits.map((item, index) =>
          <ItemDepositHistory
            t={t}
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
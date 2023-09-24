import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Box from '@commom/Box'
import History from '@screen/ChangeBalanceHistory/History'
import { getHistoryWidthdraw } from '@service/fundingService'
import { useTheme } from '@hooks/index'
import { historyWithdraw } from 'src/model/walletModel'
import ItemWithdrawHistory from '@screen/ChangeBalanceHistory/ItemWithdrawHistory'
import Scroll from '@commom/Scroll'

const TabWithdraw = () => {
    const theme = useTheme()
    const [historyWithdraws, setHistoryWithdraw] = useState<historyWithdraw[]>([])

    useEffect(() => {
        handleGetHistoryWidthdraw()
    }, [])

    const handleGetHistoryWidthdraw = async () => {
        const res = await getHistoryWidthdraw({
            limit: 1000,
            page: 1,
        })
        if (res.status) {
            setHistoryWithdraw(res.data.array)
        }
    }

    return (
        <Box maxHeight={400}>
            <Scroll nestedScrollEnabled={true} paddingBottom={20}>
                {historyWithdraws.map((item, index) =>
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

export default TabWithdraw
import Box from '@commom/Box'
import { getChartStatisticsUser } from '@service/walletService'
import React, { useEffect, useState } from 'react'
import ChartPNl from './ChartPNl'

const PNLEveryDay = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        handleGetChartStatisticsUser()
    }, [])

    const handleGetChartStatisticsUser = async () => {
        const res = await getChartStatisticsUser()
        const array = res.data

        const max = Math.max.apply(Math, array.map((item: any) => item.PnL))
        const min = Math.min.apply(Math, array.map((item: any) => item.PnL))

        const dataDate = array.map((item: any) => item.created_at)
        const lineYellow = array.map((item: any) => item.PnL)

        setData({
            ...data,
            indexColumn: {
                max,
                min,
                total: 5,
                fixed: 2,
            },
            indexRow: {
                total: 4,
                data: dataDate
            },
            lineYellow,
        })
    }

    return (
        <Box>
            {data &&
                <ChartPNl
                    title={'PNL every day'}
                    indexColunm={data.indexColumn}
                    lineYellow={data.lineYellow}
                    indexRow={data.indexRow}
                />
            }
        </Box>
    )
}

export default PNLEveryDay
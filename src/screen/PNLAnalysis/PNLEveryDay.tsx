import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Box from '@commom/Box'
import { pnls } from '@util/db'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import ChartPNl from './ChartPNl'
import { getChartStatisticsUser } from '@service/walletService'
import { getDateMD } from '@method/date'

const PNLEveryDay = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        handleGetChartStatisticsUser()
    }, [])

    const handleGetChartStatisticsUser = async () => {
        const res = await getChartStatisticsUser()
        const array = pnls

        const max = Math.max.apply(Math, array.map((item: any) => item.PnL))
        const min = Math.min.apply(Math, array.map((item: any) => item.PnL))

        const dataDate = pnls.map((item) => getDateMD(item.created_at))

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
            }
        })
    }

    return (
        <Box>
            <Txt color={theme.black} marginTop={20} fontFamily={fonts.IBMPM}>
                {t('PNL hằng ngày')}
            </Txt>
            <Txt color={colors.grayBlue} fontFamily={fonts.M23} marginTop={10}>
                {'2023-09-22'}
            </Txt>
            <Txt color={theme.black} fontFamily={fonts.M24} marginTop={5} size={15}>
                {'0,00'}
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                    {' USDT'}
                </Txt>
            </Txt>

            {data &&
                <ChartPNl
                    indexColunm={data.indexColumn}
                    lineYellow={pnls.map((item) => item.PnL)}
                    indexRow={data.indexRow}
                />}
        </Box>
    )
}

export default PNLEveryDay
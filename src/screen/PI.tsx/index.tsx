import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { db } from '@util/db'
import React, { useEffect, useState } from 'react'
import PiChart from './PiChart'
import { getChart } from '@service/tradeService'
import { setChartPI, setChartPISocket } from '@slice/piSlice'
import { RootState } from 'src/redux/store'
import { io } from 'socket.io-client'
import contants from '@util/contants'
import { ICoins } from 'src/model/futuresModel'
import { Button } from 'react-native'

export const LENGHT_CHART = 20

const PI = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [data, setData] = useState<any>(db)

    const chart = useAppSelector((state: RootState) => state.pi.chart)

    useEffect((): any => {
        handleGetChart()

        const newSocket = io(contants.HOSTING)

        let close = 0
        newSocket.on('listCoin', (coins: ICoins[]) => {
            if (coins.length > 0) {
                for (let i = 0; i < coins.length; i++) {
                    if (coins[i].symbol === 'BTCUSDT') {
                        close = coins[i].close
                        dispatch(setChartPISocket(close))
                        break
                    }
                }
            }
        })

        return () => newSocket.disconnect()
    }, [])

    const handleGetChart = async () => {
        let time = 1 * 60
        const res = await getChart({
            limit: 500,
            symbol: 'BTCUSDT',
            time: time,
        })
        if (res.status) {
            dispatch(setChartPI(res.data.array))
        }
    }

    return (
        <KeyBoardSafe>
            <PiChart
                data={chart}
                theme={theme}
            />
            <Button
                title={'push high'}
                onPress={() => setData([...data, { close: 150, open: 50, high: 150, low: 50  }])}
            />
        </KeyBoardSafe>
    )
}

export default PI
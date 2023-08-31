import Box from '@commom/Box'
import React from 'react'
import DownItem from './DownItem'
import Item from './Item'
import { useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'

const TransactionHistory = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const data = [
        {
            symbol: 'USDT',
            amount: '-0,00379999',
            code: 'BTCUSDT perpetual',
            date: '2023-05-16 13:56:57',
            type: 'PNL HAS BEEN NOTIFIED',
        },
        {
            symbol: 'USDT',
            amount: '0,00379999',
            code: 'BTCUSDT perpetual',
            date: '2023-05-16 13:56:57',
            type: 'PNL HAS BEEN NOTIFIED',
        },
        {
            symbol: 'USDT',
            amount: '0,00379999',
            code: 'BTCUSDT perpetual',
            date: '2023-05-16 13:56:57',
            type: 'PNL HAS BEEN NOTIFIED',
        },
    ]

    return (
        <Box>
            <Box row alignCenter marginTop={10}>
                <DownItem
                    title={'Asset: '}
                    value={'All'}
                />
                <DownItem
                    title={'Type: '}
                    value={'All'}
                />
            </Box>
            {data.map((item) =>
                <Item
                    t={t}
                    item={item}
                    theme={theme}
                    key={Math.random()}
                />
            )}
        </Box>
    )
}

export default TransactionHistory
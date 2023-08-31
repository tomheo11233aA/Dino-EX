import { getPositionThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { positionFuturesSelector, positionsFuturesSelector, stopProfitFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import React, { useEffect, useState } from 'react'
import ModalClosePosition from './ModalClosePosition'
import ModalCorePosition from './ModalCorePosition'
import OpenOrders from './OpenOrders'
import Positions from './Positions'
import TabHistory from './TabHistory'
import ModalStopFrofit from './ModalStopFrofit'

const History = () => {
    const dispatch = useAppDispatch()
    const [tab, setTab] = useState<'open' | 'position'>('open')

    const profile = useAppSelector(profileUserSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const position = useAppSelector(positionFuturesSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const stopProfit = useAppSelector(stopProfitFuturesSelector)

    useEffect(() => {
        handleGetPosition()
    }, [profile])

    const handleGetPosition = async () => {
        await dispatch(getPositionThunk(symbol))
    }

    return (
        <Box marginTop={30} flex={1}>
            <TabHistory {...{ tab, setTab, positions }} />
            {tab === 'open' ?
                <OpenOrders /> :
                <Positions {...{ positions }} />
            }
            <ModalClosePosition
                show={position !== null}
                setShow={() => { }}
            />
            <ModalCorePosition />
            <ModalStopFrofit
                show={stopProfit.showModal}
                setShow={() => { }}
            />
        </Box>
    )
}

export default History
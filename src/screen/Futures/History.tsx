import { getPositionThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { positionFuturesSelector, positionsFuturesSelector, stopProfitFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import React, { useEffect, useState } from 'react'
import ModalClosePosition from './ModalClosePosition'
import ModalCorePosition from './ModalCorePosition'
import ModalStopFrofit from './ModalStopFrofit'
import OpenOrders from './OpenOrders'
import Positions from './Positions'
import TabHistory from './TabHistory'
import { openOrdersFundingSelector } from '@selector/fundingSelector'
import { getHistoryOpenOrderAllThunk } from '@asyncThunk/fundingAsyncThunk'
import { io } from 'socket.io-client'
import contants from '@util/contants'
import { Profile } from 'src/model/userModel'

const History = () => {
    const dispatch = useAppDispatch()
    const [tab, setTab] = useState<'open' | 'position'>('open')

    const symbol = useAppSelector(symbolFuturesSelector)
    const position = useAppSelector(positionFuturesSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const stopProfit = useAppSelector(stopProfitFuturesSelector)
    const openOrders = useAppSelector(openOrdersFundingSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect((): any => {
        handleGetPosition()
    }, [profile])

    const handleGetPosition = async () => {
        await dispatch(getPositionThunk(symbol))
        await dispatch(getHistoryOpenOrderAllThunk({
            page: 1,
            limit: 1000,
        }))
    }

    return (
        <Box marginTop={30} flex={1}>
            <TabHistory {...{ tab, setTab, positions, openOrders }} />
            {tab === 'open' ?
                <OpenOrders {...{ openOrders }} /> :
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
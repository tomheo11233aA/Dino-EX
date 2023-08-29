import { getPositionThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { positionFuturesSelector, positionsFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import React, { useEffect, useState } from 'react'
import ModalClosePosition from './ModalClosePosition'
import ModalCorePosition from './ModalCorePosition'
import OpenOrders from './OpenOrders'
import Positions from './Positions'
import TabHistory from './TabHistory'

const History = () => {
    const dispatch = useAppDispatch()
    const [tab, setTab] = useState<'open' | 'position'>('open')
    const positions = useAppSelector(positionsFuturesSelector)
    const position = useAppSelector(positionFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const profile = useAppSelector(profileUserSelector)

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
        </Box>
    )
}

export default History
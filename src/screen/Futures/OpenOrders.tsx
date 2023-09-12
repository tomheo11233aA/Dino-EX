import { getHistoryOpenOrderAllThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import NotPosition from '@reuse/NotPosition'
import { openOrdersFundingSelector } from '@selector/fundingSelector'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ItemOpenOrder from './ItemOpenOrder'

const OpenOrders = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const openOrders = useAppSelector(openOrdersFundingSelector)

    useEffect(() => {
        getHistoryOpenOrderAll()
    }, [])

    const getHistoryOpenOrderAll = async () => {
        dispatch(getHistoryOpenOrderAllThunk({
            limit: 100,
            page: 1,
        }))
    }

    return (
        <>
            {openOrders.data.length === 0 ?
                <NotPosition /> :
                <>
                    <Box row alignCenter justifySpaceBetween marginTop={10}>
                        <Box row alignCenter>
                            <Box
                                width={14}
                                height={14}
                                radius={50}
                                borderWidth={1}
                                marginRight={10}
                                borderColor={theme.gray7}
                                backgroundColor={theme.gray2}
                            />
                            <Txt color={theme.black}>{t('Hide Other Symbols')}</Txt>
                        </Box>
                        <Btn
                            paddingVertical={7}
                            backgroundColor={theme.gray2}
                            radius={3}
                            paddingHorizontal={10}
                        >
                            <Txt size={12} fontFamily={fonts.SGM} color={theme.black}>
                                {t('Close All')}
                            </Txt>
                        </Btn>
                    </Box>
                    {openOrders.data.map((item) =>
                        <ItemOpenOrder
                            t={t}
                            item={item}
                            theme={theme}
                            key={item.id}
                        />
                    )}
                </>
            }
        </>
    )
}

export default OpenOrders
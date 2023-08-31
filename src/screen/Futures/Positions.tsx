import { closeMarketFutureAllThunk, closeMarketFutureThunk } from '@asyncThunk/futuresAsyncThunk'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import NotPosition from '@reuse/NotPosition'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import futuresSlice from '@slice/futuresSlice'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { IPositions } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'
import ItemPosition from './ItemPosition'

interface Props {
    positions: IPositions[];
}

const Positions = ({ positions }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const handleClosePosition = async (id: number) => {
        const { payload } = await dispatch(closeMarketFutureThunk(id))
        if (payload.status) {
            await dispatch(getProfileThunk())
        }
    }

    const handleCloseAll = async () => {
        const { payload } = await dispatch(closeMarketFutureAllThunk())
        if (payload.status) {
            await dispatch(getProfileThunk())
        }
    }

    const handleSetClosePosition = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setPosition(position))
    }

    const handleSetShowModalCore = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setLeverAdjustment({
            showModal: true,
            core: position.core,
            idPosition: position.id,
        }))
    }

    const handleShowModalStopProfit = async () => {
        dispatch(futuresSlice.actions.setStopProfit({
            showModal: true,
        }))
    }

    return (
        <>
            {positions.length > 0 ?
                <Box>
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
                            onPress={handleCloseAll}
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
                    <ScrollView
                        contentContainerStyle={{ 
                            backgroundColor: theme.bg,
                        }}
                    >
                        {positions.map((item: IPositions) =>
                            <ItemPosition
                                t={t}
                                key={item.id}
                                item={item}
                                coins={coins}
                                theme={theme}
                                profile={profile}
                                onClosePosition={handleClosePosition}
                                onSetClosePosition={handleSetClosePosition}
                                onSetShowModalCore={handleSetShowModalCore}
                                onShowModalStopProfit={handleShowModalStopProfit}
                            />
                        )}
                    </ScrollView>
                </Box>
                :
                <NotPosition />
            }
        </>
    )
}

export default Positions


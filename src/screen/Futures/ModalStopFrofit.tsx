import Box from '@commom/Box';
import { useAppDispatch, useTheme } from '@hooks/index';
import Modality from '@reuse/Modality';
import { height, width } from '@util/responsive';
import React, { useEffect, useState } from 'react';
import CloseStopProfit from './CloseStopProfit';
import { useTranslation } from 'react-i18next';
import OpenStopProfit from './OpenStopProfit';
import { Pressable } from 'react-native';
import futuresSlice from '@slice/futuresSlice';
import TakeProfit from './TakeProfit';
import StopLoss from './StopLoss';
import { ITpslPosition } from 'src/model/futuresModel';

interface Props {
    stopProfit: ITpslPosition
}

const RADIUS_CONTENT = 10

const ModalStopFrofit = ({ stopProfit }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [tp, setTP] = useState<any>({ value: '', type: 'Mark', down: false })
    const [sl, setSL] = useState<any>({ value: '', type: 'Mark', down: false })

    const position = stopProfit.position
    
    useEffect(() => {
        if (position?.amountPnL_TP) {
            setTP({ value: position.TP, type: position?.triggerTP })
        }
        if (position?.amountPnL_SL) {
            setSL({ value: position.SL, type: position?.triggerSL })
        }
    }, [])

    return (
        <Modality
            show={stopProfit.showModal}
        >
            <Pressable onPress={() =>
                dispatch(futuresSlice.actions.setStopProfit({
                    ...stopProfit,
                    showModal: false,
                }))
            }
            >
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                width={width}
                paddingTop={10}
                paddingBottom={50}
                paddingHorizontal={15}
                backgroundColor={theme.bg}
                borderTopLeftRadius={RADIUS_CONTENT}
                borderTopRightRadius={RADIUS_CONTENT}
            >
                <CloseStopProfit  {...{ dispatch, theme, t }} />
                <OpenStopProfit {...{ theme, t }} />
                <TakeProfit {...{ theme, t, tp, setTP, position }} />
                <StopLoss  {...{ theme, t, sl, setSL, position }} />
            </Box>
        </Modality>
    )
}

export default ModalStopFrofit
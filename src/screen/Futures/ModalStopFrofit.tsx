import Box from '@commom/Box';
import { useAppDispatch, useTheme } from '@hooks/index';
import Modality from '@reuse/Modality';
import { height, width } from '@util/responsive';
import React from 'react';
import CloseStopProfit from './CloseStopProfit';
import { useTranslation } from 'react-i18next';
import OpenStopProfit from './OpenStopProfit';
import { Pressable } from 'react-native';
import futuresSlice from '@slice/futuresSlice';
import TakeProfit from './TakeProfit';
import StopLoss from './StopLoss';

interface Props {
    show: boolean;
    setShow: Function;
}

const RADIUS_CONTENT = 10

const ModalStopFrofit = ({ show = true, setShow }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Pressable onPress={() =>
                dispatch(futuresSlice.actions.setStopProfit({
                    showModal: false,
                }))
            }
            >
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                backgroundColor={theme.bg}
                absolute
                width={width}
                bottom={0}
                paddingBottom={50}
                borderTopLeftRadius={RADIUS_CONTENT}
                borderTopRightRadius={RADIUS_CONTENT}
                paddingTop={10}
                paddingHorizontal={15}
            >
                <CloseStopProfit  {...{ dispatch, theme, t }} />
                <OpenStopProfit {...{ theme, t }} />
                <TakeProfit {...{ theme, t }} />
                <StopLoss  {...{ theme, t }} />
            </Box>
        </Modality>
    )
}

export default ModalStopFrofit
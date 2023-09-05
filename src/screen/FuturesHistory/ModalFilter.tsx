import Box from '@commom/Box';
import { useAppDispatch, useTheme } from '@hooks/index';
import Modality from '@reuse/Modality';
import { height, width } from '@util/responsive';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseModalFilter from './CloseModalFilter';
import { Pressable } from 'react-native';
import Time from './Time';
import Status from './Status';
import Side from './Side';

interface Props {
    show: boolean;
    setShow: Function;
}

const RADIUS_CONTENT = 10

const ModalFilter = ({ show = true, setShow }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Pressable onPress={() => setShow(false)}>
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
                <CloseModalFilter setShow={setShow} />
                <Time />
                <Status />
                <Side />
            </Box>
        </Modality>
    )
}

export default ModalFilter
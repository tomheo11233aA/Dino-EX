import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Box from '@commom/Box'
import { fonts } from '@theme/fonts'
import Txt from '@commom/Txt'
import Slider from './Slider'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'

const Leverage = ({ theme, t }: any) => {
    const [show, setShow] = useState(false)
    const [core, setCore] = useState(0)
    console.log('core: ', core)
    return (
        <Box
            marginTop={20}
            borderTopWidth={1}
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Btn
                row
                justifySpaceBetween
                onPress={() => setShow(!show)}
            >
                <Txt color={theme.black} fontFamily={fonts.AS}>
                    {t('Leverage')}
                </Txt>
                <Box rotateZ={show ? '-90deg' : '90deg'}>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/wallet/right_arrow.png')}
                    />
                </Box>
            </Btn>
            {show &&
                <Slider {...{ core, setCore }} />
            }
        </Box>
    )
}

export default Leverage
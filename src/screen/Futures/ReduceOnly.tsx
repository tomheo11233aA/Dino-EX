import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import BoxLine from '@reuse/BoxLine'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'

interface Props {
    t: any;
    theme: any;
    setType: Function;
    type: '' | 'TPSL' | 'RO';
}

const ReduceOnly = ({
    t,
    type,
    theme,
    setType,
}: Props) => {
    return (
        <Box>
            <Btn
                onPress={() => setType(type !== 'RO' ? 'RO' : '')}
                row
                alignEnd
                marginBottom={10}
                alignSelf={'flex-start'}
            >
                {type === 'RO' ?
                    <Box
                        width={12}
                        height={12}
                        radius={50}
                        borderColor={theme.gray6}
                        marginRight={7}
                        alignCenter
                        justifyCenter
                        backgroundColor={colors.yellow}
                    >
                        <Txt size={10} color={colors.white}>✓</Txt>
                    </Box>
                    :
                    <Box
                        width={12}
                        height={12}
                        backgroundColor={theme.gray3}
                        radius={50}
                        borderWidth={1}
                        borderColor={theme.gray6}
                        marginRight={7}
                    />
                }

                <BoxLine title={t('Reduce Only')} />
            </Btn>
        </Box>
    )
}

export default ReduceOnly
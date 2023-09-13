import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import BoxLine from '@reuse/BoxLine'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    type: '' | 'TPSL' | 'RO';
    setType: Function;
    theme: any
}

const TPSL = ({ type, setType, theme }: Props) => {
    const { t } = useTranslation()
    return (
        <Box>
            <Box row justifySpaceBetween>
                <Btn
                    onPress={() => setType((type === 'RO' || type === '') ? 'TPSL' : '')}
                    row
                    alignEnd
                    marginBottom={10}
                    alignSelf={'flex-start'}
                >
                    {type === 'TPSL' ?
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

                    <BoxLine title={'TP/SL'} />
                </Btn>
                {type === 'TPSL' && <Txt color={colors.yellowBold} size={12} fontFamily={fonts.RM}>{t('Advanced')}</Txt>}
            </Box>

            {type === 'TPSL' &&
                <Box row marginBottom={10}>
                    <Btn
                        flex={1}
                        radius={3}
                        height={40}
                        backgroundColor={theme.gray2}
                    >
                        <Txt color={colors.gray2} fontFamily={fonts.RM}>{t('Take Profit')}</Txt>
                    </Btn>
                    <Btn
                        flex={1}
                        backgroundColor={theme.gray2}
                        marginLeft={7}
                        radius={3}
                    >
                        <Txt color={colors.gray2} fontFamily={fonts.RM}>{t('Stop Loss')}</Txt>
                    </Btn>
                </Box>
            }
        </Box>
    )
}

export default TPSL
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IPositions } from 'src/model/futuresModel'

interface Props {
    tab: 'open' | 'position',
    setTab: Function,
    positions: IPositions[]
}

const TabHistory = ({ tab, setTab, positions }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box>
            <Box row justifySpaceBetween alignCenter>
                <Box row alignStart>
                    <Btn
                        onPress={() => setTab('open')}
                        alignCenter
                        marginRight={20}
                    >
                        <Txt
                            color={tab === 'open' ? theme.black : colors.gray5}
                        >
                            {t(`${t('Open orders')} (0)`)}
                        </Txt>
                        {tab === 'open' && <Box width={18} height={3} backgroundColor={colors.yellow} marginTop={10} />}
                    </Btn>

                    <Btn
                        alignCenter
                        onPress={() => setTab('position')}
                    >
                        <Txt
                            color={tab === 'position' ? theme.black : colors.gray5}
                        >
                            {t(`${t('Positions')} (${positions.length})`)}
                        </Txt>
                        {tab === 'position' && <Box width={18} height={3} backgroundColor={colors.yellow} marginTop={10} />}
                    </Btn>
                </Box>

                <Icon
                    source={require('@images/future/page.png')}
                    size={15}
                    resizeMode={'contain'}
                />
            </Box>
            <Box width={width} height={0.5} marginLeft={-15} backgroundColor={theme.gray2} />
        </Box>
    )
}

export default TabHistory
import { hideBottomTab, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Header from './Header'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import Parent from './Parent'
import Item from './Item'
import Icon from '@commom/Icon'
import { width } from '@util/responsive'
import Safe from '@reuse/Safe'
import Btn from '@commom/Btn'
import { useRoute } from '@react-navigation/native'

const TPSL = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const route = useRoute<any>()
    const { itemOpenOrder } = route.params

    hideBottomTab()

    const data: any = [
        {
            side: 'Buy',
            symbol: 'USDT',
            amount: '160,0',
            price: '32000,0',
            status: 'Pending',
            title: 'Take Profit Market',
        },
        {
            side: 'Sell',
            symbol: 'USDT',
            amount: '160,0',
            price: '32000,0',
            status: 'Pending',
            title: 'Stop Market',
        },
    ]

    return (
        <Safe bg={theme.bg} paddingHorizontal={15}>
            <Box flex={1}>
                <Header />
                <Parent {...{ itemOpenOrder }} />
                <Box
                    alignEnd
                    width={'95%'}
                    borderLeftWidth={4}
                    alignSelf={'flex-end'}
                    borderColor={theme.gray2}
                >
                    {
                        data.map((item: any, index: number) =>
                            <Item
                                t={t}
                                data={data}
                                item={item}
                                index={index}
                                theme={theme}
                                key={Math.random()}
                            />
                        )
                    }
                </Box>

                <Box row marginTop={width * 25 / 100}>
                    <Icon
                        size={11}
                        marginTop={3}
                        tintColor={colors.grayBlue}
                        source={require('@images/future/info2.png')}
                    />
                    <Box paddingLeft={10} flex={1}>
                        <Txt color={colors.grayBlue} size={11} fontFamily={fonts.IBMPR}>
                            {t('The One-Triggers-a One Cancels the-Other (OTOCO) order allows you to place two orders - one primary and two secondary orders - at the same time.')}
                        </Txt>
                    </Box>
                </Box>
            </Box>

            <Btn backgroundColor={colors.yellow} paddingVertical={10} radius={3}>
                <Txt fontFamily={fonts.IBMPM}>{t('Confirm')}</Txt>
            </Btn>
        </Safe>
    )
}

export default TPSL
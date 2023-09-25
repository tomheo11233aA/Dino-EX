import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import { chartStatisticsUserSelector } from '@selector/fundingSelector'
import { getChartStatisticsUser } from '@service/walletService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

const MILLISECOND_30DAY = 2_592_000_000
const MILISECOND_1DAY = 86_400_000

const Header = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const chartStatisticsUser = useAppSelector(chartStatisticsUserSelector)

    useEffect(() => {
        handleGetChartStatisticsUser()
    }, [])

    const handleGetChartStatisticsUser = async () => {
        const currentDate = new Date()
        const end = currentDate.getTime()
        const start = end - MILLISECOND_30DAY
        
        const res = await getChartStatisticsUser({
            start,
            end,
        })
        console.log('res: ', res.data)
        if (!res.status) {
            Alert.alert(t(res.message))
        }
    }

    return (
        <Box
            borderBottomWidth={4}
            paddingBottom={25}
            paddingHorizontal={15}
            borderColor={theme.gray}
        >
            <Box row justifySpaceBetween alignCenter>
                <Back size={14} />
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={15}>
                    {t('Analysis of PNL futures contracts')}
                </Txt>
                <Icon
                    size={13}
                    source={require('@images/future/share.png')}
                />
            </Box>

            {/* <Animated.View
                style={{
                    padding: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    backgroundColor: theme.gray2,
                    overflow: 'hidden',
                    borderRadius: 3,
                    marginTop: 20,
                }}
            >
                <Box
                    paddingVertical={5}
                    paddingHorizontal={10}
                    backgroundColor={theme.bg}
                >
                    <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                        USDⓢ-M
                    </Txt>
                </Box>
                <Box
                    paddingVertical={5}
                    paddingHorizontal={10}
                >
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={13}>
                        COIN-M
                    </Txt>
                </Box>
            </Animated.View> */}

            <Box alignCenter={'center'} marginTop={30}>
                <Box row alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t(`Today's PNL`)}
                    </Txt>
                    <Icon
                        size={12}
                        marginLeft={5}
                        source={require('@images/login/view.png')}
                    />
                </Box>
                <Txt color={theme.black} fontFamily={fonts.M24} marginTop={7} size={16}>
                    {'0,00%'}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7}>
                    {'0,00'}
                    <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                        {' USDT'}
                    </Txt>
                </Txt>
            </Box>

            <Box row marginTop={20}>
                <Box flex={1} alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t(`PNL for 7 days`)}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M24} marginTop={7} size={16}>
                        {'0,00%'}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7}>
                        {'0,00'}
                        <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                            {' USDT'}
                        </Txt>
                    </Txt>
                </Box>

                <Box flex={1} alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t(`PNL for 30 days`)}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M24} marginTop={7} size={16}>
                        {'0,00%'}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7}>
                        {'0,00'}
                        <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                            {' USDT'}
                        </Txt>
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Header
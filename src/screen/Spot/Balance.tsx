import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import userSlice from '@slice/userSlice'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import { ISpot, numberCommasDot, numberWithCommas } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { profileUserSelector, showBalanceSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'
import { symbolFuturesSelector } from '@selector/futuresSelector'
import { Coin } from 'src/model/tradeModel'
import { ICoins, IPositions } from 'src/model/futuresModel'
import { useTranslation } from 'react-i18next'
import { getPosition } from '@service/futureService'
import tradeSlice from '@slice/tradeSlice'
import { io } from 'socket.io-client'
import { getListCoin } from '@service/tradeService'
import contants from '@util/contants'
import { screen } from '@util/screens'

interface Props {
    spot: ISpot;
}

const Balance = ({ spot }: Props) => {
    const theme = useTheme()
    const showBalance = useAppSelector(showBalanceSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const [coins, setCoins] = useState<Coin[]>([])
    const [position, setPosition] = useState<IPositions[] | null>()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        handleGetPosition()
        handleGetListCoin()
    }, [profile])

    const handleGetListCoin = async () => {
        const res = await getListCoin()
        if (res.status) {
            setCoins(res.data)
        }
    }

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', data => {
            setCoins(data)
        })

        return () => newSocket.disconnect()
    }, [])

    const handleGetPosition = async () => {
        const res = await getPosition(symbol)
        if (res.status) {
            setPosition(res.data)
            dispatch(tradeSlice.actions.setPositions(1))
        } else {
            setPosition(null)
            dispatch(tradeSlice.actions.setPositions(0))
        }
    }

    let PNL: number = 0
    let ROE: number = 0
    if (coins.length > 0) {
        if (position) {
            let index = coins.findIndex((coin: ICoins) => coin.symbol === position[0].symbol)
            index = index < 0 ? 0 : index
            if (position[0].side === 'buy') {
                PNL = (coins[index].close - position[0].entryPrice) * position[0].amountCoin
            } else {
                PNL = (position[0].entryPrice - coins[index].close) * position[0].amountCoin
            }
            ROE = PNL / position[0].margin * 100
        }
    }

    const color = PNL >= 0 ? colors.green2 : colors.red3

    return (
        <Box paddingHorizontal={20}>
            <Box row alignCenter justifySpaceBetween>
                <Box row alignCenter>
                    <Txt fontFamily={fonts.IBMPR} size={12} color={theme.black}>
                        {t(`${t('Total Balance')} (BTC)    `)}
                    </Txt>
                    <Btn onPress={() => dispatch(userSlice.actions.setShowBalance(!showBalance))}>
                        <Icon
                            source={showBalance ? require('@images/wallet/eye-open.png') : require('@images/wallet/eye-close.png')}
                            size={18}
                        />
                    </Btn>
                </Box>

                <Icon
                    source={require('@images/future/page-oclock.png')}
                    size={18}
                    resizeMode={'contain'}
                />
            </Box>

            {showBalance ?
                <>
                    <Txt size={29} fontFamily={'Myfont24-Regular'} marginTop={5} color={theme.black}>
                        {numberCommasDot(spot.balanceSpot)}
                    </Txt>
                    <Txt fontFamily={'Myfont23-Regular'} color={colors.gray5} marginTop={5} size={15}>
                        ≈ {numberCommasDot(spot.totalExchangeRate.toFixed(2))}
                        <Txt color={colors.gray5} size={14} fontFamily={fonts.IBMPR}>{' $'}</Txt>
                    </Txt>
                </>
                :
                <>
                    <Txt size={30} marginTop={10} color={theme.white}>******</Txt>
                    <Txt fontFamily={fonts.AS} color={colors.gray5}>******</Txt>
                </>
            }

            <Box row marginTop={20} alignCenter>
                <Txt color={colors.gray5} fontFamily={fonts.RM} size={11}>{t("Today's PNL")}</Txt>
                <Icon
                    size={11}
                    marginLeft={10}
                    source={require('@images/future/info.png')}
                />
            </Box>

            <Box row alignCenter marginTop={5}>
                <Txt fontFamily={'Myfont24-Regular'} size={14} color={color}>
                    {PNL >= 0 ?
                        `+${numberCommasDot(PNL.toFixed(2))}` :
                        `${numberCommasDot(PNL.toFixed(2))}`
                    }
                    <Txt color={color} bold size={11} fontFamily={fonts.AS}>
                        {' $/'}
                        <Txt fontFamily={'Myfont24-Regular'} size={14} color={color}>
                            {PNL >= 0 ?
                                `+${numberCommasDot(ROE.toFixed(2))}` :
                                `${numberCommasDot(ROE.toFixed(2))}`
                            }
                        </Txt>
                    </Txt>
                </Txt>
                <View style={{ transform: [{ rotateZ: '180deg' }], marginLeft: 5 }}>
                    <Icon
                        source={require('@images/back.png')}
                        size={8}
                    />
                </View>
            </Box>

            <Box row marginTop={15}>
                <Btn
                    onPress={() => navigate(screen.COIN_LIST)}
                    backgroundColor={colors.yellow}
                    style={styles.button}
                >
                    <Txt fontFamily={fonts.IBMPM} size={13}>{t('Deposit')}</Txt>
                </Btn>
                <Btn
                    onPress={() => navigate(screen.COIN_LIST_WITHDRAW)}
                    style={styles.button}
                    backgroundColor={theme.gray2}
                    marginHorizontal={10}
                >
                    <Txt fontFamily={fonts.IBMPM} size={13} color={theme.black}>{t('Withdraw')}</Txt>
                </Btn>
                <Btn
                    onPress={() => navigate(screen.COIN_LIST_WITHDRAW)}
                    style={styles.button}
                    backgroundColor={theme.gray2}
                >
                    <Txt fontFamily={fonts.IBMPM} size={13} color={theme.black}>{t('Transfer')}</Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default Balance

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 3,
        height: 28,
    }
})
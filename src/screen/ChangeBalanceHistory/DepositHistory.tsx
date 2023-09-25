import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { getHistoryDeposit } from '@service/walletService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { historyDeposit } from 'src/model/walletModel'
import ItemDepositHistory from './ItemDepositHistory'

const DepositHistory = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [historyDeposits, setHistoryDeposit] = useState<historyDeposit[]>([])

    // const [historyDeposits, setHistoryDeposit] = useState<historyDeposit[]>([
    //     {
    //         id: 1,
    //         amount: 50,
    //         created_at: '0823443'
    //     },
    //     {
    //         id: 2,
    //         amount: 50,
    //         created_at: '0823443'
    //     },
    // ])

    useEffect(() => {
        handleGetHistoryDeposit()
    }, [])

    const handleGetHistoryDeposit = async () => {
        const res = await getHistoryDeposit({ limit: 1000, page: 1 })
        if (res.status) {
            setHistoryDeposit(res.data.array)
        }
    }

    return (
        <Box>
            <Box
                row
                alignCenter
                justifySpaceBetween
                marginTop={20}
            >
                <Box row alignCenter>
                    <View
                        style={{
                            paddingVertical: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 20,
                            backgroundColor: theme.gray2,
                            paddingHorizontal: 10,
                            borderRadius: 3
                        }}>
                        <Txt size={13} fontFamily={fonts.IBMPM} color={theme.black}>
                            Crypto
                        </Txt>
                    </View>
                    <Txt size={13} fontFamily={fonts.IBMPM} color={colors.grayBlue}>Cash</Txt>
                </Box>
                <Icon
                    source={require('@images/wallet/filter.png')}
                    tintColor={'#929ba4'}
                    size={14}
                />
            </Box>

            <Box row alignCenter marginTop={10}>
                <Icon
                    source={require('@images/future/info.png')}
                    size={10}
                    marginRight={5}
                    tintColor={'#b6bec8'}
                />
                <Txt size={11} color={colors.grayBlue2} fontFamily={fonts.IBMPR}>
                    Deposits not arrived?
                </Txt>
                <Txt size={11} color={colors.yellowBold} fontFamily={fonts.IBMPR}>
                    {' Deposits not arrived >'}
                </Txt>
            </Box>

            <Box>
                {historyDeposits.map((item: any) =>
                    <ItemDepositHistory
                        t={t}
                        key={item.id}
                        item={item}
                        theme={theme}
                    />
                )}
                <Box alignCenter>
                    <Txt size={12} fontFamily={fonts.IBMPR} marginTop={20} color={colors.grayBlue2}>
                        No more data
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default DepositHistory
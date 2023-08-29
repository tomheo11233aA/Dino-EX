import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { getDepositBalance } from '@service/walletService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { historyDeposit } from 'src/model/walletModel'

const DepositHistory = () => {
    const [historyDeposits, setHistoryDeposit] = useState<historyDeposit[]>([])

    useEffect(() => {
        handleGetDepositBalance()
    }, [])

    const handleGetDepositBalance = async () => {
        const res = await getDepositBalance({limit: 10, page: 1})
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
                    <Box
                        padding={5}
                        backgroundColor={colors.gray3}
                        marginRight={20}
                    >
                        <Txt size={13} fontFamily={fonts.IBMPM}>Crypto</Txt>
                    </Box>
                    <Txt size={13} fontFamily={fonts.IBMPM}>Cash</Txt>
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
                    size={12}
                    marginRight={5}
                    tintColor={'#b6bec8'}
                />
                <Txt size={12} color={colors.grayBlue2}>
                    Deposits not arrived?
                </Txt>
                <Txt size={12} color={colors.yellowBold}>
                    {'Deposits not arrived >'}
                </Txt>
            </Box>

            <Box>
                {historyDeposits.map((item: any, index: any) =>
                    <Box
                        key={index}
                        row
                        justifySpaceBetween
                        marginTop={25}
                    >
                        <Box>
                            <Txt fontFamily={fonts.SGM} marginBottom={5} size={13}>
                                {'USDT'}
                            </Txt>
                            <Txt size={11} color={colors.grayBlue2} fontFamily={fonts.RM}>
                                {item.created_at}
                            </Txt>
                        </Box>

                        <Box>
                            <Txt fontFamily={fonts.M24} size={15}>
                                {item.amount}
                            </Txt>
                            <Box row alignCenter marginTop={5}>
                                <Txt color={colors.greenCan} size={5} marginRight={2}>
                                    ●
                                </Txt>
                                <Txt color={colors.grayBlue2} size={10} fontFamily={fonts.RM}>
                                    Completed
                                </Txt>
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box alignCenter>
                    <Txt size={12} fontFamily={fonts.RM} marginTop={20} color={colors.grayBlue2}>
                        No more data
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default DepositHistory
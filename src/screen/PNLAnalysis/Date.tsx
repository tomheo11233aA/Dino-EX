import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React from 'react'
import ItemUSDT from './ItemUSDT'

const Date = () => {
    const theme = useTheme()
    const dayChoose = '7day'

    const dates = [
        { number: '7', title: ' day', value: '7day' },
        { number: '1', title: ' month', value: '1month' },
        { number: '3', title: ' month', value: '3month' },
        { number: '1', title: ' year', value: '1year' },
    ]

    return (
        <Box paddingHorizontal={15}>
            <Box row paddingVertical={10} alignCenter>
                <Box row flex={1} justifySpaceBetween>
                    {dates.map((date) =>
                        <Btn
                            row
                            radius={2}
                            alignCenter
                            key={date.value}
                            paddingVertical={5}
                            paddingHorizontal={15}
                            backgroundColor={theme.gray2}
                        >
                            <Txt color={theme.black} fontFamily={fonts.M24} marginBottom={-2} size={15}>
                                {date.number}
                            </Txt>
                            <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                                {date.title}
                            </Txt>
                        </Btn>
                    )}
                </Box>
                <Icon
                    size={15}
                    marginLeft={15}
                    source={require('@images/wallet/gift.png')}
                />
            </Box>
            <Box marginTop={10}>
                <ItemUSDT
                    title={'Total profit'}
                />
                <ItemUSDT
                    title={'Total loss'}
                />
                <ItemUSDT
                    title={'Net profit/loss'}
                />
            </Box>
            <Box rotateZ={'90deg'} alignSelf={'center'} marginTop={20}>
                <Icon
                    size={12}
                    resizeMode={'contain'}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Box>
        </Box>
    )
}

export default Date
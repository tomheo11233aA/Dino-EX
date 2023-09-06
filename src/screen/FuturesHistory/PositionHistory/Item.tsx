import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { capitalizeFirst } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    t: any;
    item: any;
    theme: any;
}

const Item = ({ item, t, theme }: Props) => {
    const color = item.side === 'Buy' ? colors.green2 : colors.red3

    return (
        <Box
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween>
                <Box row alignCenter>
                    <Box
                        radius={3}
                        width={20}
                        height={20}
                        alignCenter
                        justifyCenter
                        marginRight={10}
                        backgroundColor={color}
                    >
                        <Txt color={colors.white} size={13}>
                            {capitalizeFirst(item?.side?.charAt(0))}
                        </Txt>
                    </Box>
                    <Txt size={16} fontFamily={fonts.SGM} color={theme.black}>
                        {`${item.symbol} ${t('Perpetual')}`}
                    </Txt>
                </Box>

                <Btn>
                    <Icon
                        size={17}
                        source={require('@images/future/share.png')}
                    />
                </Btn>
            </Box>

            <Box
                row
                alignCenter
                justifySpaceBetween
                marginTop={5}
            >
                <Txt color={color} fontFamily={fonts.IBMPM}>
                    {`${item.regime} / ${item.side}`}
                </Txt>

                <Box row alignCenter marginTop={10}>
                    <Box width={7} height={7} backgroundColor={color} radius={50} />
                    <Txt color={colors.grayBlue} size={12}>{' Opened'}</Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={15}>
                <Box>
                    <Txt color={colors.grayBlue}>PNL close</Txt>
                    <Txt color={color} fontFamily={fonts.M24} size={16}>
                        {item.PNL}
                    </Txt>
                </Box>

                <Box alignEnd>
                    <Txt color={colors.grayBlue}>
                        {t('Closing volume')}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M24} size={16}>
                        {item.ClosingVolume}
                        <Txt color={theme.black} size={13}>{' BTC'}</Txt>
                    </Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={15}>
                <Box>
                    <Txt color={colors.grayBlue}>Entry price</Txt>
                    <Txt
                        size={16}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        {item.entryPrice}
                    </Txt>
                </Box>

                <Box>
                    <Txt color={colors.grayBlue}>
                        {t('Close price')}
                    </Txt>
                    <Txt
                        size={16}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        {item.ClosingVolume}
                    </Txt>
                </Box>

                <Box alignEnd>
                    <Txt color={colors.grayBlue}>
                        {t('Maximum volume')}
                    </Txt>
                    <Txt
                        size={16}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M24}
                    >
                        {item.ClosingVolume}
                        <Txt color={theme.black} size={13}>{' BTC'}</Txt>
                    </Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={10}>
                <Txt color={colors.grayBlue}>Opend</Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={15}>
                    2023-04-09 10:20:33
                </Txt>
            </Box>

            <Box row justifySpaceBetween marginTop={5}>
                <Txt color={colors.grayBlue}>Closed</Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={15}>
                    2023-05-12 15:05:47
                </Txt>
            </Box>
        </Box>
    )
}

export default Item
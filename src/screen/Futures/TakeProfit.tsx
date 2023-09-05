import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts';
import React from 'react'
import EditText from './EditText';
import Input from '@commom/Input';
import Icon from '@commom/Icon';

interface Props {
    t: any;
    theme: any;
}

const TakeProfit = ({ theme, t }: Props) => {
    return (
        <Box marginTop={30}>
            <Box row alignCenter>
                <Box
                    width={15}
                    height={15}
                    radius={50}
                    borderColor={theme.gray6}
                    marginRight={7}
                    alignCenter
                    justifyCenter
                    backgroundColor={colors.yellow}
                >
                    <Txt size={10} color={theme.bg} bold>
                        ✓
                    </Txt>
                </Box>
                <Txt
                    color={theme.black}
                    fontFamily={fonts.IBMPM}
                >
                    Take Profit
                </Txt>
            </Box>

            <Box row marginTop={20}>
                <EditText
                    value='0.6228'
                    setValue={() => { }}
                />
                <Box
                    row
                    radius={3}
                    height={40}
                    alignCenter
                    width={'25%'}
                    marginLeft={10}
                    justifySpaceBetween
                    paddingHorizontal={10}
                    backgroundColor={theme.gray2}
                >
                    <Txt color={theme.gray2} fontFamily={fonts.IBMPM}>
                        %
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M24} size={16}>8</Txt>
                    <Txt color={theme.black} fontFamily={fonts.AS}>
                        %
                    </Txt>
                </Box>
            </Box>

            <Box row marginTop={10}>
                <Box flex={1} backgroundColor={theme.gray} radius={3}>
                    <Input
                        height={40}
                        font={fonts.RM}
                        color={theme.black}
                        textAlign={'center'}
                        hint={t('Market Price')}
                        hintColor={colors.grayBlue}
                    />
                </Box>

                <Box
                    radius={3}
                    height={40}
                    alignCenter
                    justifyCenter
                    width={'25%'}
                    marginLeft={10}
                    paddingHorizontal={10}
                    backgroundColor={theme.gray2}
                >
                    <Txt color={colors.yellow} fontFamily={fonts.AS}>
                        Market
                    </Txt>
                </Box>
            </Box>

            <Box marginTop={20}>
                <Txt color={colors.grayBlue}>
                    {t('When ')}
                    <Txt color={colors.yellow}>
                        {t('Mark Price ')}
                    </Txt>
                    <Icon
                        size={10}
                        tintColor={colors.yellow}
                        source={require('@images/trade/more.png')}
                    />
                    <Txt color={colors.grayBlue}>
                        {` ${t('reaches')} `}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M17} size={16}>
                        {' 0.6228 '}
                    </Txt>
                    <Txt color={colors.grayBlue}>
                        {`, ${t('it will trigger ')}`}
                    </Txt>
                    <Txt color={theme.black}>
                        {`${t('Market ')}`}
                    </Txt>
                    <Txt color={colors.grayBlue}>
                        {`${t('order and the estimated PNL will be ')}`}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M17} size={16}>
                        {'90.19'}
                    </Txt>
                    <Txt color={theme.black}>
                        {' USDT.'}
                    </Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default TakeProfit
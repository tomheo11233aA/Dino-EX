import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import BoxLine from '@reuse/BoxLine'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import RowItem from './RowItem'

const StatisticsTradingData = ({ theme, t }: any) => {
    const [seeMore, setSeeMore] = useState(false)

    return (
        <Box>
            <Box row alignCenter justifySpaceBetween marginTop={20}>
                <Box>
                    <Box row>
                        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                            {t('Last 7D ROI')}
                        </Txt>
                        <Box rotateZ={'90deg'}>
                            <Icon
                                size={10}
                                resizeMode={'contain'}
                                tintColor={theme.black}
                                source={require('@images/wallet/right_arrow.png')}
                            />
                        </Box>
                    </Box>
                    <Box row alignCenter>
                        <BoxLine
                            title={'+13.13'}
                            color={13 >= 0 ? colors.green2 : colors.red3}
                            borderColor={13 >= 0 ? colors.green2 : colors.red3}
                            font={fonts.M24}
                            size2={18}
                            size={20}
                            paddingText={5}
                            marginTop={10}
                        />
                        <Txt
                            marginTop={3}
                            marginLeft={-12}
                            fontFamily={fonts.IBMPM}
                            color={13 >= 0 ? colors.green2 : colors.red3}
                        >
                            {'%'}
                        </Txt>
                    </Box>
                </Box>

                <Box>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t('Last 7D ROI')}
                    </Txt>
                    <Box row alignCenter>
                        <BoxLine
                            title={'+13.13'}
                            color={13 >= 0 ? colors.green2 : colors.red3}
                            borderColor={13 >= 0 ? colors.green2 : colors.red3}
                            font={fonts.M24}
                            size2={18}
                            size={20}
                            paddingText={5}
                            marginTop={10}
                        />
                        <Txt
                            marginTop={3}
                            marginLeft={-12}
                            fontFamily={fonts.IBMPM}
                            color={13 >= 0 ? colors.green2 : colors.red3}
                        >
                            {'%'}
                        </Txt>
                    </Box>
                </Box>
            </Box>

            <RowItem
                marginTop={20}
                colorValue={theme.black}
                title={t('Account Assets')}
                value={numberCommasDot(1526.98)}
            />
            <RowItem
                marginTop={15}
                colorValue={3.78 >= 0 ? colors.green2 : colors.red3}
                title={t('Copier Profit')}
                value={`+${numberCommasDot(3.78)}`}
            />
            <RowItem
                marginTop={15}
                colorValue={3.78 >= 0 ? colors.green2 : colors.red3}
                title={t('Copiers')}
                value={47}
            />
            <Box
                row
                alignCenter
                marginTop={15}
                justifySpaceBetween
                borderBottomWidth={seeMore ? 1 : 0}
                paddingBottom={15}
                borderColor={theme.gray2}
            >
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {t('Risk')}
                </Txt>

                <Box
                    radius={5}
                    padding={3}
                    borderWidth={1}
                    borderColor={colors.yellow}
                    backgroundColor={theme.yellow7}
                >
                    <Txt color={colors.yellow} fontFamily={fonts.M23} size={13}>
                        6
                    </Txt>
                </Box>
            </Box>

            {seeMore &&
                <Box
                    paddingBottom={10}
                    borderColor={theme.gray2}
                >
                    <RowItem
                        value={'68.00%'}
                        marginTop={15}
                        title={t('Win Ratio')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'75'}
                        marginTop={15}
                        title={t('Total Transactions')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={51}
                        marginTop={15}
                        title={t('No. of Winning Trades')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={24}
                        marginTop={15}
                        title={t('No. of Losing Trades')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'15.39 (75.06%)'}
                        marginTop={15}
                        title={t('Average Profit')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'-4.45 (-15.36%)'}
                        marginTop={15}
                        title={t('Average Losses')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'3:4:1'}
                        marginTop={15}
                        title={t('PnL Ratio')}
                        colorValue={theme.black}
                    />

                    <Box row alignCenter justifySpaceBetween marginTop={15}>
                        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                            {t('Average Holding Time')}
                        </Txt>
                        <Txt color={theme.black} size={11}>
                            {'7D 0H'}
                        </Txt>
                    </Box>

                    <Box row alignCenter justifySpaceBetween marginTop={15}>
                        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                            {t('Trade Days')}
                        </Txt>
                        <Txt color={theme.black} size={11}>
                            {'155D'}
                        </Txt>
                    </Box>

                    <RowItem
                        marginTop={15}
                        colorValue={theme.black}
                        value={'2023-10-08 06:05'}
                        title={t('Last Trading Time')}
                    />
                </Box>
            }

            <Btn onPress={() => setSeeMore(!seeMore)}>
                <Box rotateZ={seeMore ? '-90deg' : '90deg'} alignSelf={'center'} marginTop={20}>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        tintColor={theme.black}
                        source={require('@images/wallet/right_arrow.png')}
                    />
                </Box>
            </Btn>

            <Box
                borderTopWidth={1}
                marginTop={20}
                borderColor={theme.gray2}
            >
                <Txt marginTop={15} color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                    {t('Currency Unit: USDT')}
                </Txt>

                <Box row>
                    <BoxLine
                        title={'Profit Share Ratio: '}
                        color={colors.grayBlue}
                        borderColor={colors.grayBlue}
                        font={fonts.IBMPR}
                        size2={12}
                        size={11}
                        paddingText={4}
                        marginTop={10}
                    />
                    <BoxLine
                        title={'10.00%'}
                        color={colors.grayBlue}
                        borderColor={colors.grayBlue}
                        font={fonts.M23}
                        size2={13}
                        size={12}
                        paddingText={6}
                        marginTop={10}
                    />
                </Box>

                <Box row alignCenter marginTop={10}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t('Update Time: ')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.M23}>
                        {t('2023/10/09 08:51:07')}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default StatisticsTradingData
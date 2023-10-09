import Box from '@commom/Box'
import React, { useState } from 'react'
import LineChartROI from './LineChartROI'
import Txt from '@commom/Txt'
import Icon from '@commom/Icon'
import { fonts } from '@theme/fonts'
import Btn from '@commom/Btn'
import TwoDimensionalColumnChart from './TwoDimensionalColumnChart'
import { colors } from '@theme/colors'

const WeeklyProfit = ({ theme, t }: any) => {
    const [tabChoosed, setTabChoosed] = useState<string>('ROI')

    const tabs = ['ROI', 'Cumulative PnL', 'Account Assets']
    const data: any = {
        indexColumn: {
            max: 300,
            min: -250,
            total: 6,
            fixed: 1,
        },
        columns: [0, -20, 0, 100, 200, 150, -250, 300],
        indexRow: {
            total: 4,
            data: [1687348799999, 1687348799999, 1687348799999, 1687348799999, 1687348799999, 1687348799999, 1687348799999, 1687348799999]
        },
    }
    return (
        <Box marginTop={40}>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={theme.black} size={16} fontFamily={fonts.IBMPM}>
                    {t('Weekly Profit')}
                </Txt>
                <Box
                    row
                    radius={20}
                    paddingVertical={10}
                    paddingHorizontal={15}
                    backgroundColor={theme.gray2}
                >
                    <Txt color={theme.black}>
                        {`${t('Last 7D')}  `}
                    </Txt>
                    <Box rotateZ={'90deg'}>
                        <Icon
                            size={12}
                            resizeMode={'contain'}
                            source={require('@images/wallet/right_arrow.png')} />
                    </Box>
                </Box>
            </Box>

            <TwoDimensionalColumnChart
                indexRow={data.indexRow}
                columns={data.columns}
                indexColunm={data.indexColumn}
            />

            <Box row alignEnd justifyEnd marginTop={20}>
                <Box row alignCenter>
                    <Box width={10} height={4} backgroundColor={colors.green2} marginRight={5} />
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('Profit')}
                    </Txt>
                </Box>
                <Box row alignCenter marginLeft={10}>
                    <Box width={10} height={4} backgroundColor={colors.red3} marginRight={5} />
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('Loss')}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default WeeklyProfit
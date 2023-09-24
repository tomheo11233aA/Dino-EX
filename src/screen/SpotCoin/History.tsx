import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Txt from "@commom/Txt";
import { useTheme } from "@hooks/index";
import { navigate } from "@navigation/navigationRef";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { screen } from "@util/screens";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabDeposit from "./TabDeposit";
import TabWithdraw from "./TabWithdraw";

const data = ['Deposit', 'Withdraw']

export default () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [tab, setTab] = useState('Deposit')

    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt fontFamily={fonts.IBMPM} size={13} color={theme.black}>
                    {t('History')}
                </Txt>
                <Btn onPress={() => navigate(screen.CHANGE_BALANCE_HISTORY)}>
                    <Txt size={12} fontFamily={fonts.IBMPM} color={colors.yellow}>
                        {t('More')}
                    </Txt>
                </Btn>
            </Box>

            <Box row alignStart marginBottom={10}>
                {data.map((item) =>
                    <Btn
                        key={item}
                        backgroundColor={item === tab && theme.gray}
                        paddingHorizontal={10}
                        paddingVertical={3}
                        radius={4}
                        marginTop={10}
                        onPress={() => setTab(item)}
                    >
                        <Txt
                            size={12}
                            fontFamily={fonts.AS}
                            color={item === tab ? theme.black : colors.grayBlue}
                        >
                            {t(item)}
                        </Txt>
                    </Btn>
                )}
            </Box>

            {tab === 'Deposit' ?
                <TabDeposit /> :
                <TabWithdraw />
            }

            {/* <Box row justifySpaceBetween marginTop={20}>
                <Box row>
                    <Box
                        padding={7}
                        backgroundColor={theme.gray}
                        radius={50}
                        alignSelf={'flex-start'}
                        marginRight={10}
                    >
                        <Icon
                            source={require('@images/future/cv.png')}
                            tintColor={colors.grayBlue}
                            size={14}
                            resizeMode={'contain'}
                        />
                    </Box>
                    <Box>
                        <Txt fontFamily={fonts.RM} size={13} color={theme.black}>
                            {t('Transfer')}
                        </Txt>
                        <Txt size={10} fontFamily={fonts.IBMPR} color={colors.grayBlue2}>
                            {t('Cross Margin')}
                        </Txt>
                        <Txt size={10} fontFamily={fonts.IBMPR} color={colors.grayBlue2}>
                            2023-05-20 14:31:24
                        </Txt>
                    </Box>
                </Box>

                <Txt fontFamily={fonts.M24} color={colors.red3}>
                    -1.009,42
                </Txt>
            </Box>

            <Box row justifySpaceBetween marginTop={30}>
                <Box row>
                    <Box
                        padding={7}
                        backgroundColor={theme.gray}
                        radius={50}
                        alignSelf={'flex-start'}
                        marginRight={10}
                    >
                        <Icon
                            size={14}
                            resizeMode={'contain'}
                            tintColor={colors.grayBlue}
                            source={require('@images/future/download.png')}
                        />
                    </Box>
                    <Box>
                        <Txt fontFamily={fonts.RM} size={13} color={theme.black}>
                            {t('Deposit')}
                        </Txt>
                        <Txt size={10} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                            {t('Crypto')}
                        </Txt>
                    </Box>
                </Box>

                <Txt fontFamily={fonts.M24} color={colors.greenCan}>
                    +999,71
                </Txt>
            </Box> */}
        </Box>
    )
}

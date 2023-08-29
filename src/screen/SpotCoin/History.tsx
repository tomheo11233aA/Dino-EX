import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import ModalWithdraw from "./ModalWithdraw";
import { useState } from "react";
import { useTheme } from "@hooks/index";
import { navigate } from "@navigation/navigationRef";
import { screen } from "@util/screens";
import { useTranslation } from "react-i18next";

const data = ['All', 'Deposit & Withdraw', 'Convert', 'Transfer']

export default ({ coin }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [isShowModalWithdraw, setShowModalWithdraw] = useState(false)

    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt fontFamily={fonts.AS} size={13} color={theme.black}>
                    {t('History')}
                </Txt>
                <Txt size={12} bold color={colors.yellow}>
                    {t('More')}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceAround>
                {data.map((item, index) =>
                    <Box
                        key={item}
                        backgroundColor={index === 0 && theme.gray}
                        paddingHorizontal={10}
                        paddingVertical={3}
                        radius={4}
                        marginTop={10}
                    >
                        <Txt
                            size={12}
                            fontFamily={fonts.AS}
                            color={index !== 0 ? colors.grayBlue2 : theme.black}
                        >
                            {t(item)}
                        </Txt>
                    </Box>
                )}
            </Box>

            <Box row justifySpaceBetween marginTop={20}>
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
            </Box>

            <Box row marginTop={20}>
                <Btn
                    onPress={() => setShowModalWithdraw(true)}
                    flex={1}
                    backgroundColor={theme.gray}
                    height={32}
                    radius={5}
                >
                    <Txt fontFamily={fonts.AS} size={13} color={theme.black}>
                        {t('Withdraw')}
                    </Txt>
                </Btn>

                <Btn
                    onPress={() => navigate(screen.DEPOSIT_CRYPTO, { coin })}
                    flex={1}
                    backgroundColor={colors.yellow}
                    height={32}
                    radius={5}
                    marginLeft={10}
                >
                    <Txt fontFamily={fonts.AS} size={13}>
                        {t('Deposit')}
                    </Txt>
                </Btn>
            </Box>

            <ModalWithdraw
                {...{
                    isShow: isShowModalWithdraw,
                    setShow: setShowModalWithdraw
                }}
            />
        </Box>
    )
}

import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import Img from "@commom/Img";
import Txt from "@commom/Txt";
import { useAppDispatch, useAppSelector, useTheme } from "@hooks/index";
import { reset } from "@navigation/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { kycUserSelector, profileUserSelector } from "@selector/userSelector";
import userSlice from "@slice/userSlice";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import contants from "@util/contants";
import { screen } from "@util/screens";
import { Profile } from "src/model/userModel";

export default ({ t }: any) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const kyc = useAppSelector(kycUserSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const handleLogout = async () => {
        await AsyncStorage.removeItem(contants.TOKEN)
        dispatch(userSlice.actions.signOut())
        reset(0, screen.LOGIN)
    }

    const kycOjb = {
        approved: {
            text: 'Verified',
            color: '#3cb389',
            backgroundColor: theme.green,
            icon: require('@images/profile/checkmark.png'),
            sizeIcon: 14,
        },
        pendding: {
            text: 'Pending',
            color: colors.yellowBold,
            backgroundColor: theme.yellow,
            icon: require('@images/p2p/oclock.png'),
            sizeIcon: 11,
        },
        notKyc: {
            text: 'Not verified',
            color: colors.red,
            backgroundColor: theme.red2,
            icon: require('@images/profile/close.png'),
            sizeIcon: 11,
        },
    }

    const kycStatus = kyc === contants.KYC_APPROVED ? kycOjb.approved :
        kyc === contants.KYC_PENDING ? kycOjb.pendding : kycOjb.notKyc 

    return (
        <Btn
            onPress={handleLogout}
        >
            <Box row alignCenter marginTop={30}>
                <Box flex={1} row>
                    <Img
                        width={42}
                        height={43}
                        marginRight={10}
                        source={require('@images/home/user.png')}
                    />
                    <Box>
                        <Txt color={colors.grayBlue2} size={10}>
                            ID: 14294361
                        </Txt>
                        <Txt bold size={22} color={theme.black}>
                            {profile.userName}
                        </Txt>
                        <Box
                            row
                            alignCenter
                            marginTop={10}
                        >
                            <Box
                                row
                                radius={5}
                                alignCenter
                                marginRight={5}
                                paddingVertical={3}
                                paddingHorizontal={5}
                                backgroundColor={kycStatus.backgroundColor}
                            >
                                <Icon
                                    marginRight={3}
                                    resizeMode={'contain'}
                                    source={kycStatus.icon}
                                    size={kycStatus.sizeIcon}
                                    tintColor={kycStatus.color}
                                />
                                <Txt size={12} color={kycStatus.color} fontFamily={fonts.RM}>
                                    {t(kycStatus.text)}
                                </Txt>
                            </Box>

                            <Box
                                row
                                radius={5}
                                alignCenter
                                marginRight={5}
                                paddingVertical={3}
                                paddingHorizontal={5}
                                backgroundColor={theme.gray}
                            >
                                <Icon
                                    size={13}
                                    marginRight={5}
                                    resizeMode={'contain'}
                                    tintColor={theme.black}
                                    source={require('@images/profile/diamond.png')}
                                />
                                <Txt
                                    size={12}
                                    color={theme.black}
                                    fontFamily={fonts.IBMPM}
                                >
                                    {t('Regular')}
                                </Txt>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Icon
                    size={14}
                    resizeMode={'contain'}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Box>

            <Box width={'100%'} height={1} backgroundColor={theme.gray2} marginTop={20} />
        </Btn>
    )
}

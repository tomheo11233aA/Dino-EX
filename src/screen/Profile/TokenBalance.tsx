import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { fonts } from '@theme/fonts'
import { useAppSelector, useTheme } from '@hooks/index'
import Txt from '@commom/Txt'
import { kycUserSelector, profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'
import contants from '@util/contants'

const TokenBalance = () => {
    const theme = useTheme()

    const kyc = useAppSelector(kycUserSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    return (
        <>
            {kyc != contants.KYC_APPROVED ?
                <></> :
                <Box row alignCenter justifySpaceBetween marginTop={25}>
                    <Box row alignCenter>
                        <Icon
                            source={require('@images/profile/user.png')}
                            size={15}
                            tintColor={'#90929E'}
                            marginRight={10}
                            resizeMode={'contain'}
                        />
                        <Txt fontFamily={fonts.IBMPR} size={12} color={theme.black}>
                            Token balance
                        </Txt>
                    </Box>
                    <Txt color={theme.black} fontFamily={fonts.M24}>
                        {profile.tokenBalance}
                    </Txt>
                </Box>
            }
        </>
    )
}

export default TokenBalance
import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { useState } from "react"
import { ImageSourcePropType } from "react-native"
import ModalShare from "./ModalShare"
import { useTheme } from "@hooks/index"

interface Data {
    title: string;
    icon: ImageSourcePropType;
}

const data: Data[] = [
    {
        title: 'Payment Methods',
        icon: require('@images/profile/dolar.png'),
    },
    {
        title: 'Gift Card',
        icon: require('@images/profile/gift4.png'),
    },
    {
        title: 'My Gifts',
        icon: require('@images/profile/gift3.png'),
    },
    {
        title: 'Clear Cache',
        icon: require('@images/profile/clear.png'),
    },
    {
        title: 'Help & Support',
        icon: require('@images/future/book.png'),
    },
    {
        title: 'Share the app',
        icon: require('@images/future/share.png'),
    },
]

export default ({ t }: any) => {
    const [isShowModalShare, setShowModalShare] = useState(false)
    const theme = useTheme()

    const handleItemData = (item: Data) => {
        if (item.title === 'Share the app') {
            setShowModalShare(true)
        }
    }

    return (
        <Box>
            {data.map((item, index) =>
                <Btn
                    row
                    alignCenter
                    marginTop={35}
                    key={item.title}
                    justifySpaceBetween
                    onPress={() => handleItemData(item)}
                >
                    <Box row alignCenter>
                        <Icon
                            size={21}
                            marginRight={10}
                            source={item.icon}
                            tintColor={'#90929E'}
                            resizeMode={'contain'}
                        />
                        <Txt fontFamily={fonts.IBMPR} size={13} color={theme.black}>
                            {t(item.title)}
                        </Txt>
                    </Box>
                    <Box row alignCenter>
                        {index === 3 &&
                            <Txt
                                size={12}
                                marginRight={10}
                                fontFamily={fonts.RM}
                                color={colors.grayBlue2}
                            >
                                15.79 MB
                            </Txt>
                        }

                        <Icon
                            size={12}
                            resizeMode={'contain'}
                            source={require('@images/wallet/right_arrow.png')}
                        />
                    </Box>
                </Btn>
            )}
            <ModalShare
                isShow={isShowModalShare}
                setShow={setShowModalShare}
            />
        </Box>
    )
}
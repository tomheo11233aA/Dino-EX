import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

interface Props {
    t: any,
    theme: any,
    netWork: string,
    setNetWork: Function,
}

export default ({
    t,
    theme,
    netWork,
    setNetWork,
}: Props) =>
    <Box>
        <Box row marginTop={25}>
            <Txt
                size={12}
                marginBottom={7}
                fontFamily={fonts.RM}
                color={colors.grayBlue2}
            >
                {t('Network')}
            </Txt>
            <Icon
                size={11}
                marginTop={1}
                marginLeft={5}
                tintColor={'#bfc2ca'}
                source={require('@images/future/info.png')}
            />
        </Box>

        <Box
            row
            radius={5}
            alignCenter
            height={40}
            paddingHorizontal={10}
            backgroundColor={theme.gray2}
        >
            <Box flex={1}>
                <Txt fontFamily={fonts.SGM} color={theme.black}>{netWork}</Txt>
            </Box>
            <Box>
                <Icon
                    source={require('@images/wallet/right_arrow.png')}
                    size={11}
                    resizeMode={'contain'}
                    tintColor={'#8e909b'}
                />
            </Box>
        </Box>
    </Box>

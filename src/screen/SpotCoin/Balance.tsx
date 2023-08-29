import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

export default ({ theme, coin, t }: any) =>
    <Box alignCenter>
        <Box row alignCenter>
            <Txt size={10} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                {`${t('Total')} `}
            </Txt>
            <Icon
                source={require('@images/wallet/eye-open.png')}
                size={14}
                resizeMode={'contain'}
            />
        </Box>

        <Txt fontFamily={fonts.M24} size={26} marginTop={10} color={theme.black}>
            {coin?.balance}
        </Txt>

        <Box marginTop={10}>
            <Txt color={colors.grayBlue2} size={10}>
                {'≈ '}
                <Txt color={colors.grayBlue2} fontFamily={fonts.M23}>
                {coin?.balance}
                </Txt>
                <Txt color={colors.grayBlue2} size={12}>
                    {' $'}
                </Txt>
            </Txt>
        </Box>
    </Box>
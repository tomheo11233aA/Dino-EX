import Box from "@commom/Box"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { useTheme } from "@hooks/index"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { Switch } from "react-native"

export default () => {
    const theme = useTheme()

    return (
        <Box row alignCenter justifySpaceBetween marginTop={25}>
            <Box row alignCenter>
                <Icon
                    source={require('@images/trade/logo.png')}
                    size={21}
                    tintColor={'#90929E'}
                    marginRight={10}
                />
                <Txt fontFamily={fonts.IBMPR} size={13} color={theme.black}>
                    Binance Pro
                </Txt>
            </Box>
            <Switch
                value={true}
                trackColor={{ true: colors.yellow }}
                thumbColor={'white'}
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
            />
        </Box>
    )
}
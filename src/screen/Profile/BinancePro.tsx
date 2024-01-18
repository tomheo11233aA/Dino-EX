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
                    source={require('@images/logohx.png')}
                    size={100}
                    // tintColor={'#90929E'}
                    marginRight={10}
                    resizeMode={'contain'}
                />

            </Box>
            <Switch
                value={true}
                trackColor={{ true: colors.yellow }}
                thumbColor={'white'}
                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
            />
        </Box>
    )
}
import Box from "@commom/Box"
import Txt from "@commom/Txt"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { ScrollView } from "react-native"

const data = ['Cryptocurrency address', 'Binance Account', 'fiat money']

export default () => {
    return (
        <Box>
            <ScrollView horizontal >
                <Box row alignCenter justifySpaceAround paddingHorizontal={5}>
                    {data.map((item, index) =>
                        <Box
                            key={item}
                            backgroundColor={index === 1 && colors.gray3}
                            paddingHorizontal={10}
                            paddingVertical={3}
                            radius={4}
                            marginTop={10}
                        >
                            <Txt
                                size={13}
                                fontFamily={fonts.RM}
                                color={index !== 1 ? colors.grayBlue2 : colors.black}
                            >
                                {item}
                            </Txt>
                        </Box>
                    )}
                </Box>
            </ScrollView>
        </Box>
    )
}
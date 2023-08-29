import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { width } from "@util/responsive";

interface Props {
    tab: string,
    setTab: Function,
}

export default ({ tab, setTab }: Props) => {
    const data = ['Deposit', 'Withdrawals', 'Buy', 'Sell', 'Convert', 'Trade']

    return (
        <Box>
            <Box
                row
                marginTop={25}
                justifySpaceAround
                alignStart
            >
                {data.map((item: string, index: number) =>
                    <Btn
                        onPress={() => {
                            if (item === 'Deposit' || item === 'Withdrawals') {
                                setTab(item)
                            }
                        }}
                        key={item}
                        alignCenter
                        marginRight={10}
                    >
                        <Txt
                            color={item === tab ? colors.black : colors.gray5}
                            fontFamily={fonts.AS}
                            size={13}
                        >
                            {item}
                        </Txt>
                        {item === tab &&
                            <Box width={20} height={3} backgroundColor={colors.yellow} marginTop={5} />
                        }
                    </Btn>
                )}
            </Box>
            <Box width={width} height={0.5} backgroundColor={colors.gray4} marginLeft={-15} />
        </Box>

    )
}
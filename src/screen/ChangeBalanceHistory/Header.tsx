import Box from "@commom/Box";
import Txt from "@commom/Txt";
import Back from "@reuse/Back";
import { fonts } from "@theme/fonts";

export default () =>
    <Box
        marginTop={10}
        row
        alignCenter
        justifySpaceBetween
    >
        <Back size={16} color='#868d98' />
        <Txt fontFamily={fonts.RM} size={14}>
            Balance change history
        </Txt>
        <Box />
    </Box>
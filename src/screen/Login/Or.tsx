import Box from "@commom/Box"
import Txt from "@commom/Txt"
import { colors } from "@theme/colors"

const Or = ({ t, theme }: any) => {
    return (
        <Box row alignCenter marginVertical={30}>
            <Box height={1} flex={1} backgroundColor={theme.gray} />
            <Txt color={colors.grayBlue} size={16} marginHorizontal={20}>{t('or')}</Txt>
            <Box height={1} flex={1} backgroundColor={theme.gray} />
        </Box>

    )
}

export default Or
import Box from "@commom/Box"
import Txt from "@commom/Txt"
import { useTheme } from "@hooks/index"
import { numberCommasDot } from "@method/format"
import { getHistoryWidthdraw } from "@service/walletService"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { useEffect, useState } from "react"
import { historyWithdraw } from "src/model/walletModel"
import ItemWithdrawHistory from "./ItemWithdrawHistory"

export default () => {
    const theme = useTheme()
    const [historyWithdraws, setHistoryWithdraw] = useState<historyWithdraw[]>([])

    useEffect(() => {
        handleGetHistoryWidthdraw()
    }, [])

    const handleGetHistoryWidthdraw = async () => {
        const res = await getHistoryWidthdraw({
            limit: 1000,
            page: 1,
        })
        if (res.status) {
            setHistoryWithdraw(res.data.array)
        }
    }

    return (
        <Box>
            {historyWithdraws.map((item, index) =>
                <ItemWithdrawHistory
                    theme={theme}
                    item={item}
                    key={item.id}
                />
            )}
            <Box alignCenter>
                <Txt size={12} fontFamily={fonts.IBMPR} marginTop={20} color={colors.grayBlue}>
                    No more data
                </Txt>
            </Box>
        </Box>
    )
}
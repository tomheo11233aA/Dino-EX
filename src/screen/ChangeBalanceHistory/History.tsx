import Box from "@commom/Box"
import Txt from "@commom/Txt"
import { getHistoryWidthdraw } from "@service/walletService"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { useEffect, useState } from "react"
import { historyWithdraw } from "src/model/walletModel"

export default () => {
    const [historyWithdraws, setHistoryWithdraw] = useState<historyWithdraw[]>([])

    useEffect(() => {
        handleGetHistoryWidthdraw()
    }, [])

    const handleGetHistoryWidthdraw = async () => {
        const res = await getHistoryWidthdraw({
            limit: 10,
            page: 1,
        })
        if (res.status) {
            setHistoryWithdraw(res.data.array)
        }
    }

    return (
        <Box>
            {historyWithdraws.map((item, index) =>
                <Box
                    key={index}
                    row
                    justifySpaceBetween
                    marginTop={25}
                >
                    <Box>
                        <Txt fontFamily={fonts.SGM} marginBottom={5} size={13}>
                            {item.symbol}
                        </Txt>
                        <Txt size={11} color={colors.grayBlue2} fontFamily={fonts.RM}>
                            {item.toAddress}
                        </Txt>
                        <Txt size={11} color={colors.grayBlue2} fontFamily={fonts.RM}>
                            {item.created_at}
                        </Txt>
                    </Box>

                    <Box>
                        <Txt fontFamily={fonts.M24} size={15}>
                            {item.amount}
                        </Txt>
                        <Box row alignCenter marginTop={5}>
                            <Txt color={colors.greenCan} size={5} marginRight={2}>
                                ●
                            </Txt>
                            <Txt color={colors.grayBlue2} size={10} fontFamily={fonts.RM}>
                                Done
                            </Txt>
                        </Box>
                    </Box>
                </Box>
            )}
            <Box alignCenter>
                <Txt size={12} fontFamily={fonts.RM} marginTop={20} color={colors.grayBlue2}>
                    No more data
                </Txt>
            </Box>
        </Box>
    )
}
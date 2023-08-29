import { createAsyncThunk } from "@reduxjs/toolkit"
import { cancelTransactionDepositVnd, getBanking } from "@service/fundingService"
import { checkTransactionDepositVnd } from "@service/walletService"
import { banking } from "@util/banking"

export const getBankingThunk =
    createAsyncThunk('deposite/getBanking', async () => {
        const res = await getBanking()
        let data = []
        if (res.status) {
            for (let index = 0; index < res.data.length; index++) {
                for (let position = 0; position < banking.length; position++) {
                    if (res.data[index].name_banking === banking[position].name) {
                        data.push({ ...res.data[index], image: banking[position].image })
                        break
                    }
                }
            }
        }
        return { ...res, data }
    })

export const checkTransactionDepositVndThunk =
    createAsyncThunk('funding/checkTransactionDepositVnd', async () => {
        const res = await checkTransactionDepositVnd()
        return res
    })
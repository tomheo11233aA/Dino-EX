import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

export const getListUserTrader = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/copyTradeFuture/getListUserTrader', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getPositionToTrader = async (userid: number | string) => {
    try {
        const res = await axiosInstance.post('/api/copyTradeFuture/getPositionToTrader', { userid })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const signUpCopyTrade = async () => {
    try {
        const res = await axiosInstance.post('/api/copyTradeFuture/signUpCopyTrade', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}
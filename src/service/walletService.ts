import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import { reqWithdraw } from "src/model/walletModel"

export const getDepositBalance = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/getDepositBalance', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryWidthdraw = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryWidthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const setBalance = async (balance: number) => {
    try {
        const res = await axiosInstance.post('/api/binance/setBalance', { balance })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const widthdraw = async (data: reqWithdraw) => {
    try {
        const res = await axiosInstance.post('/api/crypto/widthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const checkTransactionDepositVnd = async () => {
    try {
        const res = await axiosInstance.post('/api/depositVND/checkTransactionDepositVnd', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getChartStatisticsUser = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getChartStatisticsUser', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryChangeBalance = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/getHistoryChangeBalance', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { USDTFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, feeFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Profile } from 'src/model/userModel'
import Amount from './Amount'
import Slider from './Slider'
import { getValueConfig } from '@service/userService'
import futuresSlice from '@slice/futuresSlice'
// Show amount và slider
const AmountSlider = () => {
    const dispatch = useAppDispatch()
    const hint = useSharedValue(true) // Gợi ý
    const enter = useSharedValue(false) // Nhập bàn phím
    const positionX = useSharedValue(0)
    const textSize = useSharedValue(15) // Cỡ chữ
    const textFont = useSharedValue(fonts.RM) // font chữ
    const USDT = useAppSelector(USDTFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const fee = useAppSelector(feeFuturesSelector) // Phí

    const core = useAppSelector(coreFuturesSelector) // Đòn bẫy
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect(() => {
        handleGetValueConfig()
    }, [])

    // Get phí giao dịch
    const handleGetValueConfig = async () => {
        let data = [0, 0]
        const resStart = await getValueConfig('FEEFUTURESTART')
        const resClose = await getValueConfig('FEEFUTURECLOSE')
        data[0] = resStart?.data[0]?.value || 0
        data[1] = resClose?.data[0]?.value || 0
        dispatch(futuresSlice.actions.setFee(data))
    }

    const exchangeRate = coins.filter(item => item.symbol == symbol)[0]?.close || 0 // Giá đóng
    let BALANCE = profile.balance // Balance

    const size = BALANCE * core
    const feeStart = size * (fee[0] / 100) // Phí bắt đầu
    const feeEnd = size * (fee[1] / 100) // Phí kết thúc
    BALANCE = BALANCE - feeStart - feeEnd // BALANCE còn lại sau khi tính phí
    // Nếu user chọn USDT thì quy đổi ra usd còn ko thì đổi sang tỉ giá đồng coin mà user chọn
    const max = USDT ? BALANCE * core : BALANCE * core / exchangeRate

    return (
        <Box>
            <Amount
                {...{
                    max,
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
            <Slider
                {...{
                    max,
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
        </Box>
    )
}

export default AmountSlider
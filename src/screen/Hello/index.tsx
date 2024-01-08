import { getProfileThunkUserID } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch } from '@hooks/index'
import { styles } from '@navigation/Container'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userSlice from '@slice/userSlice'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Hello = ({ navigation }: any) => {
    const { i18n } = useTranslation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Ẩn bottom tab
        navigation.getParent()?.setOptions({ tabBarStyle: styles.noneContainer })
        // function sẽ thực thi sau 2 giây
        const timer = setTimeout(async () => {
            // lấy ngôn ngữ được lưu trong storage
            const lng = await AsyncStorage.getItem(contants.LANGUAGE) || 'en'
            i18n.changeLanguage(lng) // thay đổi ngôn ngữ

            // lấy theme được lưu trong storage
            const theme = await AsyncStorage.getItem(contants.THEME) || 'light'
            dispatch(userSlice.actions.setTheme(theme)) // set theme

            // lấy token được lưu trong storage
            const token = await AsyncStorage.getItem(contants.TOKEN) || null
            // nết có token thì lấy profile từ API của server và set state profile trong redux
            if (token) {
                await dispatch(getProfileThunkUserID())
            }
            navigation.replace(screen.HOME) // chuyển đến màn hình home
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // Tăng khoảng cách các chữ cái trong chữ "HOTX" => "H O T X"
    const applyLetterSpacing = (string: string, count = 3) => {
        return string?.split('')?.join('\u200A'.repeat(count));
    }

    return (
        <Box flex={1} backgroundColor={'#11181e'} alignCenter justifyCenter>
            <Img
                source={require('@images/logohx.png')}
                width={200}
                height={200}
            />
            <Txt color={'#ecb800'} marginTop={20} size={30} bold>{applyLetterSpacing('HOTX')}</Txt>
        </Box>
    )
}

export default Hello
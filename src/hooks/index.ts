import { styles } from "@navigation/Container";
import { useNavigation } from "@react-navigation/native";
import { themeUserSelector } from "@selector/userSelector";
import futuresSlice from "@slice/futuresSlice";
import { colors } from "@theme/colors";
import contants from "@util/contants";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ICoins } from "src/model/futuresModel";
import { AppDispatch, RootState } from "src/redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// hide or show bottomtab
export const hideBottomTab = () => {
  const navigation = useNavigation()
  const theme = useTheme()

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: styles.noneContainer })
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
    }
  }, [])
}

export const useTheme = () => {
  const THEME = colors[useAppSelector(themeUserSelector)]
  return THEME
}

export const getCoinsFromSocket = async () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    const newSocket = io(contants.HOSTING)

    newSocket.on('listCoin', (coins: ICoins[]) => {
      if (coins) {
        dispatch(futuresSlice.actions.setCoins(coins))
      }
    })

    const blur = navigation.addListener('blur', () => {
      newSocket.disconnect()
    })

    const focus = navigation.addListener('focus', () => {
      newSocket.connect()
    })

    return () => {
      blur
      focus
    }
  }, [])
}
import Box from "@commom/Box"
import Icon from "@commom/Icon"
import { hideBottomTab, useAppDispatch, useAppSelector, useTheme } from "@hooks/index"
import { delay } from "@method/alert"
import { styles as styled } from "@navigation/Container"
import { useNavigation } from "@react-navigation/native"
import KeyBoardSafe from "@reuse/KeyBoardSafe"
import { loadingTradeSelector } from "@selector/tradeSelector"
import tradeSlice from "@slice/tradeSlice"
import { colors } from "@theme/colors"
import { useEffect } from "react"
import { AppState, AppStateStatus, StyleSheet, View } from "react-native"
import Date from "./Date"
import Diagram from "./Diagram"
import Footer from "./Footer"
import Header from "./Header"
import History from "./History"
import Statistical from "./Statistical"
import Times from "./Times"

export default () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const loading = useAppSelector(loadingTradeSelector)

  hideBottomTab()

  useEffect(() => {
    // Khi màn hình focus set loading = true
    const focus = navigation.addListener('focus', () => {
      dispatch(tradeSlice.actions.setLoading(true))
    })
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      focus
    }
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      dispatch(tradeSlice.actions.setLoading(true))
    }
  }

  useEffect(() => {
    // Nếu loading = true, sau 1 giây set loading = false
    if (loading) {
      delay(1000).then(() => {
        dispatch(tradeSlice.actions.setLoading(false))
        // ẩn bottom tab
        navigation.getParent()?.setOptions({ tabBarStyle: styled.noneContainer })
      })
    }
  }, [loading])

  // refesh lại màn hình khi kéo component
  const handleRefesh = () => {
    dispatch(tradeSlice.actions.setLoading(true))
  }

  return (
    <View style={styles.container}>
      <KeyBoardSafe
        refesh={loading}
        onRefesh={handleRefesh}
        bg={theme.bg}
        paddingBottom={10}
      >
        {!loading ?
          <>
            <Header />
            <Statistical />
            <Times />
            <Diagram />
            <Date />
            <History />
          </> :
          <Box flex={1} alignCenter justifyCenter>
            <Icon
              size={100}
              source={require('@images/logohx.png')}
            />
          </Box>
        }
      </KeyBoardSafe>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black2,
  }
})
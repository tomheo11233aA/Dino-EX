import Box from "@commom/Box"
import { hideBottomTab, useAppDispatch, useAppSelector, useTheme } from "@hooks/index"
import { delay } from "@method/alert"
import KeyBoardSafe from "@reuse/KeyBoardSafe"
import LoadingYellow from "@reuse/LoadingYellow"
import { loadingTradeSelector } from "@selector/tradeSelector"
import tradeSlice from "@slice/tradeSlice"
import { colors } from "@theme/colors"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
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
  const loading = useAppSelector(loadingTradeSelector)
  
  hideBottomTab()

  useEffect(() => {
    console.log('abc')
    dispatch(tradeSlice.actions.setLoading(true))
  }, [])

  useEffect(() => {
    if (loading) {
      delay(1000).then(() => dispatch(tradeSlice.actions.setLoading(false)))
    }
  }, [loading])

  return (
    <View style={styles.container}>
      <KeyBoardSafe bg={theme.bg} paddingBottom={10}>
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
            <LoadingYellow />
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
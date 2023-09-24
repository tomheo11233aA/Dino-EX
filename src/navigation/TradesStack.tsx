import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConvertTrades from '@screen/ConvertTrades'
import FuturesHistory from '@screen/FuturesHistory'
import HotTeller from '@screen/HotTeller'
import P2pTab from '@screen/P2pTab'
import Trades from '@screen/Trades'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const TradesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.TRADES} component={Trades} />
      <Stack.Screen name={screen.FUTURES_HISTORY} component={FuturesHistory} />
      <Stack.Screen name={screen.HOT_TELLER} component={HotTeller} />
      <Stack.Screen name={screen.P2P_TAB} component={P2pTab} />
      <Stack.Screen name={screen.CONVERT_TRADES} component={ConvertTrades} />
    </Stack.Navigator>
  )
}

export default TradesStack
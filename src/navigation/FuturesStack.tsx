import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Futures from '@screen/Futures'
import SharePositions from '@screen/SharePositions'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const FuturesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.FUTURES} component={Futures} />
      <Stack.Screen name={screen.SHARE_POSITIONS} component={SharePositions} />
    </Stack.Navigator>
  )
}

export default FuturesStack
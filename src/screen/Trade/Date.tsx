import { useTheme } from '@hooks/index'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ItemMoment from './ItemMoment'

const types = ['MA', 'EMA', 'BOLL', 'VOL', 'MACD', 'RSI', 'KDJ', 'OBV']

const dates = [
    { day: 'Today', value: 2.27 },
    { day: '7 Days', value: 2.22 },
    { day: '30 Days', value: 50.38 },
    { day: '90 Days', value: 49.08 },
    { day: '180 Days', value: -19.71 },
    { day: '1 Year', value: -82.45 },
]

const Date = () => {
    const theme = useTheme()
    const type: string = 'MA'
    const { t } = useTranslation()

    return (
        <View>
            <View style={[styles.content, { borderColor: theme.line2 }]}>
                {types.map((item) =>
                    <TouchableOpacity
                        key={item}
                        style={{ marginHorizontal: 10 }}
                    >
                        <Text style={[
                            { color: type === item ? theme.black : '#707781' }
                        ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingVertical: 5,
                }}
            >
                {dates.map((item) =>
                    <ItemMoment
                        key={item.day}
                        item={item}
                        t={t}
                    />
                )}
            </View>

            <View style={{ backgroundColor: theme.black3, height: 5 }} />
        </View>
    )
}

export default Date

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 5,
    }
})
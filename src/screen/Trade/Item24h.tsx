import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    title: any | string,
    value: string,
    topValue?: number
}

const Item24h = ({ title, value, topValue = 0 }: Props) => {
    const theme = useTheme()
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={{ color: '#7c828e', fontSize: 9, }}>
                {title}
            </Text>
            <Text
                style={{
                    color: theme.black,
                    fontSize: 11,
                    fontFamily: fonts.M23,
                    marginTop: topValue + 3,
                }}
            >
                {value.replace('M', '')}
                {value.includes('M') &&
                    <Text style={{
                        color: theme.black,
                        fontSize: 9,
                        fontFamily: fonts.FSCR,
                    }}>
                        M
                    </Text>
                }
            </Text>
        </View>
    )
}

export default Item24h
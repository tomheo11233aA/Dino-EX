import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Text, View } from 'react-native'

const ItemMoment = ({ item, t }: any) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text
                style={{
                    color: colors.grayBlue,
                    fontSize: 12,
                    fontFamily: fonts.FSCR,
                    fontWeight: '400',
                }}
            >
                {t(item.day)}
            </Text>
            <Text
                style={{
                    color: item.value >= 0 ? colors.greenCan : colors.redCan,
                    fontSize: 12,
                    fontFamily: fonts.FSCR,
                    fontWeight: '400',
                }}>
                {item.value}%
            </Text>
        </View>
    )
}

export default ItemMoment
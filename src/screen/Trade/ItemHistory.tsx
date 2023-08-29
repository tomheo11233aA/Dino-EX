import { colors } from '@theme/colors'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const ItemHistory = ({ history, t, theme }: any) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text
                style={{
                    color: history.id === 0 ? theme.black : colors.grayBlue,
                    marginHorizontal: 5,
                    fontWeight: 'bold',
                    fontSize: 16,
                }}
            >
                {t(history.name)}
            </Text>
            {history.id === 0 &&
                <View
                    style={{
                        width: 30,
                        height: 4,
                        backgroundColor: colors.yellow,
                        marginTop: 5,
                    }}
                />
            }
        </TouchableOpacity>
    )
}

export default ItemHistory
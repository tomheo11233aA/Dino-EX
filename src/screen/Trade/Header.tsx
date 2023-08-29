import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import { coinChoosedSpotSelector } from '@selector/spotSelector'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const Header = () => {
    const theme = useTheme()
    const coinChoose = useAppSelector(coinChoosedSpotSelector)

    return (
        <View style={styles.container}>
            <View style={styles.symbolContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        source={require('@images/trade/convert.png')}
                        width={23}
                        height={23}
                        resizeMode={'contain'}
                        marginRight={10}
                        tintColor={theme.black}
                    />
                    <Txt color={theme.black} bold size={16}>
                        {coinChoose.currency + '/USDT'}
                    </Txt>
                </View>
            </View>

            <View style={styles.content}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Img
                        source={require('@images/back.png')}
                        width={20}
                        height={20}
                    />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Img
                            source={require('@images/trade/share.png')}
                            width={20}
                            height={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Img
                            source={require('@images/trade/box.png')}
                            width={25}
                            height={25}
                            resizeMode={'contain'}
                            marginHorizontal={15}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Img
                            source={require('@images/trade/star.png')}
                            width={25}
                            height={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    symbolContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: 50,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30
    },
    container: {
        padding: 10,
    }
})
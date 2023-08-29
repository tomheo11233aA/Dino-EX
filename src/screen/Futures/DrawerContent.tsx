import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import FindCoin from './FindCoin'
import ListCoin from './ListCoin'
import TypeCoin from './TypeCoin'
import { useTheme } from '@hooks/index'

const DrawerContent = ({ close }: { close: Function }) => {
    const theme = useTheme()
    return (
        <KeyBoardSafe styles={styles.container}>
            <FindCoin {...{theme}} />
            <TypeCoin {...{theme}}/>
            <ListCoin close={close} />
            <Box
                paddingHorizontal={15}
                absolute
                bottom={Platform.OS === 'ios' ? 10 : 100}
                width={'100%'}
            >
                <Box
                    row
                    alignCenter
                    justifySpaceBetween
                    height={38}
                    backgroundColor={colors.gray}
                    paddingHorizontal={10}
                    radius={3}
                >
                    <Txt
                        size={11}
                        color={colors.yellowBold}
                        fontFamily={fonts.FSCR}
                    >
                        View big data transactions
                    </Txt>
                    <Box rotateZ={'180deg'}>
                        <Icon
                            source={require('@images/back.png')}
                            size={9}
                        />
                    </Box>
                </Box>
            </Box>
        </KeyBoardSafe>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        paddingTop: Platform.OS === 'ios' ? 0 : 30
    }
})
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import FindCoin from './FindCoin'
import ListCoin from './ListCoin'
import TypeCoin from './TypeCoin'
import { useTheme } from '@hooks/index'

const DrawerContent = ({ close }: { close: Function }) => {
    const theme = useTheme()
    const [search, setSearch] = useState('')

    return (
        <KeyBoardSafe styles={styles.container}>
            <FindCoin {...{ theme, search, setSearch }} />
            <TypeCoin {...{ theme }} />
            <ListCoin
                close={close}
                search={search}
            />
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
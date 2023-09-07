import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import { screen } from '@util/screens'
import React from 'react'
import { StyleSheet } from 'react-native'

const Button = ({ t }: any) => {
    const theme = useTheme()
    return (
        <Box>
            <Box row alignCenter marginVertical={10}>
                <Btn
                    style={styles.btn}
                    backgroundColor={theme.gray2}
                    onPress={() => navigate(screen.COIN_LIST)}
                >
                    <Txt fontFamily={fonts.IBMPM} color={theme.black}>
                        {t('Deposit')}
                    </Txt>
                </Btn>

                <Btn
                    marginLeft={10}
                    style={styles.btn}
                    backgroundColor={colors.yellow}
                >
                    <Txt fontFamily={fonts.IBMPM}>{t('Withdraw')}</Txt>
                </Btn>
            </Box>

            <Box
                height={4}
                width={width}
                marginTop={10}
                marginLeft={-20}
                backgroundColor={theme.gray}
            />
        </Box>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        height: 33,
        borderRadius: 5,
        fontSize: 13,
    }
})
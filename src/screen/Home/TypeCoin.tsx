import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TypeCoin = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const list: string[] =
        ['Favorites', 'Hot', 'Gainers', 'Losers', 'New Listings', '24h Vol']

    return (
        <Box marginTop={20}>
            <Scroll horizontal showsHorizontalScrollIndicator={false}>
                {list.map(item =>
                    <Box
                        key={item}
                        marginRight={20}
                        backgroundColor={item === 'Favorites' && theme.gray}
                        paddingHorizontal={8}
                        paddingVertical={3}
                        radius={3}
                    >
                        <Txt
                            size={13}
                            fontFamily={fonts.RM}
                            color={item === 'Favorites' ? theme.black : colors.gray5}
                        >
                            {t(item)}
                        </Txt>
                    </Box>
                )}
            </Scroll>
        </Box>
    )
}

export default TypeCoin
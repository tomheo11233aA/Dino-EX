import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { useTheme } from '@hooks/index'
import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'

interface Props {
    bg?: string,
    styles?: any,
    paddingBottom?: number,
    paddingHorizontal?: number
    children: JSX.Element | JSX.Element[],
}

const KeyBoardSafe = ({
    bg,
    styles,
    children,
    paddingBottom = 500,
    paddingHorizontal = 0
}: Props) => {
    const theme = useTheme()

    const background = bg ? bg : theme.bg

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}
            behavior='padding'
            enabled
            style={[{
                flex: 1,
                backgroundColor: background,
            }, styles]}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Box
                    flex={1}
                    // isPaddingAdnroid
                    paddingTop={Platform.OS === 'android' ? 10 : 0}
                >
                    <Scroll
                        flexGrow={1}
                        nestedScrollEnabled={true}
                        paddingBottom={paddingBottom}
                        showsVerticalScrollIndicator={false}
                        paddingHorizontal={paddingHorizontal}
                        showsHorizontalScrollIndicator={false}
                    >
                        {children}
                    </Scroll>
                </Box>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default KeyBoardSafe
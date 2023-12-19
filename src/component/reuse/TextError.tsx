import React from 'react'
import Txt from '@commom/Txt'
// Show Text có chữ màu đỏ
const TextError: React.FunctionComponent<{ text?: any }> = ({ text }) => {
    return (
        <Txt
            color={'red'}
            marginTop={10}
            alignSelf={'flex-start'}
        >
            {text}
        </Txt>
    )
}

export default TextError
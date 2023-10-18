import { colors } from '@theme/colors'
import React from 'react'
import { G, Path } from 'react-native-svg'

const PathLine = ({ dPatchGreen, dPatchRed, ma }: any) => {
    return (
        <G>
            <Path
                d={dPatchGreen}
                stroke={colors.green2}
                fill={colors.green2}
            />
            <Path
                d={dPatchRed}
                stroke={colors.red3}
                fill={colors.red3}
            />
            <Path
                key={'P_MA7'}
                d={ma.ma7}
                strokeWidth={1}
                stroke={colors.yellow}
                fill={'none'}
            />
            <Path
                key={'P_MA25'}
                d={ma.ma25}
                strokeWidth={1}
                stroke={colors.ma25}
                fill={'none'}
            />
            <Path
                key={'P_MA99'}
                d={ma.ma99}
                strokeWidth={1}
                stroke={colors.ma99}
                fill={'none'}
            />
        </G>
    )
}

export default PathLine
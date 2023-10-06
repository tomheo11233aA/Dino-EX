import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import TraderItem from './TraderItem'

interface Props {
    t: any;
    theme: any;
}

const HotTraders = ({ theme, t }: Props) => {
    const data = [0, 1, 2]

    return (
        <Box marginTop={15}>
            <FlatList
                //   refreshControl={
                //     <RefreshControl
                //       refreshing={false}
                //       onRefresh={hanldeRefesh}
                //     />
                //   }
                renderItem={
                    ({ item }) =>
                        <TraderItem
                            {...{ theme, t }}
                        />
                }
                data={data}
                initialNumToRender={10}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any) => item.toString()}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
        </Box>
    )
}

export default HotTraders
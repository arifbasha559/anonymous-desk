import { View, Text } from 'react-native'
import React from 'react'
import SecureStore from 'expo-secure-store'

export default function demo() {
    const token = async () => {

        return await SecureStore.getItemAsync('ad_push_token');

    }
    let asda=token()
    console.log(asda);

    return (
        <View>
            <Text>demo</Text>
        </View>
    )
}
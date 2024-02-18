import React from 'react'
import { Text, View } from 'react-native';

export const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ padding: 20, margin: 10, fontSize: 20, backgroundColor: "black", color: "#ffffff" }} onPress={() => {
                navigation.navigate("List")
            }} >List Screen</Text>
            <Text style={{ padding: 20, margin: 10, fontSize: 20, backgroundColor: "black", color: "#ffffff" }} onPress={() => {
                navigation.navigate("Color")
            }} >color</Text>
        </View>
    );
}

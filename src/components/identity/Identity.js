import React, { Component } from 'react'
import { Text, View } from "react-native"
import styles from "./styles";


export default class Identity extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textIdentity}>
                    API Search React Native Expo App
                </Text>
            </View>
        )
    }
}

import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

const CountDownTimer = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.time}>
            0:11:07
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        borderRadius: 100,
        borderWidth: 2,
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default CountDownTimer
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const ToggleTask = () => {
    const backgroundColor = '#1F9974'
  return (
    <Pressable
        style={({pressed}) => [
            {
                backgroundColor: pressed ? backgroundColor + '80' : backgroundColor
            }, styles.button
        ]}
           >
        <Text>Start Task</Text>
    </Pressable>

  )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 60,
        borderRadius: 40
    }
})

export default ToggleTask
import { View, Text, StyleSheet, TextProps } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'

interface GradientTextProps extends TextProps {
    colors: string[];
}

const Header = ({colors, style, ...props}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...props} style={style} />}>
        <LinearGradient colors={colors}
        locations={[0, 0.5, 1]} start={{x:0, y:0}} end={{x:1, y:0}}>
            <Text {...props} style={[style, { opacity: 0}]} />
        </LinearGradient>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    }
})

export default Header
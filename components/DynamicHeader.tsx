import React from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

type Props = Animated.Value;

const maxHeaderHeight = 200;
const minHeaderHeight = 70;
const scrollDistance = maxHeaderHeight - minHeaderHeight;

const DynamicHeader = ({ animHeaderValue }: Props) => {
  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: "clamp",
  });

  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, maxHeaderHeight - minHeaderHeight],
    outputRange: ["blue", "red"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animateHeaderBackgroundColor,
        },
      ]}
    >
      <Text>Taskr</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DynamicHeader;

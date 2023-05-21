import React, { useRef } from "react";
import SingleTask from "../components/SingleTask";
import { View, StyleSheet, Text, SafeAreaView, Animated } from "react-native";
import Tasks from "../components/Tasks";
import DynamicHeader from "../components/DynamicHeader";

const TaskrApp = () => {
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Taskr</Text>
      </View>
      <Tasks />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(211,211,211, 0.5)',
    padding: 16,
    backgroundOpacity: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

});

export default TaskrApp;

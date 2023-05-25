import React from "react";
import { View, StyleSheet, ScrollView, Animated, Text } from "react-native";
import { exampleTasks } from "../constants/exampleTasks";
import SingleTask from "./SingleTask";
import { Task } from "../redux/tasksSlice";
import { useAppSelector } from "../redux/hooks";

interface TasksProps {
  scrollY: Animated.Value;
  headerHeight: number;
}

const Tasks = ({ scrollY, headerHeight }: TasksProps) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  if (tasks.length === 0) {
    console.log("no tasks");
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No tasks.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tasks.length === 0 && (
        <View style={styles.container}>
          <Text style={styles.text}>No tasks.</Text>
        </View>
      )}
      <Animated.ScrollView
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 40 }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {tasks.map((item) => (
          <View key={item.id}>
            <SingleTask task={item} />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
    width: "100%",
    gap: 5,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 2,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#CBCBCB",
    textAlign: "center",
  },
});

export default Tasks;

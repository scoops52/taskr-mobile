import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Task } from "../redux/tasksSlice";
import CountDownTimer from "./CountDownTimer";
import ToggleTask from "./ToggleTask";

interface TaskProps {
  task: Task;
}

const SingleTask = ({ task }: TaskProps) => {
  const hours = Math.floor(task.duration / 60);
  const minutes = Math.floor(task.duration % 60);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{task.name}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text>
            {hours} Hr {minutes} Min
          </Text>
          <ToggleTask />
          <Text>--:-- - --:--</Text>
        </View>
        <View style={styles.timerContainer}>
          <CountDownTimer />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    backgroundColor: `rgba(192, 38, 211, 0.5)`,

    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    height: 250,
  },
  innerContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 32,
    fontWeight: "600",
    color: "rgba(0,0,0,0.75)",
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleTask;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Task } from "../redux/tasksSlice";
import CountDownTimer from "./CountDownTimer";
import ToggleTask from "./ToggleTask";
import { useAppDispatch } from "../redux/hooks";

export interface TaskProps {
  task: Task;
}

const SingleTask = ({ task }: TaskProps) => {
  const dispatch = useAppDispatch();
  const hours = Math.floor(task.duration / 60);
  const minutes = Math.floor(task.duration % 60);
  const backgroundColor = `${task.backgroundColor}80`

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.header}>{task.name}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            {hours} Hr {minutes} Min
          </Text >
          <ToggleTask task={task} />
          <Text style={styles.info}>3:11 PM - 4:11 PM</Text>
        </View>
        <View style={styles.timerContainer}>
          <CountDownTimer task={task} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    height: 250,
  },
  header: {
    fontSize: 32,
    fontWeight: "600",
    color: "rgba(0,0,0,0.75)",
  },
  innerContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    marginTop: 15,
    width: "50%",
    display: "flex",
    gap: 15,
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleTask;

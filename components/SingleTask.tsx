import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Task } from "../redux/tasksSlice";
import CountDownTimer from "./CountDownTimer";
import ToggleTask from "./ToggleTask";
import { useAppDispatch } from "../redux/hooks";
import ProgressTimer from "./ProgressTimer";

export interface TaskProps {
  task: Task;
}

const SingleTask = ({ task }: TaskProps) => {
  const dispatch = useAppDispatch();
  const hours = Math.floor(task.duration / 60);
  const minutes = Math.floor(task.duration % 60);
  const backgroundColor = `${task.color}80`

  return (
    <View style={[styles.container, { backgroundColor }, task.isActive && styles.activeStyles, { borderColor: task.color} ]}>
      <Text style={[styles.name, { color: task.color }]}>{task.name}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={[styles.info, { color: task.color }]}>
            {hours} Hr {minutes} Min
          </Text >
          <ToggleTask task={task} />
          <Text style={[styles.info, { color: task.color }]}>3:11 PM - 4:11 PM</Text>
        </View>
        <View style={styles.timerContainer}>
          <ProgressTimer task={task} />
          {/* <CountDownTimer task={task} /> */}
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
  activeStyles: {
    borderWidth: 3,
  },
  name: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: 'center',
    marginBottom: 10,

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
    fontSize: 16,
    fontWeight: '500',

  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleTask;

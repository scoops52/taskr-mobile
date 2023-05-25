import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React from "react";
import { TaskModalProps } from "./EditTask";
import { useAppDispatch } from "../redux/hooks";
import { editTask, removeTask, Task } from "../redux/tasksSlice";

const CompleteTask = ({ visible, onClose, task }: TaskModalProps) => {
  const dispatch = useAppDispatch();
  const initialHours = task ? Math.floor(task.duration / 60) : null;
  const initialMinutes = task ? Math.floor(task.duration % 60) : null;

  const durationString =
    initialHours && initialMinutes
      ? `${initialHours} hours & ${initialMinutes} minutes`
      : initialMinutes
      ? `${initialMinutes} minutes`
      : `${initialHours} hours`;
  const handleComplete = () => {
    dispatch(removeTask(task.id));
    onClose();
  };

  const resetTimeRemaining = task.duration * 60;
  const resetTask: Task = {
    ...task,
    isActive: false,
    timeRemaining: resetTimeRemaining,
    
  };
  const handleRestart = () => {
    dispatch(editTask(resetTask));
    onClose();
  };
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { borderColor: task.color }]}>
          <Text
            style={[
              styles.modalHeader,
              { color: task.color, borderColor: task.color },
            ]}
          >
            Good Job!
          </Text>
          <Text style={[styles.modalText, { color: task.color }]}>
            You worked on the task:
          </Text>
          <Text style={[styles.modalText, { color: task.color }]}>
            "{task.name}"
          </Text>
          <Text style={[styles.modalText, { color: task.color }]}>
            for {durationString}
          </Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={handleComplete}
              style={({ pressed }) => [
                styles.submit,
                pressed && styles.submitPressed,
                { backgroundColor: task.color },
              ]}
            >
              <Text style={styles.submitText}>Complete Task</Text>
            </Pressable>
            <Pressable
              onPress={handleRestart}
              style={({ pressed }) => [
                styles.restart,
                styles.submit,
                pressed && styles.submitPressed,
                { borderColor: task.color },
              ]}
            >
              <Text style={[styles.submitText, { color: task.color }]}>
                Reset Task
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "#2D2D2D",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    gap: 15,
  },
  modalHeader: {
    fontSize: 30,
    fontWeight: "bold",
    borderWidth: 0,
    borderBottomWidth: 2,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  submit: {
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  submitPressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.5,
  },
  restart: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
});
export default CompleteTask;

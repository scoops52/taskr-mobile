import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import React from "react";
import { ModalProps } from "./CreateTask";

const About = ({ visible, onClose }: ModalProps) => {
  
    const handleClose = () => {
        onClose();
        console.log('closing about modal')
    }
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable onPress={handleClose}  style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>About</Text>
          <Text style={styles.modalText}>
          Scheduling your day can be tough. There are countless ways to go about setting yourself up for productivity. One such technique that has become popular is the concept of TIMEBLOCKING: taking a block of time to focus on one particular task, and only that task for the prescribed amount of time. This improves focus and reduces stress around tasks. The thought of completing a whole project or learning a new skill is daunting, but the idea of 3 hours of focused work on it a day is much more manageable and sustainable, leading to long term success.
          </Text>
          <Text style={styles.modalText}>The problem with most Time Blocking apps today is that you still must put these blocks into a daily schedule, with each block running from a designated start time to a designated end time. While this might be helpful to someone with a personal assistant, most people find that daily schedules rarely go to plan. What happens if your dog needs to go out during your time block, or an important phone call comes in? With Taskr, you can simply set the amount of total time you want to spend on a singular task. You can keep track of that time throughout the day, stopping and starting when it is best for you without having to constantly rearrange your schedule. </Text>
          <Text style={styles.modalText}>Happy Tasking!</Text>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#2D2D2D",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#CBCBCB",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 15
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#CBCBCB",
  },
  modalText: {
    fontSize: 16,
    color: "#CBCBCB",
    textAlign: "center"
  },
});

export default About;

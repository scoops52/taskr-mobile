import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import React from "react";
import { ModalProps } from "./CreateTask";
import { useAppDispatch } from "../redux/hooks";
import { clearAllTasks } from "../redux/tasksSlice";

const ClearAll = ({ visible, onClose }: ModalProps) => {
    const dispatch = useAppDispatch();
    const handleClear = () => {
        dispatch(clearAllTasks());
        onClose();
    }
    const handleClose = () => {
        onClose();
        console.log('closing ClearAll modal')
    }
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable onPress={handleClose}  style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Are you sure?</Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={handleClear}
              style={({ pressed }) => [
                styles.clear, {backgroundColor: "#b80c09"},
                pressed && styles.submitPressed,
            
              ]}
            >
              <Text style={styles.submitText}>Delete</Text>
            </Pressable>
            <Pressable 
              onPress={handleClose}
              style={({ pressed }) => [
                styles.cancel,
                styles.clear,
                pressed && styles.submitPressed,
                
              ]}
            >
              <Text style={[styles.submitText]}>
                Cancel
              </Text>
            </Pressable>
          </View>
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    gap: 15,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#CBCBCB",
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  clear: {
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
  cancel: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
});

export default ClearAll;

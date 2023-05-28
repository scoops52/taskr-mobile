import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import React from "react";
import { ModalProps } from "./CreateTask";
import { useAppSelector } from "../redux/hooks";

const HowTo = ({ visible, onClose }: ModalProps) => {
    const light = useAppSelector(state => state.theme.theme === 'light')
    const handleClose = () => {
        onClose();
    }
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable onPress={handleClose}  style={styles.container}>
        <View style={[styles.modalContent, { backgroundColor: light ?  "#CBCBCB" : "#2D2D2D" }]}>
          <Text style={[styles.modalTitle, { color: light ?  "#2D2D2D" : "#CBCBCB"  }]}>How To:</Text>
          <Text style={[styles.modalText, { color: light ?  "#2D2D2D" : "#CBCBCB"  }]}>
          Click on the plus sign in the bottom-right corner to add a task. 
          </Text>
          <Text style={[styles.modalText, { color: light ?  "#2D2D2D" : "#CBCBCB"  }]}>
          Set the name, duration, and color. 
          </Text>
          <Text style={[styles.modalText, { color: light ?  "#2D2D2D" : "#CBCBCB"  }]}>
          Example: 'Study' or 'Practice Guitar' 
          </Text>
          <Text style={[styles.modalText, { color: light ?  "#2D2D2D" : "#CBCBCB"  }]}>
          To edit press on the task. Swipe left on any task to delete it. 
          </Text>
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

export default HowTo;

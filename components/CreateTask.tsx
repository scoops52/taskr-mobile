import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { Picker } from "@react-native-picker/picker";

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateTask = ({ visible, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("green");
  const [outlineColor, setOutlineColor] = useState("green");
  const hoursArrray: number[] = Array.from({ length: 25 }, (v, i) => i);
  const minutesArray: number[] = Array.from({ length: 60 }, (v, i) => i);

  const handleClose = () => {
    onClose();
    console.log("pressed");
  };

  const handleHourChange = (itemValue: number) => {
    setSelectedHours(itemValue);
  };
  const handleMinuteChange = (itemValue: number) => {
    setSelectedMinutes(itemValue);
  };
  return (
    <Modal style={styles.container} animationType="slide" visible={visible}>
      <View style={styles.container}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Task Name"
        />
        <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedHours}
              onValueChange={handleHourChange}
            >
              {hoursArrray.map((hour) => (
                <Picker.Item key={hour} label={`${hour}`} value={hour} />
              ))}
            </Picker>
            <Text>Hours</Text>
          
            <Picker
              style={styles.picker}
              selectedValue={selectedMinutes}
              onValueChange={handleMinuteChange}
            >
              {minutesArray.map((minute) => (
                <Picker.Item key={minute} label={`${minute}`} value={minute} />
              ))}
            </Picker>
            <Text>Minutes</Text>
        </View>
      </View>
      <View>
        <Pressable style={styles.button} onPress={handleClose}>
          <Text>Close Modal</Text>
        </Pressable>
        <Text>{selectedHours}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 125,
    height: 60,
    borderRadius: 40,
  },
  pickerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  picker: {
    height: 200,
    width: 100,
  },
});

export default CreateTask;

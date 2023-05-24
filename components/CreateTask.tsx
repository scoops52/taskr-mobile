import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { createTask } from "../redux/tasksSlice";

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateTask = ({ visible, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [selectedHours, setSelectedHours] = useState(2);
  const [selectedMinutes, setSelectedMinutes] = useState(30);
  const [selectedColor, setSelectedColor] = useState("green");
  const hoursArray: number[] = Array.from({ length: 25 }, (v, i) => i % 25);
  const minutesArray: number[] = Array.from({ length: 60 }, (v, i) => i);
  const colorArray: string[] = ['#679436', '#F680F7', '#ba179d', '#ffc95c', '#29abe2' ]

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
  const duration = selectedHours * 60 + selectedMinutes;
  const handleSubmit = () => {
    dispatch(createTask({
        id: Math.floor(Math.random() * 1000),
        name,
        duration,
        isActive: false,
        timeRemaining: duration * 60,
        endTime: 0,
        color: selectedColor
    }));
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={styles.title}>Create a Task</Text>
            <Pressable style={styles.button} onPress={handleClose}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.optionsContainer}>
              <TextInput
                inputMode="text"
                keyboardAppearance="dark"
                value={name}
                onChangeText={setName}
                placeholder="Task Name"
                placeholderTextColor="#505050"
                style={styles.input}
              />
              <View>
              <Text style={styles.label}>Duration:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedHours}
                  onValueChange={handleHourChange}
                >
                  {hoursArray.map((hour) => (
                    <Picker.Item
                      key={hour}
                      label={`${hour}`}
                      value={hour}
                      color="#CBCBCB"
                    />
                  ))}
                </Picker>
                <Text style={styles.pickerText}>Hours</Text>

                <Picker
                  style={styles.picker}
                  selectedValue={selectedMinutes}
                  onValueChange={handleMinuteChange}
                >
                  {minutesArray.map((minute) => (
                    <Picker.Item
                      key={minute}
                      label={`${minute}`}
                      value={minute}
                      color="#CBCBCB"
                    />
                  ))}
                </Picker>
                <Text style={styles.pickerText}>Minutes</Text>
              </View>
              </View>
              <View>
                    <Text style={styles.label}>Color:</Text>
                    <View style={styles.colorSelector}>
                        {colorArray.map((color, index) => (
                            <Pressable
                              key={index}
                              onPress={() => setSelectedColor(color)}
                              style={({pressed}) =>
                                [styles.colorBtn, { backgroundColor: color + '80', borderColor: color }, selectedColor === color && styles.selectedColor]}
                            />
                        ))}
                    </View>
              </View>
            <Pressable onPress={handleSubmit} style={({pressed}) =>
             [styles.submit, pressed && styles.submitPressed]}>
              <Text style={styles.submitText}>Create Task</Text>
            </Pressable>
            </View>
          </View>
        </View>
    </Modal>
  );
};

const screenHeight = Dimensions.get("window").height;
const modalHeight = screenHeight * 0.9;
const screenWidth = Dimensions.get("window").width;
const modalWidth = screenWidth;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  container: {
    backgroundColor: "#1C1C1C",
    borderRadius: 11,
    width: modalWidth,
    height: modalHeight,
    alignItems: "center",
  },
  head: {
    width: "100%",
    backgroundColor: "#2D2D2D",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  optionsContainer: {
    gap: 60,
  },
  input: {
    height: 50,
    fontSize: 22,
    width: modalWidth * 0.8,
    borderColor: "#737373",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 20,
    color: "#CBCBCB",
  },
  label: {
    color: "#737373",
    fontSize: 22,
    width: modalWidth * 0.8,
  },
  pickerText: {
    fontSize: 16,
    color: "#737373",
  },
  button: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  close: {
    fontSize: 18,
  },
  pickerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  picker: {
    height: 200,
    width: 100,
  },
  colorSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  colorBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  selectedColor: {
    borderWidth: 2,
  },
  submit: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  submitText: {
    fontSize: 22,
    fontWeight: "bold"
  },
  submitPressed: {
    transform: [{scale: 0.9}],
    opacity: 0.5
  }
});

export default CreateTask;

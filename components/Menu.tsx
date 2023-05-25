import { View, Text, StyleSheet, Pressable, Modal, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { ModalProps } from "./CreateTask";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import About from "./About";
import ClearAll from "./ClearAll";
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'; 

const Menu = ({ visible, onClose }: ModalProps) => {
  const [about, setAbout] = useState(false);
  const [clear, setClear] = useState(false);
  const [themeToggle, setThemeToggle] = useState("Light");

  const handleAbout = () => {
    setAbout(true);
    onClose();
  };

  const aboutModalClose = () => {
    setAbout(false);
  };

  const handleClear = () => {
    setClear(true);
    onClose();
  };
  const clearModalClose = () => {
    setClear(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleTheme = () => {};

  return (
    <>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <Pressable onPress={handleClose} style={styles.container}>
          <View style={styles.menu}>
            <Pressable
              onPress={handleAbout}
              style={({ pressed }) => [
                styles.menuItem,
                { opacity: pressed ? 0.25 : 1 },
              ]}
            >
              <Text style={styles.menuItemText}>About</Text>
              <AntDesign name="infocirlceo" size={24} color="#CBCBCB" />
            </Pressable>
            <Pressable
              onPress={handleClear}
              style={({ pressed }) => [
                styles.menuItem,
                { opacity: pressed ? 0.25 : 1 },
              ]}
            >
              <Text style={styles.menuItemText}>Delete All Tasks</Text>
              <FontAwesome
                name="trash"
                size={24}
                color="#CBCBCB"
                style={{ marginLeft: 15 }}
              />
            </Pressable>
            <Pressable style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <Text style={[, styles.menuItemText]}>Toggle Theme</Text>
              <View style={styles.switchContainer}>
                <MaterialCommunityIcons name="weather-night" size={24} color="#CBCBCB" />
                <Switch />
                <Fontisto name="day-sunny" size={24} color="#CBCBCB" />
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <About visible={about} onClose={aboutModalClose} />
      <ClearAll visible={clear} onClose={clearModalClose} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flex: 1,
    paddingTop: 100,
    paddingRight: 50,
    alignItems: "flex-end",
  },
  menu: {
    backgroundColor: "#2D2D2D",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#CBCBCB",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#737373",
  },
  menuItemText: {
    fontSize: 20,
    color: "#CBCBCB",
  },
  switchContainer: {
    marginLeft: 20,
    flexDirection: "row",
    gap: 5,
  }
});

export default Menu;

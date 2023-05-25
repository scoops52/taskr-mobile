import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Animated, Pressable, Platform, StatusBar} from "react-native";
import Tasks from "../components/Tasks";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
 

import CreateTask from "../components/CreateTask";
import Header from "../components/Header";
import Menu from "../components/Menu";

const headerHeight = Platform.select({
  ios: 115,
  android: 70 + (StatusBar.currentHeight || 0),
  default: 80,
})

const TaskrApp = () => {
   const [create, setCreate] = useState(false);
   const [ menu, setMenu ] = useState(false);

   const handleMenu = () => {
    setMenu(true);
   }
   const handleCreate = () => {
    setCreate(true);
   }

   const closeModal = () => {
    setCreate(false);
    setMenu(false);
   }

   const scrollY = new Animated.Value(0);
   const diffClampScrollY = Animated.diffClamp(scrollY, 0, headerHeight);
   const headerY = diffClampScrollY.interpolate({
    inputRange:[0,headerHeight],
    outputRange:[0,-headerHeight]
   })

  return (
    <>
    <StatusBar barStyle='light-content' />
    <View style={styles.container}>
      <Pressable
          onPress={handleCreate}
          style={({pressed}) => [styles.createButton, { opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="add" size={45} color="#3D4ABA" style={styles.createButtonIcon} />
          </Pressable>
      <Animated.View style={[styles.header, {height: headerHeight, transform: [{ translateY: headerY }]}]}>
        <View style={styles.titleContainer}>
        <Header colors={['#f62ff9', '#6b67ea', '#73d808', ]} style={styles.title}>
            TASK
        </Header>
        <Text style={styles.title}>r</Text>
        </View>
        <Pressable onPress={handleMenu} style={({pressed}) => [styles.menu, { opacity: pressed ? 0.5 : 1 }]}>
          <SimpleLineIcons name="options-vertical" size={25} color="rgba(255,255,255,1)" />
        </Pressable>
      </Animated.View>
      <Tasks scrollY={scrollY} headerHeight={headerHeight} />
      <CreateTask visible={create} onClose={closeModal}  />
      <Menu visible={menu} onClose={closeModal}  />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(10,10,10)',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    backgroundColor: 'rgb(10,10,10)',
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    fontWeight: '700',
    color: '#CBCBCB',
    marginTop: 20,
  },
  menu: {
    position: 'absolute',
    top: 75,
    right: 30,
  },
  createButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 55,
    height: 55,
    backgroundColor: '#CBCBCB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    borderRadius: 100,
    zIndex: 10,
  },
  createButtonIcon: {
    marginTop: 0,
  }

});

export default TaskrApp;

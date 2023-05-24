import React, { useRef, useState } from "react";
import SingleTask from "../components/SingleTask";
import { View, StyleSheet, Text, SafeAreaView, Animated, Pressable, Modal } from "react-native";
import Tasks from "../components/Tasks";

import CreateTask from "../components/CreateTask";

const TaskrApp = () => {
   const [createModal, setCreateModal] = useState(false);

   const openCreateModal = () => {
    setCreateModal(true);
    console.log('opening modal')
   }

   const closeModal = () => {
    setCreateModal(false);
    console.log('closing modal')
   }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Taskr</Text>
        <Pressable
          onPress={openCreateModal}
          >
            <Text style={styles.title}>+</Text>
          </Pressable>
      </View>
      <CreateTask visible={createModal} onClose={closeModal}  />
      <Tasks />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(10,10,10)',
  },
  header: {
    padding: 16,
    backgroundOpacity: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },

});

export default TaskrApp;

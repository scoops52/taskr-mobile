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
        <Text>Taskr</Text>
        <Pressable
          onPress={openCreateModal}
          >
            <Text>+</Text>
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
  },
  header: {
    backgroundColor: 'rgba(211,211,211, 0.5)',
    padding: 16,
    backgroundOpacity: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

});

export default TaskrApp;

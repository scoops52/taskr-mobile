import React, { useEffect, useRef, useState, } from "react";
import { View, StyleSheet, Text, Animated, Pressable} from "react-native";
import { Task, removeTask } from "../redux/tasksSlice";

import ToggleTask from "./ToggleTask";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ProgressTimer from "./ProgressTimer";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask"
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import CompleteTask from "./CompleteTask";
import BackgroundTimer from "./BackgroundTimer";

export interface TaskProps {
  task: Task;
}

// interface SingleTaskProps extends TaskProps {
//   onLongPress:  () => void;
//   isActive: boolean;
// }

const SingleTask = ({ task}: TaskProps) => {
  const light = useAppSelector(state => state.theme.theme === 'light')
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [complete, setComplete] = useState(false);
  const hours = Math.floor(task.duration / 60);
  const minutes = Math.floor(task.duration % 60);
  const backgroundColor = light ? `${task.color}` : `${task.color}80`;
  const color = light ? 'rgba(255, 255, 255, 0.7)' : task.color

    const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const currentTime = new Date();


    currentTime.setHours(hours, minutes, seconds)

    return currentTime;
  }

  const formattedTime = formatTime(task.endTime);

  const handleDelete = () => {
    dispatch(removeTask(task.id))
  }

  const handleEdit = () => {
    setEdit(true);
  }
  const closeModal = () => {
    setEdit(false);
    setComplete(false);

   }

  useEffect(() => {
    if (task.timeRemaining === 0) {
      setComplete(true);
    }
  },[task.timeRemaining])

  // Swipe component logic //
  const renderRightActions = () => {
    return (
      
        <View style={styles.deleteContainer}>
          <Pressable onPress={handleDelete}>
            <FontAwesome name="trash" size={54} color="#b80c09" />
          </Pressable>
        </View>
      
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
    <Pressable onPress={handleEdit} style={ edit && {opacity: 0.5} }>
    <View style={[styles.container, { backgroundColor }, task.isActive && styles.activeStyles, { borderColor: light ? '#6e6d6d' : task.color} ]}>
      <Text style={[styles.name, { color: color }]}>{task.name}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={[styles.info, { color: color }]}>
            {hours} Hr {minutes} Min
          </Text > 
          <ToggleTask task={task} />
          {
          task.isActive 
          ? <Text style={[styles.info, { color: color }]}>{`${new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - ${formattedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</Text>
          : <Text style={[styles.info, { color: color }]}>--:-- - --:--</Text>
        }
          </View>
        <View style={styles.timerContainer}>
          <BackgroundTimer task={task} />
          {/* <ProgressTimer task={task} /> */}
        </View>
      </View>
    </View>
    </Pressable>
    {edit && <EditTask visible={edit} onClose={closeModal} task={task} />}
    {complete && <CompleteTask visible={complete} onClose={closeModal} task={task} />}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    height: 250,
  },
  activeStyles: {
    borderWidth: 3,
  },
  name: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: 'center',
    marginBottom: 10,

  },
  innerContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    marginTop: 15,
    width: "50%",
    display: "flex",
    gap: 15,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    fontWeight: '500',

  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default SingleTask;

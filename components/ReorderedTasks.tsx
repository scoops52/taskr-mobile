import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  DragEndParams,
} from "react-native-draggable-flatlist";
import { exampleTasks } from "../constants/exampleTasks";
import SingleTask from "./SingleTask";
import { Task } from "../redux/tasksSlice";
import { useAppSelector } from "../redux/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TasksProps {
  headerHeight: number;
}

const ReorderedTasks = ({ headerHeight }: TasksProps) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [data, setData] = useState(tasks);

  if (tasks.length === 0) {
    console.log("no tasks");
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No tasks.</Text>
      </View>
    );
  }
  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => {
    return (
      <TouchableOpacity onLongPress={drag} disabled={isActive}>
        <SingleTask task={item} />
      </TouchableOpacity>
    );
  };

  const onDragEnd = ({ data }: DragEndParams<Task>) => {
    setData(data);
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() ?? "falbackKey"}
        onDragEnd={onDragEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    display: "flex",
    width: "100%",
    gap: 5,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 2,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#CBCBCB",
    textAlign: "center",
  },
});

export default ReorderedTasks;

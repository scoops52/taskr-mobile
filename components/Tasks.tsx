import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { exampleTasks } from '../constants/exampleTasks'
import SingleTask from './SingleTask';
import { Task } from '../redux/tasksSlice';

const Tasks = () => {
    const tasks: Task[] = exampleTasks;
    const keyExtractor = (task: Task) => task.id?.toString() || '';
  return (
    <View style={styles.container}>
        <FlatList
            data={tasks}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => (
                <View key={item.id}>
                    <SingleTask task={item} />
                </View>
            )}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        display: 'flex',
        width: '100%',
        gap: 5,
    },

})

export default Tasks
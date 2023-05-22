import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TaskProps } from './SingleTask'
import { useAppDispatch } from '../redux/hooks';
import { calculateEndTime, startTask, stopTask } from '../redux/tasksSlice';

const ToggleTask = ({ task }: TaskProps) => {
    const [label, setLabel] = useState('Start Task');
    const dispatch = useAppDispatch();
    const [color, setColor] = useState(task.backgroundColor);

    const handleToggle = () => {
        if (!task.isActive) {
            dispatch(startTask(task.id));
            dispatch(calculateEndTime(task.id))
            setLabel('Stop Task');
            
            setColor('#ffb340c3')
        } else {
            dispatch(stopTask(task.id));
            setLabel('Start Task');
            
            setColor(task.backgroundColor)
        }
    }
  return (
    <View style={[styles.outline, {borderColor: color}]}>
    <Pressable
        onPress={handleToggle}
        style={({pressed}) => [
            {
                backgroundColor: pressed ? color + '80' : color
            }, styles.button
        ]}
           >
        <Text style={styles.label}>{label}</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    outline: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 135,
        height: 70,
        borderWidth: 2,
        borderRadius: 40,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 60,
        borderRadius: 40,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)'
    }
})

export default ToggleTask
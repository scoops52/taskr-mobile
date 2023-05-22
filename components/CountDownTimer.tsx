import React, {useEffect, useRef, useState} from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TaskProps} from './SingleTask';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { countdown, Task } from '../redux/tasksSlice';

const CountDownTimer = ({ task }: TaskProps) => {
    const dispatch = useAppDispatch();
    const hours = Math.floor(task.timeRemaining / 3600);
    const minutes = Math.floor((task.timeRemaining % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(task.timeRemaining % 60).toString().padStart(2, '0');
    
    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;
        if (task.isActive) {
            intervalId = setInterval(() => {
                dispatch(countdown(task.id));
            }, 1000)
        }
        if (intervalId && task.timeRemaining === 0) {
            clearInterval(intervalId);
        }

        return () => 
        {clearInterval(intervalId)}
    }, [dispatch, task.isActive, task.timeRemaining, task.id])
  return (
    <View style={styles.container}>
        <Text style={styles.time}>
            {hours}:{minutes}:{seconds}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
        borderRadius: 100,
        borderWidth: 3,
    },
    time: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})

export default CountDownTimer
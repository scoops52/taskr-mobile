
import Svg, { Circle } from "react-native-svg";
import React, {useEffect, useRef, useState} from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { TaskProps} from './SingleTask';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { countdown, Task } from '../redux/tasksSlice';

const ProgressTimer = ({task}: TaskProps) => {
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
    <View>
      <Svg width={150} height={150}>
        <Circle
          cx={65}
          cy={70}
          r={60}
          stroke={task.color + '90'}
          strokeWidth={5}
          fill='transparent'
        />
        <Circle
          cx={65}
          cy={70}
          r={60}
          stroke={task.color}
          strokeWidth={5}
          strokeDasharray={[Math.PI * 60 * 2]}
          strokeDashoffset={
            (1 - task.timeRemaining / (task.duration * 60)) * Math.PI * 60 * 2
          }
          fill='transparent'
        />
        <View style={styles.container}>
        <Text style={[styles.time, { color: task.color}]}>
            {hours}:{minutes}:{seconds}
        </Text>
        </View>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
        width: 130,
    },
    time: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})

export default ProgressTimer;

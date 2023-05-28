
import Svg, { Circle } from "react-native-svg";
import React, {useEffect, useRef, useState} from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { TaskProps} from './SingleTask';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { countdown, Task } from '../redux/tasksSlice';
import { Audio } from 'expo-av';

const ProgressTimer = ({task}: TaskProps) => {
    const light = useAppSelector(state => state.theme.theme === 'light')
    const dispatch = useAppDispatch();
    const hours = Math.floor(task.timeRemaining / 3600);
    const minutes = Math.floor((task.timeRemaining % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(task.timeRemaining % 60).toString().padStart(2, '0');
    const color = light ? '#ffffff86' : task.color
    
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sound.m4a'),
            { shouldPlay: true }
        );
        await sound.playAsync();
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;
        if (task.isActive) {
            intervalId = setInterval(() => {
                dispatch(countdown(task.id));
            }, 1000)
        }
        if (intervalId && task.timeRemaining === 0) {
            clearInterval(intervalId);
            playSound();
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
          stroke={light ? '#ffffff82' : color + '90'}
          strokeWidth={5}
          fill='transparent'
        />
        <Circle
          cx={65}
          cy={70}
          r={60}
          stroke={color}
          strokeWidth={5}
          strokeDasharray={[Math.PI * 60 * 2]}
          strokeDashoffset={
            (1 - task.timeRemaining / (task.duration * 60)) * Math.PI * 60 * 2
          }
          fill='transparent'
        />
        <View style={styles.container}>
        <Text style={[styles.time, { color: color}]}>
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
    },
    testButton: {
        padding: 15,
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
    }
})

export default ProgressTimer;

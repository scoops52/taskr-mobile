import Svg, { Circle } from "react-native-svg";
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Pressable, AppState, AppStateStatus } from 'react-native';
import { TaskProps } from './SingleTask';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { calculateEndTime, countdown, Task, updateTimeRemaining } from '../redux/tasksSlice';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications'


const ProgressTimer = ({ task }: TaskProps) => {
  const light = useAppSelector(state => state.theme.theme === 'light');
  const dispatch = useAppDispatch();
  const hours = Math.floor(task.timeRemaining / 3600);
  const minutes = Math.floor((task.timeRemaining % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(task.timeRemaining % 60).toString().padStart(2, '0');
  const color = light ? '#ffffff86' : task.color;
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [inactiveDuration, setInactiveDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>();
  const timestampRef = useRef<number | undefined>(undefined);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sound.m4a'),
      { shouldPlay: true }
    );
    await sound.playAsync();
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    const currentState = appState.current;
  
    if (currentState === 'active' && nextAppState.match(/inactive|background/)) {
      timestampRef.current = Date.now();
    }
  
    if (currentState.match(/inactive|background/) && nextAppState === 'active') {
      if (timestampRef.current) {
        const currentTimestamp = Date.now();
        const inactiveDurationInSeconds = Math.floor((currentTimestamp - timestampRef.current) / 1000);
        timestampRef.current = undefined;
        console.log('active');
  
        
        dispatch(updateTimeRemaining(inactiveDurationInSeconds));
      }
    }
  
    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, task.isActive]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (task.isActive) {
      intervalId = setInterval(() => {
        dispatch(countdown(task.id));
      }, 1000);
    }
    if (intervalId && task.timeRemaining === 0) {
      clearInterval(intervalId);
      playSound();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, task.isActive, task.timeRemaining, task.id]);

  useEffect(() => {
    if (appState.current === 'active' && task.isActive) {
      if (inactiveDuration > 0) {
        const remainingSeconds = Math.max(task.timeRemaining - Math.floor(inactiveDuration / 1000), 0);
        dispatch(countdown(task.id));
      }
    }
  }, [dispatch, task.isActive, inactiveDuration]);

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
      <Text style={[styles.time, { color: color }]}>
          {hours}:{minutes}:{seconds}
      </Text>
      </View>
    </Svg>
  </View>
  );
};

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
});

export default ProgressTimer;

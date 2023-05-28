import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { exampleTasks } from "../constants/exampleTasks";
import * as Notifications from 'expo-notifications';

export type TaskId = number | undefined;

export interface Task {
    id: TaskId;
    name: string;
    duration: number;
    isActive: boolean;
    timeRemaining: number;
    endTime: number;
    color: string;
}

type InitialState = {
    tasks: Task[]
}

const initialState: InitialState = {
    tasks:[...exampleTasks]
}

const convertTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
}

const scheduleNotification = async (taskId: TaskId, notificationTime: number) => {
  try {
    const identifier = String(taskId);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Done',
        body: 'A Task has been completed!',
        sound: 'default'
      },
      trigger: {
        seconds: notificationTime,
      },
      identifier,
    });
    console.log('Notification scheduled successfully.');
    console.log(notificationTime);
  } catch (error) {
    console.log('Failed to schedule notification:', error);
  }
};

const cancelNotification = async (taskId: TaskId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(String(taskId));
    console.log('Notification canceled succesffully');
  } catch (error) {
    console.log('Failed to cancel notification', error);
  }
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
       startTask: (state, action: PayloadAction<TaskId>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.isActive = true;
            };
       },
       countdown: (state, action: PayloadAction<TaskId>) => {
        const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.timeRemaining -= 1;
            };
        },
        stopTask: (state, action: PayloadAction<TaskId>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.isActive = false;
                cancelNotification(task.id);
            };
        },
        calculateEndTime: (state, action: PayloadAction<TaskId>) => {
            const currentTime = convertTime();
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.endTime = currentTime + task.timeRemaining;
                scheduleNotification(task.id, task.timeRemaining);
            };
        },
        removeTask: (state, action: PayloadAction<TaskId>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const { id, name, duration, isActive, timeRemaining, color } = action.payload;
            const task = state.tasks.find((task) => task.id === id)
            if (task) {
                task.name = name;
                task.duration = duration;
                task.isActive = isActive;
                task.color = color;
                task.timeRemaining = timeRemaining;

            }
        },
        addTime: (state, action: PayloadAction<TaskId>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.timeRemaining += 1800;
            };
        },
        clearAllTasks: (state) => {
            state.tasks = [];
        },
        updateTimeRemaining: (state, action: PayloadAction<number>) => {
            state.tasks.forEach((task) => {
                if (task.isActive) {
                    task.timeRemaining -= action.payload;
                    if (task.timeRemaining <= 0) {
                      task.timeRemaining = 0;
                      task.isActive = false;
                    }
                  }
            });
        }
    }
});

export const { createTask, startTask, countdown, stopTask, calculateEndTime, removeTask, editTask, addTime, clearAllTasks, updateTimeRemaining } = tasksSlice.actions;
export default tasksSlice.reducer;
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { useAppDispatch } from '../redux/hooks';


const taskName = 'timerBackgroundTask';
const dispatch = useAppDispatch

TaskManager.defineTask(taskName, async ({ error }) => {
    if (error) {
        console.error('TaskManager Error', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }

    disp
})
import { Task } from "../redux/tasksSlice";

export const exampleTasks: Task[] = [
    {
        id: Math.floor(Math.random() * 1000000),
        name: 'Answer Emails',
        duration: 45,
        isActive: false,
        timeRemaining: 45 * 60,
        endTime: 0,
        color: '#07E092',
        
    },
    {
        id: Math.floor(Math.random() * 1000000),
        name: 'Study',
        duration: 120,
        isActive: false,
        timeRemaining: 120 * 60,
        endTime: 0,
        color: '#F680F7',
        
    },
    {
        id: Math.floor(Math.random() * 1000000),
        name: 'Practice Guitar',
        duration: 60,
        isActive: false,
        timeRemaining: 60 * 60,
        endTime: 0,
        color: '#3D4ABA',
        
    },
    {
        id: Math.floor(Math.random() * 1000000),
        name: 'Answer Emails',
        duration: 1,
        isActive: false,
        timeRemaining: 1 * 60,
        endTime: 0,
        color: '#29abe2',
        
    },
]


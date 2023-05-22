import { compose, configureStore, applyMiddleware } from "@reduxjs/toolkit";


import tasksReducer from "./tasksSlice";


const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        
    },
    devTools: true,
}, 
)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

import { compose, configureStore, applyMiddleware } from "@reduxjs/toolkit";


import tasksReducer from "./tasksSlice";
import themeReducer from "./themeSlice"


const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        theme: themeReducer,
    },
    devTools: true,
}, 
)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

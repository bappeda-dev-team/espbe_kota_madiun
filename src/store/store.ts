import { configureStore } from "@reduxjs/toolkit";
import useReducer from "@/store/TahunSlicer"

export const store = configureStore({
    reducer: {
        Tahun: useReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
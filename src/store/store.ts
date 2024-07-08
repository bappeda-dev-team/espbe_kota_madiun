import { configureStore } from "@reduxjs/toolkit";
import useReducer from "@/store/ProsesBisnisSlicer"

export const store = configureStore({
    reducer: {
        tahunProsesBisnis: useReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
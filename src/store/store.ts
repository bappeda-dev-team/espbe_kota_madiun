import { configureStore } from "@reduxjs/toolkit";
import TahunReducer from "@/store/TahunSlicer"
import OpdReducer from "@/store/OpdSlicer"

export const store = configureStore({
    reducer: {
        Tahun: TahunReducer,
        Opd: OpdReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
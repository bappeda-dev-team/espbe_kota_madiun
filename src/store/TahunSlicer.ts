// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TahunState {
  tahun: number;
}

const initialState: TahunState = {
  tahun: 0,
};

const TahunSlicer = createSlice({
  name: 'Tahun',
  initialState,
  reducers: {
    setTahun: (state, action: PayloadAction<number>) => {
      state.tahun = action.payload;
    },
  },
});

export const { setTahun } = TahunSlicer.actions;
export default TahunSlicer.reducer;

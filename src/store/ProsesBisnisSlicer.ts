// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TahunState {
  tahun: number;
}

const initialState: TahunState = {
  tahun: 0,
};

const ProsesBisnisSlicer = createSlice({
  name: 'ProsesBisnisTahun',
  initialState,
  reducers: {
    setTahun: (state, action: PayloadAction<number>) => {
      state.tahun = action.payload;
    },
  },
});

export const { setTahun } = ProsesBisnisSlicer.actions;
export default ProsesBisnisSlicer.reducer;

// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpdState {
  value: string;
  label: string;
}

const initialState: OpdState = {
  value: '',
  label: '',
};

const OpdSlicer = createSlice({
  name: 'OPD',
  initialState,
  reducers: {
    setOpd: (state, action: PayloadAction<OpdState>) => {
      state.value = action.payload.value;
      state.label = action.payload.label;
    },
  },
});

export const { setOpd } = OpdSlicer.actions;
export default OpdSlicer.reducer;

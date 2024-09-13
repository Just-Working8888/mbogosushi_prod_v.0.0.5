import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrollState {
  targetId: string | null;
}

const initialState: ScrollState = {
  targetId: null,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setTargetId: (state, action: PayloadAction<string | null>) => {
      state.targetId = action.payload;
    },
  },
});

export const { setTargetId } = scrollSlice.actions;

export default scrollSlice.reducer;

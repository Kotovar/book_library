import { createSlice } from '@reduxjs/toolkit';

interface RandomState {
  value: number;
}

const initialState: RandomState = {
  value: Math.floor(Math.random() * 10),
};

export const randomNumbersSlice = createSlice({
  name: 'random',
  initialState,
  reducers: {},
});

export default randomNumbersSlice.reducer;

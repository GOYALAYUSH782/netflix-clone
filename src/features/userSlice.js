import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    plan: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null;
    },
    setPlan: (state, action) => {
      state.plan = action.payload
    },
    clearPlan: state => {
      state.plan = null;
    }
  },
});

export const { login, logout, setPlan, clearPlan } = userSlice.actions;

export const selectUser = state => state.user.user;

export const selectPlan = state => state.user.plan;

export default userSlice.reducer;

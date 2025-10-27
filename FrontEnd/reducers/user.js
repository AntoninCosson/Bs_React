
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        token: '',
        connected: false,
        username: '',
        bestScore: 0,
};

export const userSlice = createSlice({
name: 'user',
 initialState,

    reducers: {
        connect: (state, action) => {
         state.token = action.payload.token
         state.connected = action.payload.connected;
         state.username = action.payload.username;
         state.author = action.payload.author;
         state.bestScore = action.payload.bestScore;
        },
        logout: (state) => {
        state.token = null;
        state.connected = null;
        state.username = null;
        state.author = null;
        }
    },
});
export const { connect, logout } = userSlice.actions;
export default userSlice.reducer;
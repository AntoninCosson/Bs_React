
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

/*
// partie composants : 
import { useDispatch } from 'react-redux'; // utilisé pour dispatcher les fonction
import { addToCounter } from '../reducers/counter' // import des fonctions
import { useSelector } from 'react-redux'; // utilisé pour lire les values
// a l'interieur du composant : 
const dispatch = useDispatch(); // pour use une fonction
const counter = useSelector((state) => state.counter.value) // pour lire une value, doit correspondre au name
dispatch(addToCounter(-1)) // exemple d'utilisation d'une fonction
*/
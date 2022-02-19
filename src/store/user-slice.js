import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username: '',
    jwtoken: null,
    isConnected: null,
    loading: true,
    email: null,
    username: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, { payload: username }) => {
            state.username = username;
        },
        setJwtoken: (state, { payload: jwtoken}) => {
            state.jwtoken = jwtoken;
        },
        setIsConnected: (state, { payload: isConnected }) => {
            state.isConnected = isConnected;
        },
        setLoading: (state, { payload: loading }) => {
            state.loading = loading;
        },
        setEmail: (state, { payload: email }) => {
            state.email = email;
        },
        setUsername: (state, { payload: username }) => {
            state.username = username;
        },
    }
})


export const userActions = userSlice.actions;
export default userSlice.reducer;
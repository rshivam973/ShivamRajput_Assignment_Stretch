import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const  initialState = {
    user: null,
    error:false,
    loading: false,
}

export const loginUser = createAsyncThunk('/login', async (data) => {
    const res = await  fetch('http://localhost:8000/api/auth/signin',{
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
     return await res.json();
});

export const signupuser = createAsyncThunk('/signup', async(body)=>{
    const response= await fetch('http://localhost:3001/users',{
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body:JSON.stringify(body),
    })
    return  await response.json();
})

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        signInStart :  (state )=>{
            state.loading = true;
            state.error = false;
        },
        signInSuccess : (state ,action) =>{
           state.loading = false;
           localStorage.setItem("user",JSON.stringify(action.payload));
           state.user = action.payload;
        },
        signInFailure: (state, action)=>{
            state.loading =false;
            state.error = action.payload;
        },
        logOut: (state,action)=>{
            localStorage.clear();
            state.isLoggedIn=false;
        },
        signUpStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    },
    extraReducers(builder) {
        
    }
});

export const { signInStart, signInSuccess, signInFailure, logOut, signUpStart, signUpSuccess, signUpFailure }=authSlice.actions

export default authSlice.reducer
import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../Redux/authSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default store;
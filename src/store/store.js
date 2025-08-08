import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import userSlice from './slices/userSlice.js';

const store =  configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice,
    }
})


export default store ;
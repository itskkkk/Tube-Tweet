import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import userSlice from './slices/userSlice.js';
import tweetSlice from './slices/tweetSlice.js'


const store =  configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice,
        tweet: tweetSlice,
    }
})


export default store ;
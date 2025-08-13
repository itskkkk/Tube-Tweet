import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import userSlice from './slices/userSlice.js';
import videoSlice from './slices/videoSlice.js';
import tweetSlice from './slices/tweetSlice.js';
import likeSlice from './slices/likeSlice.js';
import paginationSlice from './slices/paginationSlice.js';


const store =  configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice,
        video: videoSlice,
        tweet: tweetSlice,
        like: likeSlice,
        pagingVideos: paginationSlice,
    }
})


export default store ;
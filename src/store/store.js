import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import userSlice from './slices/userSlice.js';
import videoSlice from './slices/videoSlice.js';
import tweetSlice from './slices/tweetSlice.js';
import likeSlice from './slices/likeSlice.js';
import paginationSlice from './slices/paginationSlice.js';
import commentSlice from './slices/commentSlice.js';
import dashboardSlice from './slices/dashboardSlice.js';
import subscriptionSlice from './slices/subscriptionSlice.js';
import playlistSlice from './slices/playlistSlice.js';


const store =  configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice,
        video: videoSlice,
        tweet: tweetSlice,
        like: likeSlice,
        comment: commentSlice,
        dashboard: dashboardSlice,
        playlist: playlistSlice,
        subscription: subscriptionSlice,
        pagingVideos: paginationSlice,
    }
})


export default store ;
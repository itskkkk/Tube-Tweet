import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { parseErrorMessage } from "../../utils/parseErrMsg";


const initialState = {
    loading: false,
    status: false,
    data: null,
};

export const createTweet = createAsyncThunk("tweet/createTweet", async({ data }) => {
    try {
        const requestData = {
            content: data.tweet || data.content
        };
        const response = await axiosInstance.post(`/tweets`, requestData);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const getTweet = createAsyncThunk("tweet/getTweet", async(userId) => {
    try {
        const response = await axiosInstance.get(`/tweets/user/${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
    try {
        const response = await axiosInstance.get(`/tweets`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const updateTweet = createAsyncThunk("tweet/updateTweet", async({tweetId,data}) => {
    try {
        const requestData = {
            content: data.tweet || data.content
        };
        const response = await axiosInstance.patch(`/tweets/${tweetId}`,requestData);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const deleteTweet = createAsyncThunk("tweet/deleteTweet", async({tweetId}) => {
    try {
        const response = await axiosInstance.delete(`/tweets/${tweetId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    extraReducers:(builder) => {
        // create tweet
        builder.addCase(createTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTweet.fulfilled, (state,action) => {
            state.loading = false;
            state.data.unshift(action.payload);
            state.status = true;
        });
        builder.addCase(createTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //get user tweet
        builder.addCase(getTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTweet.fulfilled, (state,action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //get all tweets
        builder.addCase(getAllTweets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTweets.fulfilled, (state,action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getAllTweets.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //update tweet
        builder.addCase(updateTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTweet.fulfilled, (state,action) => {
            state.loading = false;
            //state.data = action.payload;
            state.status = true;
        });
        builder.addCase(updateTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //delete tweet
        builder.addCase(deleteTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTweet.fulfilled, (state,action) => {
            state.loading = false;
            let filteredTweets = state.data.filter((tweet) => tweet._id !== action.payload._id);
            state.data = filteredTweets;
            state.status = true;
        });
        builder.addCase(deleteTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
        
    },
});


export default tweetSlice.reducer;
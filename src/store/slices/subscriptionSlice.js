import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { parseErrorMessage } from "../../utils/parseErrMsg";
import { toast } from "react-toastify";


const initialState = {
    loading: false,
    status: false,
    data: null,
};

export const toggleSubscription = createAsyncThunk("subscription/toggleSubscription", async(channelId) => {
    try {
        const response = await axiosInstance.patch(`/subscription/${channelId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
    }
});


export const getChannelSubscribers = createAsyncThunk("subscription/getChannelSubscribers", async(channelId) => {
    try {
        const response = await axiosInstance.get(`/subscription/${channelId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
    }
});


export const getSubscribedChannels = createAsyncThunk("subscription/getSubscribedChannels", async(subscriberId) => {
    try {
        const response = await axiosInstance.get(`/subscription/users/${subscriberId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
    }
});


const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    extraReducers: (builder) => {
        //toggle subscription
        builder.addCase(toggleSubscription.pending, (state) => {});
        builder.addCase(toggleSubscription.fulfilled, (state, action) => {});
        builder.addCase(toggleSubscription.rejected, (state) => {});

        //get channel subscribers
        builder.addCase(getChannelSubscribers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChannelSubscribers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getChannelSubscribers.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //get subscribed channels
        builder.addCase(getSubscribedChannels.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getSubscribedChannels.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    },
});


export default subscriptionSlice.reducer;
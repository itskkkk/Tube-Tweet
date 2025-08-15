import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import { parseErrorMessage } from "../../utils/parseErrMsg";


const initialState = {
    loading: false,
    status: false,
    data: {},
};

export const getChannelStats = createAsyncThunk("dashboard/getChannelStats", async () => {
    try {
        const response = await axiosInstance.get(`/dashboard/stats`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const getChannelVideos = createAsyncThunk("dashboard/getChannelVideos", async () => {
    try {
        const response = await axiosInstance.get(`/dashboard/videos`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: (builder) => {
        //get channel stats
        builder.addCase(getChannelStats.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChannelStats.fulfilled, (state, action) => {
            state.loading = false;
            state.data.channelStats = action.payload;
            state.status = true;
        });
        builder.addCase(getChannelStats.rejected, (state) => {
            state.loading = false;
            state.status = false;
        })

        //get channel videos
        builder.addCase(getChannelVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChannelVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data.channelVideos = action.payload;
            state.status = true;
        });
        builder.addCase(getChannelVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    }
});

export default dashboardSlice.reducer;
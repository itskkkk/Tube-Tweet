import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosInstance";
import { parseErrorMessage } from "../../utils/parseErrMsg";


const initialState = {
    loading: false,
    status: false,
    data: null,
}


export const publishVideo = createAsyncThunk("video/publishVideo", async ({ data }, { signal }) => {
    const formData = new FormData();

    for(const key in data) formData.append(key, data[key]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("videoFile", data.videoFile[0]);

    const controller = new AbortController();
    signal.addEventListener("abort", () => {
        controller.abort();
    });

    try {
        const response = await axiosInstance.post(`/videos`, formData, {
            signal: controller.signal,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        if(axiosInstance.isCancel(error)) {
            //Handle cancel errors
            toast.error("Video Upload canceled");
        } else {
            toast.error(parseErrorMessage(error.response.data));
            console.log(error);
            throw error;
        }
        console.log("Video upload canceled");
        throw error;
    }
});


export  const getVideo = createAsyncThunk("video/getVideo", async (videoId) => {
    try {
        const response = await axiosInstance.get(`/videos/${videoId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


export const updateVideo = createAsyncThunk("video/updateVideo", async ({ videoId, data }) => {
    const formData = new FormData();

    for(const key in data) formData.append(key, data[key]);
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);

    try {
        const response = await axiosInstance.patch(`videos/${videoId}`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data",
            },
        });
        toast.success(response.data.message);
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }

});


export  const deleteVideo = createAsyncThunk("video/deleteVideo", async (videoId) => {
    try {
        const response = await axiosInstance.delete(`/videos/${videoId}`);
        toast.success(response.data.message);
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


export  const togglePublish = createAsyncThunk("video/togglePublish", async (videoId) => {
    try {
        const response = await axiosInstance.patch(`/videos/toggle/publish/${videoId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


export  const updateView = createAsyncThunk("video/updateView", async (videoId) => {
    try {
        const response = await axiosInstance.patch(`/videos/view/${videoId}`);
    
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


export  const getAllVideos = createAsyncThunk("video/getAllVideos", async (userId) => {
    try {
        const response = await axiosInstance.get(`/videos?userId=${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});


const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        emptyVideosState: (state, action) => {
            console.log("state.data:", state.data);
            state.data = null;
            console.log("state.data:", state.data);
        },
    },
    extraReducers: (builder) => {
        // get video
        builder.addCase(getVideo.pending, (state) => {
            state.loading = true;
            state.data = null;
        });
        builder.addCase(getVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getVideo.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //publish video
        builder.addCase(publishVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(publishVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(publishVideo.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //get all videos
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getAllVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //delete video
        builder.addCase(deleteVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(deleteVideo.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //update video
        builder.addCase(updateVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(updateVideo.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //toggle publish video
        builder.addCase(togglePublish.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(togglePublish.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(togglePublish.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //update view
        builder.addCase(updateView.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateView.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(updateView.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

    },
});


export default videoSlice.reducer;
export const { emptyVideosState } = videoSlice.actions;
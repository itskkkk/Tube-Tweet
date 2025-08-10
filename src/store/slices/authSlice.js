import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../utils/axiosInstance.js";
import { toast } from 'react-toastify';
import { parseErrorMessage } from "../../utils/parseErrMsg.js"


const initialState = {
    status : false,
    loading : false,
    userData : {},
}

export const login = createAsyncThunk("auth/login",async(data) => {
    try {
        const response = await axiosInstance.post("/users/login",data);
        toast.success(response.data.message);
        return response.data.data.user;
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
        throw error;
        
    }
})



export const getCurrentUser = createAsyncThunk("auth/getCurrentUser",async() => {
    try {
        const response = await axiosInstance.get("/users/current-user")
        return response.data.data;
    } catch (error) {
        console.error("Error");
        throw error;
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await axiosInstance.post("/users/logout")
        toast.success("Logged Out successfully")
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data))
        console.log(error);
        throw error;
    }
});

export const changePassword = createAsyncThunk("auth/changePassword" , async(data) => {
    try {
        const response = await axiosInstance.patch("/users/change-password",data,{
            headers: {
                "Content-Type" : "application/json",
            },
        });
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        throw error ;
    }
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async(data) => {
    try {
        const response = await axiosInstance.patch("/users/update-profile",data,{
            headers: {
                "Content-Type" : "application/json",
            },
        });
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        throw error;
    }
});

export const updateAvatar = createAsyncThunk("user/avatar", async({data}) => {
    try {
        const response = await axiosInstance.patch(`/users/avatar`,data,{
            headers: {
                "Content-Type" : "multipart/form-data",
            },
        });
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const updateCoverImage = createAsyncThunk("user/coverImage", async({data}) => {
    try {
        const response = await axiosInstance.patch(`/users/cover-image`,data,{
            headers: {
                "Content-Type" : "multipart/form-data",
            },
        });
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const watchHistory = createAsyncThunk("user/history", async() => {
    try {
        const response = await axiosInstance.get(`/users/history`);
        return response.data.data
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const clearWatchHistory = createAsyncThunk("user/clearWatchHistory", async() => {
    try {
        const response = await axiosInstance.delete(`/users/history`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const userPlaylists = createAsyncThunk("user/userPlaylists", async (userId) => {
    try {
        const response = await axiosInstance.get(`/playlist/users/${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const addLink = createAsyncThunk("user/addLink", async ({ formData }) => {
    try {
        const response = await axiosInstance.post(`/about/user/link/add`,formData);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const updateLink = createAsyncThunk("user/updateLink", async ({ linkId,formData }) => {
    try {
        const response = await axiosInstance.patch(`/about/user/link/${linkId}`,formData);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

export const deleteLink = createAsyncThunk("user/deleteLink", async ({ linkId }) => {
    try {
        const response = await axiosInstance.delete(`/about/user/link/${linkId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseErrorMessage(error.response.data));
        console.log(error);
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        //login
        builder.addCase(login.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled,(state,action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(login.rejected,(state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });

        //logout
        builder.addCase(logout.pending, (state) => {
            state.loading = true
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(logout.rejected, (state) => {
            state.loading = false;
            state.status = false;
        })

        //getCurrentUser
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.status = true;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.userData = null;
            state.status = false;
        });

        //change password
        builder.addCase(changePassword.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(changePassword.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(changePassword.rejected,(state) => {
            state.loading = false;
        });

        //update profile 
        builder.addCase(updateProfile.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(updateProfile.fulfilled,(state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateProfile.rejected,(state) => {
            state.loading = false;
        });

        //update avatar
        builder.addCase(updateAvatar.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled,(state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateAvatar.rejected,(state) => {
            state.loading = false;
        });

        //update coverimage
        builder.addCase(updateCoverImage.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImage.fulfilled,(state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateCoverImage.rejected,(state) => {
            state.loading = false;
        });        

        //get watchHistory
        builder.addCase(watchHistory.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(watchHistory.fulfilled,(state, action) => {
            state.loading = false;
            state.userData.watchHistory = action.payload;
        });
        builder.addCase(watchHistory.rejected,(state) => {
            state.loading = false;
        });

        //clear watchHistory
        builder.addCase(clearWatchHistory.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(clearWatchHistory.fulfilled,(state, action) => {
            state.loading = false;
            state.userData.watchHistory = [];
        });
        builder.addCase(clearWatchHistory.rejected,(state) => {
            state.loading = false;
        });

        //get playlists
        builder.addCase(userPlaylists.pending,(state) => {
            state.loading = true;
        });
        builder.addCase(userPlaylists.fulfilled,(state, action) => {
            state.loading = false;
            state.userData.userPlaylists = action.payload;
        });
        builder.addCase(userPlaylists.rejected,(state) => {
            state.loading = false;
        });

        //add link
        builder.addCase(addLink.pending,(state) => {});
        builder.addCase(addLink.fulfilled,(state, action) => {});
        builder.addCase(addLink.rejected,(state) => {});

        //update link
        builder.addCase(updateLink.pending,(state) => {});
        builder.addCase(updateLink.fulfilled,(state, action) => {});
        builder.addCase(updateLink.rejected,(state) => {});

        //delete link
        builder.addCase(deleteLink.pending,(state) => {});
        builder.addCase(deleteLink.fulfilled,(state, action) => {});
        builder.addCase(deleteLink.rejected,(state) => {});


    }
});

export default authSlice.reducer;
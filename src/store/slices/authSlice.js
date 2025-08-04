import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../utils/axiosInstance.js";
import { toast } from 'react-toastify';



const initialState = {
    status : false,
    loading : false,
    userData : {}
}

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser",async() => {
    try {
        const response = await axiosInstance.get("users/get-current-user")
        return response.data
    } catch (error) {
        console.error("Error")
        throw error;
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await axiosInstance.post("users/logout")
        toast.success("Logged Out successfully")
    } catch (error) {
        toast.error(error.response.data)
        console.log(error)
        
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
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
    }
});

export default authSlice.reducer;
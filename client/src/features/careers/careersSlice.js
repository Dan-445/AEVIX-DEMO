import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk(
    'careers/fetchJobs',
    async () => {
        const response = await axios.get('/api/careers');
        return response.data;
    }
);

export const submitApplication = createAsyncThunk(
    'careers/submitApplication',
    async (formData) => {
        const response = await axios.post('/api/careers/apply', formData);
        return response.data;
    }
);

const careersSlice = createSlice({
    name: 'careers',
    initialState: {
        jobs: [],
        loading: false,
        error: null,
        applicationStatus: 'idle'
    },
    reducers: {
        resetApplicationStatus: (state) => {
            state.applicationStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(submitApplication.pending, (state) => {
                state.applicationStatus = 'loading';
            })
            .addCase(submitApplication.fulfilled, (state) => {
                state.applicationStatus = 'succeeded';
            })
            .addCase(submitApplication.rejected, (state, action) => {
                state.applicationStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { resetApplicationStatus } = careersSlice.actions;
export default careersSlice.reducer; 
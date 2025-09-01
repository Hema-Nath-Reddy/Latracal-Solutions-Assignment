import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk to fetch movies from YOUR backend
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/movies", {
        params: filters,
      });
      return response.data; // ✅ directly return the array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ... rest of your movieSlice.js code remains the same
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // Note: Caching logic can also be managed on the backend if needed
    cachedRequests: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // "Update the Store" part
        const { query, genre, page } = action.meta.arg;
        state.cachedRequests[`genre:${genre || "all"}-page:${page}`] = true;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;

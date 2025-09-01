import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for fetching all movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/movies", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New async thunk for fetching a single movie and its details
export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/movies/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New async thunk for fetching a single movie's cast
export const fetchMovieCast = createAsyncThunk(
  "movies/fetchMovieCast",
  async (id, { rejectWithValue }) => {
    try {
      // The backend endpoint should return an object with a 'cast' array
      const response = await axios.get(
        `http://localhost:3001/movies/cast/${id}`
      );
      return response.data.cast;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "movies/addToWatchlist",
  async ({ userId, movieId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/users/${userId}/watchlist`,
        { movieId }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    selectedMovie: null,
    cast: [], // A new state for cast data
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for fetching all movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Cases for fetching a single movie
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.selectedMovie = null;
      })
      // Corrected cases for fetching a single movie's cast
      .addCase(fetchMovieCast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieCast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cast = action.payload; // Correctly store the cast data
      })
      .addCase(fetchMovieCast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.cast = [];
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        console.log("Movie added to watchlist:", action.payload);
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        console.error("Failed to add movie to watchlist:", action.payload);
      });
  },
});

export default movieSlice.reducer;

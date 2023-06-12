import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  terms: [],
  error: "",
};

export const findTerms = createAsyncThunk(
  "term/findTerms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/terms`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const termSlice = createSlice({
  name: "term",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findTerms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findTerms.fulfilled, (state, action) => {
      state.loading = false;
      state.terms = action.payload;
      state.error = "";
    });
    builder.addCase(findTerms.rejected, (state, action) => {
      state.loading = false;
      state.terms = [];
      state.error = action.payload;
    });
  },
});

export const { resetError } = termSlice.actions;
export default termSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // used in add, update realty
  propWithHeader: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const findWithPropType = createAsyncThunk(
  "term/findWithPropType",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_PORT
        }/api/property/header/propType/${value}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // find With Prop Type Case
    builder.addCase(findWithPropType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findWithPropType.fulfilled, (state, action) => {
      state.loading = false;
      state.propWithHeader = action.payload;
      state.error = "";
    });
    builder.addCase(findWithPropType.rejected, (state, action) => {
      state.loading = false;
      state.propWithHeader = [];
      state.error = action.payload;
    });
  },
});

export const { resetError } = propertySlice.actions;
export default propertySlice.reducer;

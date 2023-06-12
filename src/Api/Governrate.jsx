import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  governrates: [],
  singleGovernrate: null,
  error: "",
};

export const findGovernrates = createAsyncThunk(
  "governrate/findGovernrates",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        page
          ? `${
              import.meta.env.VITE_SERVER_PORT
            }/api/governrate?page=${page}&limit=${6}`
          : `${import.meta.env.VITE_SERVER_PORT}/api/governrate`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findGovernrate = createAsyncThunk(
  "governrate/findGovernrate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/governrate/${id}`,
        {
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const updateGovernrate = createAsyncThunk(
  "governrate/updateGovernrate",
  async (values, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(values.title));
      formData.append("googleTitle", JSON.stringify(values.googleTitle));
      formData.append("oldImage", values.oldImage);
      formData.append("image", values.image);
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/governrate/${values.id}`,
        data: formData,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const governrateSlice = createSlice({
  name: "governrate",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findGovernrates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findGovernrates.fulfilled, (state, action) => {
      state.loading = false;
      state.governrates = action.payload;
      state.error = "";
    });
    builder.addCase(findGovernrates.rejected, (state, action) => {
      state.loading = false;
      state.governrates = [];
      state.error = action.payload;
    });

    builder.addCase(findGovernrate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findGovernrate.fulfilled, (state, action) => {
      state.singleGovernrate = action.payload;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(findGovernrate.rejected, (state, action) => {
      state.loading = false;
      state.singleGovernrate = null;
      state.error = action.payload;
    });

    builder.addCase(updateGovernrate.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateGovernrate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetError } = governrateSlice.actions;
export default governrateSlice.reducer;

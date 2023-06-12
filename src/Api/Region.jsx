import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  regions: [],
  regionByGovernrates: [],
  region: null,
  error: "",
};

export const findAllRegions = createAsyncThunk(
  "regions/findAllRegions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/region`,
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

// used in sitemap
export const findRegionByGovernrateTitle = createAsyncThunk(
  "regions/findRegionByGovernrateTitle",
  async (title, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/region/governrate/${title}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findRegion = createAsyncThunk(
  "regions/findRegion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/region/${id}`,
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

export const updateRegion = createAsyncThunk(
  "region/updateRegion",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/region/${values.id}`,
        data: values,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return values.id;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllRegions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllRegions.fulfilled, (state, action) => {
      state.loading = false;
      state.regions = action.payload;
      state.error = "";
    });
    builder.addCase(findAllRegions.rejected, (state, action) => {
      state.loading = false;
      state.regions = [];
      state.error = action.payload;
    });

    builder.addCase(findRegionByGovernrateTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findRegionByGovernrateTitle.fulfilled, (state, action) => {
      state.loading = false;
      state.regionByGovernrates = action.payload;
      state.error = "";
    });
    builder.addCase(findRegionByGovernrateTitle.rejected, (state, action) => {
      state.loading = false;
      state.regionByGovernrates = [];
      state.error = action.payload;
    });

    builder.addCase(findRegion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findRegion.fulfilled, (state, action) => {
      state.loading = false;
      state.region = action.payload;
      state.error = "";
    });
    builder.addCase(findRegion.rejected, (state, action) => {
      state.loading = false;
      state.region = null;
      state.error = action.payload;
    });

    builder.addCase(updateRegion.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateRegion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetError } = regionSlice.actions;
export default regionSlice.reducer;

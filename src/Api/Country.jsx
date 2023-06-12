import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  adminCountries: [],
  allCountries: [],
  nPages: 0,
  error: "",
};

const countryForm = (values, fromUpdate = false) => {
  const formData = new FormData();
  formData.append("title", JSON.stringify(values.title));
  formData.append("code", values.code);
  formData.append("image", values.image);
  if (fromUpdate) {
    formData.append("oldImage", values.oldImage);
  }
  return formData;
};

// Used Only in Admin Panel ..
export const findAdminCountries = createAsyncThunk(
  "country/findAdminCountries",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/country/admin?limit=10&page=${page}`,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

// Used in Contact Us Component and Register Component  ..
export const findAllCountries = createAsyncThunk(
  "country/findAllCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/country/`,
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const addCountry = createAsyncThunk(
  "country/addCountry",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/country`,
        data: countryForm(values),
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCountry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCountry.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addCountry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(findAdminCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAdminCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.adminCountries = action.payload.data;
      state.nPages = action.payload.nPages;
      state.error = "";
    });
    builder.addCase(findAdminCountries.rejected, (state, action) => {
      state.loading = false;
      state.adminCountries = [];
      state.nPages = 0;
      state.error = action.payload;
    });

    builder.addCase(findAllCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.allCountries = action.payload;
      state.error = "";
    });
    builder.addCase(findAllCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetError } = countrySlice.actions;
export default countrySlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  services: [],
  singleService: null,
  error: "",
};

export const findServices = createAsyncThunk(
  "service/findServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/service`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findService = createAsyncThunk(
  "service/findService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/service/${id}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const addService = createAsyncThunk(
  "service/addService",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/service`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  "service/updateService",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/service/${values.id}`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/service/${values.id}`,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return values.id;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
      state.error = "";
    });
    builder.addCase(findServices.rejected, (state, action) => {
      state.loading = false;
      state.services = [];
      state.error = action.payload;
    });

    builder.addCase(findService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findService.fulfilled, (state, action) => {
      state.singleService = action.payload;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(findService.rejected, (state, action) => {
      state.loading = false;
      state.singleService = null;
      state.error = action.payload;
    });

    builder.addCase(addService.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateService.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteService.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.services = state.services.filter(
        (service) => service._id !== action.payload
      );
      state.error = "";
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.services = [];
      state.error = action.payload;
    });
  },
});

export const { resetError } = serviceSlice.actions;
export default serviceSlice.reducer;

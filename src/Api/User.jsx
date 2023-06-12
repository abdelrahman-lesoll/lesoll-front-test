// Import necessary libraries and modules
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
// Set initial state for user slice
const initialState = {
  loading: false,
  favourites: [],
  compared: [],
  users: [],
  nPages: 0,
  // used in dashboard
  usersBetweenTwoDates: 0,
  error: "",
};
// Define async thunks for interacting with server API
export const toggleRealtyOption = createAsyncThunk(
  "user/toggleRealtyOption",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        // Send PUT request to server API to toggle realty option for user
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/user/toggle-${
          values.key
        }/${values.id}`,
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

export const findFavourites = createAsyncThunk(
  "user/findFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/user/favourites`,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const comparedRealties = createAsyncThunk(
  "user/comparedRealties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/user/compared-realties`,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/user/password/${
          values.id
        }`,
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

export const findAllUsers = createAsyncThunk(
  "user/findAllUsers",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/user?limit=10&page=${page}`,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/auth/verify_temp_token${values}`,
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findBetweenTwoDates = createAsyncThunk(
  "user/findBetweenTwoDates",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/user/users-from-to/${from}/${to}`,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resortCompared: (state, action) => {
      state.compared = action.payload;
    },
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findBetweenTwoDates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findBetweenTwoDates.fulfilled, (state, action) => {
      state.loading = false;
      state.usersBetweenTwoDates = action.payload;
      state.error = "";
    });
    builder.addCase(findBetweenTwoDates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(toggleRealtyOption.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleRealtyOption.fulfilled, (state, action) => {
      state.loading = false;
      state.favourites = state.favourites.filter(
        (fav) => fav._id !== action.payload
      );
      state.compared = state.compared.filter(
        (compare) => compare._id !== action.payload
      );
      state.error = "";
    });
    builder.addCase(toggleRealtyOption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(findFavourites.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findFavourites.fulfilled, (state, action) => {
      state.loading = false;
      state.favourites = action.payload.favourites;
      state.error = "";
    });
    builder.addCase(findFavourites.rejected, (state, action) => {
      state.loading = false;
      state.favourites = [];
      state.error = action.payload;
    });

    builder.addCase(comparedRealties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(comparedRealties.fulfilled, (state, action) => {
      state.loading = false;
      state.compared = action.payload.compared;
      state.error = "";
    });
    builder.addCase(comparedRealties.rejected, (state, action) => {
      state.loading = false;
      state.compared = [];
      state.error = action.payload;
    });

    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      const isWrongPassword = action.payload === "Current Password is Wrong";
      isWrongPassword && toast.error(action.payload);
      state.loading = false;
      state.error = isWrongPassword ? "" : action.payload;
    });

    builder.addCase(findAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      state.nPages = action.payload.nPages;
      state.error = "";
    });
    builder.addCase(findAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.nPages = 0;
      state.error = action.payload;
    });

    builder.addCase(verifyToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyToken.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resortCompared, resetError } = userSlice.actions;
export default userSlice.reducer;

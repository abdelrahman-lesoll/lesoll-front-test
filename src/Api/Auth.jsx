import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  token: "",
  updateError: false,
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/auth/login`,
        values
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/auth/google`,
        values
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const facebookLogin = createAsyncThunk(
  "auth/facebookLogin",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/auth/facebook`,
        values
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/auth/register`,
        values
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const generateTempToken = createAsyncThunk(
  "auth/generateTempToken",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        data: values,
        url: `${import.meta.env.VITE_SERVER_PORT}/api/auth/generate_temp_token`,
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (values, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("code", values.code);
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("image", values.image);
      formData.append("oldImage", values.oldImage);
      formData.append("phone", values.phone);
      formData.append("status", values.status);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_PORT}/api/user/${values.id}`,
        formData,
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/auth/reset_password`,
        data: values,
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("userInfo", action.payload);
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      localStorage.setItem("userInfo", action.payload);
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    });
    builder.addCase(facebookLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(facebookLogin.fulfilled, (state, action) => {
      localStorage.setItem("userInfo", action.payload);
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(facebookLogin.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("userInfo", action.payload);
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    });

    builder.addCase(generateTempToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateTempToken.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(generateTempToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      localStorage.setItem("userInfo", action.payload);
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.updateError = true;
      state.error = action.payload;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      localStorage.setItem("userInfo", action.payload);
      state.loading = false;
      state.token = action.payload;
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;

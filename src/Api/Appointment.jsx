import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  appointments: [],
  userAppointments: [],
  isExist: null,
  appointmentNotification: null,
  error: "",
};

export const addAppointment = createAsyncThunk(
  "appointment/addAppointment",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/appointment`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const addToCalendar = createAsyncThunk(
  "appointment/addToCalendar",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/appointment/google-calendar/${values.id}`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const checkIfExist = createAsyncThunk(
  "appointment/checkIfExist",
  async ({ seller, buyer, realty }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/appointment/is-exist?realty=${realty}&seller=${seller}&buyer=${buyer}`,
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findUserAppointments = createAsyncThunk(
  "appointment/findUserAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/appointment/between-two-users`,
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

export const findAllAppointments = createAsyncThunk(
  "appointment/findAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/appointment/`,
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

export const deleteAppointment = createAsyncThunk(
  "appointment/deleteAppointment",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/appointment/${values.id}`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return values.id;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAppointment.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.appointmentNotification = action.payload;
      state.isExist = true;
      state.error = "";
    });
    builder.addCase(addAppointment.rejected, (state, action) => {
      state.loading = false;
      state.appointmentNotification = null;
      state.isExist = null;
      state.error = action.payload;
    });

    builder.addCase(addToCalendar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCalendar.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.isExist = true;
      state.error = "";
    });
    builder.addCase(addToCalendar.rejected, (state, action) => {
      state.loading = false;
      state.isExist = null;
      state.error = action.payload;
    });

    builder.addCase(checkIfExist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkIfExist.fulfilled, (state, action) => {
      state.loading = false;
      state.isExist = action.payload;
      state.error = "";
    });
    builder.addCase(checkIfExist.rejected, (state, action) => {
      state.loading = false;
      state.isExist = null;
      state.error = action.payload;
    });

    builder.addCase(findUserAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findUserAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.userAppointments = action.payload;
      state.error = "";
    });
    builder.addCase(findUserAppointments.rejected, (state, action) => {
      state.loading = false;
      state.userAppointments = [];
      state.error = action.payload;
    });

    builder.addCase(deleteAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.userAppointments = state.userAppointments.filter(
        (appointment) => appointment._id !== action.payload
      );
      state.error = "";
    });
    builder.addCase(deleteAppointment.rejected, (state, action) => {
      state.loading = false;
      state.userAppointments = [];
      state.error = action.payload;
    });

    builder.addCase(findAllAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.error = "";
    });
    builder.addCase(findAllAppointments.rejected, (state, action) => {
      state.loading = false;
      state.appointments = [];
      state.error = action.payload;
    });
  },
});

export const { resetError } = appointmentSlice.actions;
export default appointmentSlice.reducer;

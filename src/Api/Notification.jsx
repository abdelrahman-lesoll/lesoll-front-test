import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  fetching: false,
  notifications: [],
  notSeen: 0,
  error: "",
};

export const findNotifications = createAsyncThunk(
  "notification/findNotifications",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/notification?page=${
          page + 1
        }&limit=20`,
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

export const notSeenNotifications = createAsyncThunk(
  "notification/notSeenNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/notification/not-seen`,
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

export const markAsRead = createAsyncThunk(
  "user/markAsRead",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        method: "put",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/notification/mark-as-read/${values.id}`,
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

export const markAllAsRead = createAsyncThunk(
  "user/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await axios({
        method: "put",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/notification/mark-all-as-read/`,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return true;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const deleteAllNotifications = createAsyncThunk(
  "user/deleteAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/notification/`,
        headers: {
          token: localStorage.getItem("userInfo"),
        },
      });
      return true;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    resetNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findNotifications.pending, (state) => {
      if (!state.notifications.length) {
        state.loading = true;
      } else {
        state.fetching = true;
      }
    });
    builder.addCase(findNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.notifications = state.notifications.concat(action.payload);
      state.error = "";
    });
    builder.addCase(findNotifications.rejected, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.notifications = [];
      state.error = action.payload;
    });

    builder.addCase(markAsRead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markAsRead.fulfilled, (state) => {
      state.loading = false;
      state.notSeen -= 1;
      state.error = "";
    });
    builder.addCase(markAsRead.rejected, (state, action) => {
      state.loading = false;
      state.notifications = [];
      state.error = action.payload;
    });

    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.notifications.forEach((notification) => {
        notification.isVisited = true;
      });
      state.notSeen = 0;
    });
    builder.addCase(markAllAsRead.rejected, (state, action) => {
      state.loading = false;
      state.notifications = [];
      state.error = action.payload;
    });

    builder.addCase(notSeenNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(notSeenNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notSeen = action.payload;
      state.error = "";
    });
    builder.addCase(notSeenNotifications.rejected, (state, action) => {
      state.loading = false;
      state.notSeen = 0;
      state.error = action.payload;
    });

    builder.addCase(deleteAllNotifications.fulfilled, (state) => {
      toast.success(<FormattedMessage id="DeleteNotificationMsg" />);
      state.loading = false;
      state.notifications = [];
      state.error = "";
    });
    builder.addCase(deleteAllNotifications.rejected, (state, action) => {
      state.loading = false;
      state.notifications = [];
      state.error = action.payload;
    });
  },
});

export const { resetError, resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  // for Auth User
  conversation: null,
  admins: null,
  user: null,
  userMessages: [],
  // for Admin
  allMessages: [],
};

export const findMyMessages = createAsyncThunk(
  "chat/findMyMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/chat/my-conversation`,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findAllMessages = createAsyncThunk(
  "chat/findAllMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/chat`,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const addMessage = createAsyncThunk(
  "chat/addMessage",
  async (info, { rejectWithValue }) => {
    try {
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/chat/auth-msg`,
        headers: { token: localStorage.getItem("userInfo") },
        data: info.values,
      });
      return info;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findMyMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findMyMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.conversation = action.payload._id;
      state.userMessages = action.payload.messages;
      state.admins = action.payload.admins;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(findMyMessages.rejected, (state, action) => {
      state.loading = false;
      state.userMessages = [];
      state.error = action.payload;
    });

    builder.addCase(addMessage.fulfilled, (state, action) => {
      const { values, user } = action.payload;
      const newMessage = {
        createdAt: new Date().toISOString(),
        _id: new Date().toISOString(),
        text: values.text,
        sender: {
          fullname: user.fullname,
          _id: user._id,
          image: user.image,
        },
      };
      state.userMessages = state.userMessages.concat(newMessage);
      state.user.seen = true;
      state.user.notSeen = 0;
      state.error = "";
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      state.userMessages = [];
      state.error = action.payload;
    });

    builder.addCase(findAllMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.allMessages = action.payload;
      state.error = "";
    });
    builder.addCase(findAllMessages.rejected, (state, action) => {
      state.loading = false;
      state.allMessages = [];
      state.error = action.payload;
    });
  },
});

export const { resetError } = chatSlice.actions;
export default chatSlice.reducer;

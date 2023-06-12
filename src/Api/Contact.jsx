import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  contacts: [],
  contact: null,
  error: "",
};

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/contact`,
        values
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findContacts = createAsyncThunk(
  "contact/findContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/contact`,
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

export const findContact = createAsyncThunk(
  "contact/findContact",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/contact/${id}`,
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

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (values, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_PORT}/api/contact/${values.id}`,
        {
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return values.id;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addContact.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addContact.rejected, (state, action) => {
      toast.error(action.payload);
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(findContacts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
      state.error = "";
    });
    builder.addCase(findContacts.rejected, (state, action) => {
      state.loading = false;
      state.contacts = [];
      state.error = action.payload;
    });

    builder.addCase(findContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
      state.error = "";
    });
    builder.addCase(findContact.rejected, (state, action) => {
      state.loading = false;
      state.contact = null;
      state.error = action.payload;
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
      state.error = "";
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.loading = false;
      state.contacts = [];
      state.error = action.payload;
    });
  },
});

export const { resetError } = contactSlice.actions;
export default contactSlice.reducer;

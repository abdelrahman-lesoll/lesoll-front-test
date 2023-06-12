import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  blogs: [],
  singleBlog: null,
  error: "",
};

export const findAllBlogs = createAsyncThunk(
  "blog/findAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/blog`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findSingleBlog = createAsyncThunk(
  "blog/findSingleBlog",
  async (title, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/blog/${title}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const blogForm = (values, fromUpdate = false) => {
  const formData = new FormData();
  formData.append("title", JSON.stringify(values.title));
  formData.append("description", JSON.stringify(values.description));
  formData.append("metaDescription", JSON.stringify(values.metaDescription));
  formData.append("image", values.image);
  if (fromUpdate) {
    formData.append("oldImage", values.oldImage);
  }
  return formData;
};

export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/blog`,
        data: blogForm(values),
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/blog/${values.slug}`,
        data: blogForm(values, true),
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (values, { rejectWithValue }) => {
    try {
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/blog/${values.id}`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return values.id;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      state.error = "";
    });
    builder.addCase(findAllBlogs.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.error = action.payload;
    });

    builder.addCase(addBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBlog.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateBlog.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      state.error = "";
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.error = action.payload;
    });

    builder.addCase(findSingleBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findSingleBlog.fulfilled, (state, action) => {
      state.singleBlog = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(findSingleBlog.rejected, (state, action) => {
      state.loading = false;
      state.singleBlog = null;
      state.error = action.payload;
    });
  },
});

export const { resetError } = blogSlice.actions;
export default blogSlice.reducer;

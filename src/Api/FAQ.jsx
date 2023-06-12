import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  faqs: [],
  singleFAQ: null,
  error: "",
};

export const findAllFaqs = createAsyncThunk(
  "faq/findAllFaqs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/question`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findFaqByRelated = createAsyncThunk(
  "faq/findFaqByRelated",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/question/related/${values}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findFaq = createAsyncThunk(
  "faq/findFaq",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/question/${id}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const faqForm = (values, fromUpdate) => {
  const formData = new FormData();
  formData.append("question", JSON.stringify(values.question));
  values.answers.map((answer) => {
    formData.append("answers[]", JSON.stringify(answer));
  });
  formData.append("video", values.video);
  if (fromUpdate) {
    formData.append("oldVideo", values.oldVideo);
  }
  return formData;
};

export const addFaq = createAsyncThunk(
  "faq/addFaq",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/question`,
        data: faqForm(values),
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const updateFaq = createAsyncThunk(
  "faq/updateFaq",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/question/${values.id}`,
        data: faqForm(values, true),
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAllFaqs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllFaqs.fulfilled, (state, action) => {
      state.loading = false;
      state.faqs = action.payload;
      state.error = "";
    });
    builder.addCase(findAllFaqs.rejected, (state, action) => {
      state.loading = false;
      state.faqs = [];
      state.error = action.payload;
    });

    builder.addCase(findFaqByRelated.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findFaqByRelated.fulfilled, (state, action) => {
      state.loading = false;
      state.faqs = action.payload;
      state.error = "";
    });
    builder.addCase(findFaqByRelated.rejected, (state, action) => {
      state.loading = false;
      state.faqs = [];
      state.error = action.payload;
    });

    builder.addCase(findFaq.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findFaq.fulfilled, (state, action) => {
      state.singleFAQ = action.payload;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(findFaq.rejected, (state, action) => {
      state.loading = false;
      state.singleFAQ = null;
      state.error = action.payload;
    });

    builder.addCase(addFaq.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addFaq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateFaq.fulfilled, (state) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateFaq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetError } = faqSlice.actions;
export default faqSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const initialState = {
  loading: false,
  loadingRelated: false,
  fetching: false,
  pageSearch: 0,
  singleRealty: null,
  addRealtyNotifications: [],
  myRealty: [],
  adminRealty: [],
  nPages: 0,
  subMostView: [],
  mostView: [],
  realtyGovernrate: [],
  realtyRegions: [],
  offersForSale: 0,
  cashedRealties: 0,
  installmentRealties: 0,
  realFinanceRealties: 0,
  cashInstallmentRealties: 0,
  cashRealFinanceRealties: 0,
  offersForRent: 0,
  dailyRealties: 0,
  monthlyRealties: 0,
  weeklyeRealties: 0,
  // number of deleted Realties
  nDelRealties: 0,
  realtyStatus: [],
  userRealty: [],
  searchRealty: [],
  relatedRealties: [],
  error: "",
};

function convertToEnglishNumber(input) {
  var englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var arabicNumbers = [
    /[\u0660]/g,
    /[\u0661]/g,
    /[\u0662]/g,
    /[\u0663]/g,
    /[\u0664]/g,
    /[\u0665]/g,
    /[\u0666]/g,
    /[\u0667]/g,
    /[\u0668]/g,
    /[\u0669]/g,
  ];
  var englishNumberString = input;

  for (var i = 0; i < arabicNumbers.length; i++) {
    englishNumberString = englishNumberString.replace(
      arabicNumbers[i],
      englishNumbers[i]
    );
  }

  return englishNumberString;
}

const realtyForm = (values, fromUpdate = false) => {
  const formData = new FormData();
  formData.append("address", JSON.stringify(values.address));
  formData.append("appointments", JSON.stringify(values.appointments));
  formData.append(
    "area",
    convertToEnglishNumber(String(values.area).split(",").join(""))
  );
  formData.append(
    "bathRooms",
    values.propType === "Land"
      ? 0
      : convertToEnglishNumber(String(values.bathRooms).split(",").join(""))
  );
  formData.append("buildingYear", values.buildingYear);
  formData.append("deliveryDate", values.deliveryDate);
  formData.append("commission_type", values.commission_type);
  formData.append(
    "commission",
    !values.commission_type
      ? 0
      : convertToEnglishNumber(String(values.commission).split(",").join(""))
  );
  formData.append("description", values.description);
  formData.append(
    "downPayment",
    convertToEnglishNumber(String(values.downPayment).split(",").join(""))
  );
  formData.append("finishingType", values.finishingType);
  values.imgs?.map((img) => formData.append("imgs", img));
  values.installmentOption.period = convertToEnglishNumber(
    String(values.installmentOption.period).split(",").join("")
  );
  values.installmentOption.amount = convertToEnglishNumber(
    String(values.installmentOption.amount).split(",").join("")
  );
  formData.append(
    "installmentOption",
    JSON.stringify(values.installmentOption)
  );
  formData.append(
    "insurance",
    convertToEnglishNumber(String(values.insurance).split(",").join(""))
  );
  formData.append("isFurnished", values.isFurnished);
  formData.append(
    "level",
    convertToEnglishNumber(String(values.level).split(",").join(""))
  );
  formData.append("negotiable", values.negotiable);
  formData.append("offer", values.offer);
  formData.append(
    "price",
    convertToEnglishNumber(String(values.price).split(",").join(""))
  );
  formData.append("propType", values.propType);
  formData.append(
    "rentalPeriod",
    convertToEnglishNumber(String(values.rentalPeriod).split(",").join(""))
  );
  formData.append(
    "rooms",
    values.propType === "Land"
      ? 0
      : convertToEnglishNumber(String(values.rooms).split(",").join(""))
  );
  values.saleOption.map((option) => formData.append("saleOption[]", option));
  values.service.map((service) => formData.append("service[]", service));
  formData.append("title", values.title);
  formData.append("landType", values.landType);
  formData.append("unitType", values.unitType);
  if (fromUpdate) {
    values.delImgs.map((img) =>
      formData.append("delImgs[]", JSON.stringify(img))
    );
    const oldImgs = values.oldImgs.filter(
      (oldImg) => !values.delImgs.includes(oldImg)
    );
    oldImgs.map((img) => formData.append("oldImgs[]", JSON.stringify(img)));
    formData.append("oldGovernrate", values.oldGovernrate);
    formData.append("user", values.user);
  }
  return formData;
};

export const addRealty = createAsyncThunk(
  "realty/addRealty",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty`,
        realtyForm(values),
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

export const updateRealty = createAsyncThunk(
  "realty/updateRealty",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/${values.id}`,
        realtyForm(values, true),
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

export const deleteRealty = createAsyncThunk(
  "realty/deleteRealty",
  async (values, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/${values.id}`,
        {
          data: values,
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return values.id;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findMyRealty = createAsyncThunk(
  "realty/findMyRealty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/my-realty`,
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

export const singleRealty = createAsyncThunk(
  "realty/singleRealty",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_PORT
        }/api/realty/${id}?userKey=${localStorage.getItem(
          "user-key"
        )}&page=1&limit=6`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const relatedRealties = createAsyncThunk(
  "realty/relatedRealties",
  async ({ governrate, region, page, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/related/${id}?page=${
          page + 1
        }&limit=9&governrate=${governrate}&region=${region}&userKey=${localStorage.getItem(
          "user-key"
        )}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const searchRealty = createAsyncThunk(
  "realty/searchRealty",
  async ({ page, values }, { rejectWithValue }) => {
    try {
      if (localStorage.getItem("sitemap-offer")) {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_PORT
          }/api/realty/SitemapSearch?offer=${localStorage.getItem(
            "sitemap-offer"
          )}&unitType=${localStorage.getItem(
            "sitemap-unitType"
          )}&governrate=${localStorage.getItem(
            "sitemap-governrate"
          )}&region=${localStorage.getItem(
            "sitemap-region"
          )}&saleOption=${localStorage.getItem("sitemap-saleOption")}&page=${
            page + 1
          }&limit=15&userKey=${localStorage.getItem("user-key")}`
        );
        return response.data;
      } else {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_PORT
          }/api/realty/Search?${values}&page=${
            page + 1
          }&limit=15&userKey=${localStorage.getItem("user-key")}`
        );
        return response.data;
      }
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findAllOrSubRealty = createAsyncThunk(
  "realty/findAllOrSubRealty",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        page !== undefined
          ? `${import.meta.env.VITE_SERVER_PORT}/api/realty?page=${
              page + 1
            }&limit=6&userKey=${localStorage.getItem("user-key")}`
          : `${import.meta.env.VITE_SERVER_PORT}/api/realty`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findAdminRealty = createAsyncThunk(
  "realty/findAdminRealty",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_SERVER_PORT
        }/api/realty/admin?page=${page}&limit=10`,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findMostView = createAsyncThunk(
  "realty/findMostView",
  async ({ page, homePage }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/most-views?page=${
          page + 1
        }&limit=${homePage ? "6" : "9"}&userKey=${localStorage.getItem(
          "user-key"
        )}`
      );
      return { data: response.data, homePage };
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findByGovernrate = createAsyncThunk(
  "realty/findByGovernrate",
  async ({ page, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/governrate/${id}?page=${
          page + 1
        }&limit=15`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findByRegionTitle = createAsyncThunk(
  "realty/findByRegionTitle",
  async ({ page, title }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/region/${title}?page=${
          page + 1
        }&limit=15`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findByStatus = createAsyncThunk(
  "realty/findByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/status/${status}`,
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

export const findUserRealty = createAsyncThunk(
  "realty/findUserRealty",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/user/${userId}`
      );
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const changeStatus = createAsyncThunk(
  "realty/changeStatus",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/realty/change-status/${
          values.id
        }`,
        data: values,
        headers: { token: localStorage.getItem("userInfo") },
      });
      return {
        status: values.status,
        id: values.id,
        data: response.data,
      };
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const increaseViews = createAsyncThunk(
  "realty/increaseViews",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_SERVER_PORT}/api/realty/increase-views/${
          values.id
        }?userKey=${localStorage.getItem("user-key")}`,
      });
      return response.data;
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findByOffer = createAsyncThunk(
  "realty/findByOffer",
  async ({ offer, from, to }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_PORT
        }/api/realty/find-by/${offer}/${from}/${to}`,
        {
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return { offer, data: response.data };
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findBySaleOption = createAsyncThunk(
  "realty/findBySaleOption",
  async ({ saleOption, from, to }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_PORT}/api/realty/saleOption`,
        { saleOption, from, to },
        {
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return { saleOption, data: response.data };
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findByRentalPeriod = createAsyncThunk(
  "realty/findByRentalPeriod",
  async ({ rentalPeriod, from, to }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_PORT
        }/api/realty/find-by-rental-period/${rentalPeriod}/${from}/${to}`,
        {
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return { rentalPeriod, data: response.data };
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

export const findAndCountStatus = createAsyncThunk(
  "realty/findAndCountStatus",
  async ({ status, from, to }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_PORT
        }/api/realty/find-and-count-status/${status}/${from}/${to}`,
        {
          headers: { token: localStorage.getItem("userInfo") },
        }
      );
      return { status, data: response.data };
    } catch ({ response }) {
      throw rejectWithValue(response.data);
    }
  }
);

const realtySlice = createSlice({
  name: "realty",
  initialState,
  reducers: {
    resetAddRealty: (state) => {
      state.addRealtyNotifications = [];
    },
    resetError: (state) => {
      state.error = "";
    },
    resetSearchRealty: (state) => {
      state.searchRealty = [];
      state.pageSearch = 0;
    },
    resetGovernrateRealty: (state) => {
      state.realtyGovernrate = [];
    },
    resetRelatedRealty: (state) => {
      state.relatedRealties = [];
    },
    resetRegionRealty: (state) => {
      state.realtyRegions = [];
    },
    resetMostView: (state) => {
      state.mostView = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAndCountStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAndCountStatus.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === "Deleted") {
        state.nDelRealties = action.payload.data;
      }
      state.error = "";
    });
    builder.addCase(findAndCountStatus.rejected, (state, action) => {
      state.loading = false;
      state.dailyRealties = 0;
      state.weeklyeRealties = 0;
      state.monthlyRealties = 0;
      state.error = action.payload;
    });

    builder.addCase(findByRentalPeriod.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findByRentalPeriod.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.rentalPeriod === "Daily") {
        state.dailyRealties = action.payload.data;
      } else if (action.payload.rentalPeriod === "Monthly") {
        state.monthlyRealties = action.payload.data;
      } else {
        state.weeklyeRealties = action.payload.data;
      }
      state.error = "";
    });
    builder.addCase(findByRentalPeriod.rejected, (state, action) => {
      state.loading = false;
      state.dailyRealties = 0;
      state.weeklyeRealties = 0;
      state.monthlyRealties = 0;
      state.error = action.payload;
    });

    builder.addCase(findBySaleOption.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findBySaleOption.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload.saleOption.length === 1 &&
        action.payload.saleOption[0] === "Cash"
      ) {
        state.cashedRealties = action.payload.data;
      } else if (
        action.payload.saleOption.length === 1 &&
        action.payload.saleOption[0] === "Installment"
      ) {
        state.installmentRealties = action.payload.data;
      } else if (
        action.payload.saleOption.length === 1 &&
        action.payload.saleOption[0] === "Real Estate Finance"
      ) {
        state.realFinanceRealties = action.payload.data;
      } else if (
        action.payload.saleOption.length === 2 &&
        action.payload.saleOption[0] === "Cash" &&
        action.payload.saleOption[1] === "Installment"
      ) {
        state.cashInstallmentRealties = action.payload.data;
      } else if (
        action.payload.saleOption.length === 2 &&
        action.payload.saleOption[0] === "Cash" &&
        action.payload.saleOption[1] === "Real Estate Finance"
      ) {
        state.cashRealFinanceRealties = action.payload.data;
      }
      state.error = "";
    });
    builder.addCase(findBySaleOption.rejected, (state, action) => {
      state.loading = false;
      state.cashedRealties = 0;
      state.installmentRealties = 0;
      state.realFinanceRealties = 0;
      state.cashInstallmentRealties = 0;
      state.cashRealFinanceRealties = 0;
      state.dailyRealties = 0;
      state.monthlyRealties = 0;
      state.weeklyeRealties = 0;
      state.error = action.payload;
    });

    builder.addCase(findByOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findByOffer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.offer === "For Sale") {
        state.offersForSale = action.payload.data;
      } else {
        state.offersForRent = action.payload.data;
      }
      state.error = "";
    });
    builder.addCase(findByOffer.rejected, (state, action) => {
      state.loading = false;
      state.offersForSale = 0;
      state.offersForRent = 0;
      state.error = action.payload;
    });

    builder.addCase(addRealty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRealty.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="RealtyReview" />);
      state.loading = false;
      state.addRealtyNotifications = action.payload;
      state.error = "";
    });
    builder.addCase(addRealty.rejected, (state, action) => {
      state.loading = false;
      state.addRealtyNotifications = [];
      state.error = action.payload;
    });

    builder.addCase(updateRealty.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        toast.success(<FormattedMessage id="SuccessOperation" />);
      } else {
        toast.success(<FormattedMessage id="RealtyReview" />);
        state.addRealtyNotifications = action.payload;
      }
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateRealty.rejected, (state, action) => {
      state.loading = false;
      state.addRealtyNotifications = [];
      state.error = action.payload;
    });

    builder.addCase(findMyRealty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findMyRealty.fulfilled, (state, action) => {
      state.loading = false;
      state.myRealty = action.payload;
      state.error = "";
    });
    builder.addCase(findMyRealty.rejected, (state, action) => {
      state.loading = false;
      state.myRealty = [];
      state.error = action.payload;
    });

    builder.addCase(findAdminRealty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAdminRealty.fulfilled, (state, action) => {
      state.loading = false;
      state.adminRealty = action.payload.data;
      state.nPages = action.payload.nPages;
      state.error = "";
    });
    builder.addCase(findAdminRealty.rejected, (state, action) => {
      state.loading = false;
      state.adminRealty = [];
      state.nPages = 0;
      state.error = action.payload;
    });

    builder.addCase(deleteRealty.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      state.myRealty = state.myRealty.filter(
        (realty) => realty._id !== action.payload
      );
      state.offersForRent = state.offersForRent.filter(
        (realty) => realty._id !== action.payload
      );
      state.offersForSale = state.offersForSale.filter(
        (realty) => realty._id !== action.payload
      );
      state.realtyStatus = state.realtyStatus.filter(
        (realty) => realty._id !== action.payload
      );
      state.error = "";
    });
    builder.addCase(deleteRealty.rejected, (state, action) => {
      state.loading = false;
      state.myRealty = [];
      state.error = action.payload;
    });

    builder.addCase(singleRealty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(singleRealty.fulfilled, (state, action) => {
      state.loading = false;
      state.singleRealty = action.payload;
      state.error = "";
    });
    builder.addCase(singleRealty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.singleRealty = null;
    });

    builder.addCase(relatedRealties.pending, (state) => {
      if (!state.relatedRealties.length) {
        state.loading = true;
      } else {
        state.fetching = true;
      }
    });
    builder.addCase(relatedRealties.fulfilled, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.relatedRealties = state.relatedRealties.concat(action.payload);
      state.error = "";
    });
    builder.addCase(relatedRealties.rejected, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.error = action.payload;
      state.relatedRealties = [];
    });

    builder.addCase(searchRealty.pending, (state) => {
      if (!state.searchRealty.length) {
        state.loading = true;
      } else {
        state.fetching = true;
      }
    });
    builder.addCase(searchRealty.fulfilled, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.searchRealty = state.searchRealty.concat(action.payload);
      state.pageSearch++;
      state.error = "";
    });
    builder.addCase(searchRealty.rejected, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.error = action.payload;
      state.searchRealty = [];
    });

    builder.addCase(findAllOrSubRealty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAllOrSubRealty.fulfilled, (state, action) => {
      state.loading = false;
      state.myRealty = action.payload;
      state.error = "";
    });
    builder.addCase(findAllOrSubRealty.rejected, (state, action) => {
      state.loading = false;
      state.myRealty = [];
      state.error = action.payload;
    });

    builder.addCase(findMostView.pending, (state) => {
      if (state.mostView.length === 0) {
        state.loading = true;
      } else {
        state.fetching = true;
      }
    });
    builder.addCase(findMostView.fulfilled, (state, action) => {
      state.fetching = false;
      state.loading = false;
      if (action.payload.homePage) {
        state.subMostView = action.payload.data;
      } else {
        state.mostView = state.mostView.concat(action.payload.data);
      }
      state.error = "";
    });
    builder.addCase(findMostView.rejected, (state, action) => {
      state.fetching = false;
      state.loading = false;
      state.mostView = [];
      state.subMostView = [];
      state.error = action.payload;
    });

    builder.addCase(findByGovernrate.pending, (state) => {
      if (!state.realtyGovernrate.length) {
        state.loading = true;
      } else {
        state.fetching = true;
      }
    });
    builder.addCase(findByGovernrate.fulfilled, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.realtyGovernrate = state.realtyGovernrate.concat(action.payload);
      state.error = "";
    });
    builder.addCase(findByGovernrate.rejected, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.realtyGovernrate = [];
      state.error = action.payload;
    });

    builder.addCase(findByRegionTitle.pending, (state) => {
      if (!state.realtyRegions.length) {
        state.loading = true;
      } else {
        state.fetching = true;
      }
    });
    builder.addCase(findByRegionTitle.fulfilled, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.realtyRegions = state.realtyRegions.concat(action.payload);
      state.error = "";
    });
    builder.addCase(findByRegionTitle.rejected, (state, action) => {
      state.loading = false;
      state.fetching = false;
      state.realtyRegions = [];
      state.error = action.payload;
    });

    builder.addCase(findUserRealty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findUserRealty.fulfilled, (state, action) => {
      state.loading = false;
      state.userRealty = action.payload;
      state.error = "";
    });
    builder.addCase(findUserRealty.rejected, (state, action) => {
      state.loading = false;
      state.userRealty = [];
      state.error = action.payload;
    });

    builder.addCase(changeStatus.fulfilled, (state, action) => {
      toast.success(<FormattedMessage id="SuccessOperation" />);
      state.loading = false;
      if (action.payload.status === "Deleted") {
        state.myRealty = state.myRealty.filter(
          (realty) => realty._id !== action.payload.id
        );
      }
      state.error = "";
    });
    builder.addCase(changeStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(increaseViews.fulfilled, (state) => {
      state.error = "";
    });
    builder.addCase(increaseViews.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(findByStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findByStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.realtyStatus = action.payload;
      state.error = "";
    });
    builder.addCase(findByStatus.rejected, (state, action) => {
      state.loading = false;
      state.realtyStatus = [];
      state.error = action.payload;
    });
  },
});

export const {
  resetAddRealty,
  resetSearchRealty,
  resetGovernrateRealty,
  resetRegionRealty,
  resetRelatedRealty,
  resetMostView,
  resetError,
} = realtySlice.actions;
export default realtySlice.reducer;

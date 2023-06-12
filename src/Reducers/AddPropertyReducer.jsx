import { FormattedMessage } from "react-intl";

export const OfferOption = [
  {
    label: <FormattedMessage id="For Sale" />,
    value: "For Sale",
  },
  {
    label: <FormattedMessage id="For Rent" />,
    value: "For Rent",
  },
];

export const ExtraSearch = [
  {
    label: <FormattedMessage id="Newest" />,
    value: "Newest",
  },
  {
    label: <FormattedMessage id="Oldest" />,
    value: "Oldest",
  },
  {
    label: <FormattedMessage id="LowestPrice" />,
    value: "LowestPrice",
  },
  {
    label: <FormattedMessage id="HighestPrice" />,
    value: "HighestPrice",
  },
  {
    label: <FormattedMessage id="MostView" />,
    value: "MostView",
  },
];

export const LandTypes = [
  {
    label: <FormattedMessage id="Agriculture" />,
    value: "Agriculture",
  },
  {
    label: <FormattedMessage id="Building" />,
    value: "Building",
  },
];

export const PropTypes = [
  {
    label: <FormattedMessage id="Residential" />,
    value: "Residential",
  },
  {
    label: <FormattedMessage id="Commercial" />,
    value: "Commercial",
  },
  {
    label: <FormattedMessage id="Land" />,
    value: "Land",
  },
];

export const RentalPeriod = [
  {
    label: <FormattedMessage id="Yearly" />,
    value: "Yearly",
  },
  {
    label: <FormattedMessage id="Monthly" />,
    value: "Monthly",
  },
  {
    label: <FormattedMessage id="Weekly" />,
    value: "Weekly",
  },
  {
    label: <FormattedMessage id="Daily" />,
    value: "Daily",
  },
];

export const SaleOption = [
  {
    label: <FormattedMessage id="Cash" />,
    value: "Cash",
  },
  {
    label: <FormattedMessage id="Installment" />,
    value: "Installment",
  },
  {
    label: <FormattedMessage id="RealFinance" />,
    value: "Real Estate Finance",
  },
];

export const FinishingOption = [
  { label: <FormattedMessage id="Super Lux" />, value: "Super Lux" },
  { label: <FormattedMessage id="Lux" />, value: "Lux" },
  { label: <FormattedMessage id="Semi Finished" />, value: "Semi Finished" },
  { label: <FormattedMessage id="Not Finished" />, value: "Not Finished" },
];

export const InstallmentType = [
  { label: <FormattedMessage id="Yearly" />, value: "Yearly" },
  { label: <FormattedMessage id="Monthly" />, value: "Monthly" },
];

export const CommissionType = [
  { label: <FormattedMessage id="NoCommission" />, value: "" },
  { label: <FormattedMessage id="Fixed" />, value: "Fixed" },
  { label: <FormattedMessage id="Percentage" />, value: "Percentage" },
];

export const initialState = {
  // time section ..
  start: null,
  end: null,
  startTime: null,
  endTime: null,
  allDays: 0,
  // gallery section
  oldImages: [],
  delImages: [],
  originalImage: [],
  previewSource: [],
};

export const reducer = (state = initialState, action) => {
  const { allDays } = state;
  switch (action.type) {
    case "originalImage":
      return {
        ...state,
        originalImage: [...state.originalImage, action.payload],
      };
    case "previewSource":
      return {
        ...state,
        previewSource: [...state.previewSource, action.payload],
      };
    case "filterPreviewSource":
      return {
        ...state,
        previewSource: [
          ...state.previewSource.slice(0, action.payload),
          ...state.previewSource.slice(
            action.payload + 1,
            state.previewSource.length
          ),
        ],
      };
    case "oldImages":
      return {
        ...state,
        oldImages: action.payload,
      };
    case "delOldImages":
      return {
        ...state,
        oldImages: state.oldImages.filter(
          (oldImg) => oldImg !== action.payload
        ),
      };
    case "delImages":
      return {
        ...state,
        delImages: [...state.delImages, action.payload],
      };
    case "delAll":
      return {
        ...state,
        oldImages: [],
        delImages: [],
        originalImage: [],
        previewSource: [],
      };
    case "changeDateRange":
      return {
        ...state,
        start: action.payload.start,
        end: action.payload.end,
        allDays: -1,
      };
    case "changeDays":
      return {
        ...state,
        start: null,
        end: null,
        allDays: !allDays ? 1 : allDays === 1 ? -1 : 1,
      };
    case "StartTime":
      return {
        ...state,
        startTime: action.payload,
      };
    case "EndTime":
      return {
        ...state,
        endTime: action.payload,
      };
    default: {
      return { ...state };
    }
  }
};

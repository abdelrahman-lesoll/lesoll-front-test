import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  title: "",
  offer: "For Sale",
  negotiable: false,
  isFurnished: false,
  propType: "Residential",
  unitType: "",
  landType: "",
  rentalPeriod: "",
  saleOption: [],
  area: "",
  price: "",
  downPayment: "",
  insurance: "", // ده التأمين فى حاله الايجار
  installmentOption: {
    type: "Yearly", // Yearly or Monthly
    period: "", // every how many month or every how many year ?
    amount: "", // Amount of installment
  },
  commission: 0,
  commission_type: "",
  rooms: "",
  bathRooms: "",
  buildingYear: "",
  deliveryDate: "",
  level: "",
  finishingType: "",
  imgs: [],
  oldImgs: [],
  description: "",
  service: [],
  address: {
    name: "",
    longitude: "",
    latitude: "",
    placeId: "",
    governrate: "",
    region: "",
    neighbourHood: "",
  },
  appointments: {
    allDays: true,
    from: "",
    to: "",
    startDate: "",
    endDate: "",
  },
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(<FormattedMessage id="Required" />),
  propType: Yup.string().required(<FormattedMessage id="Required" />),
  unitType: Yup.string().when("propType", {
    is: (propType) => propType !== "Land",
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  landType: Yup.string().when("propType", {
    is: (propType) => propType === "Land",
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  rentalPeriod: Yup.string().when("offer", {
    is: (offer) => offer === "For Rent",
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  insurance: Yup.string().when("offer", {
    is: (offer) => offer === "For Rent",
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  saleOption: Yup.array().when("offer", {
    is: (offer) => offer === "For Sale",
    then: Yup.array().min(1, <FormattedMessage id="FillAtLeastOne" />),
  }),
  downPayment: Yup.string().when("saleOption", {
    is: (saleOption) => saleOption?.includes("Installment"),
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  installmentOption: Yup.object().when("saleOption", {
    is: (saleOption) => saleOption?.includes("Installment"),
    then: Yup.object().shape({
      type: Yup.string().required(<FormattedMessage id="Required" />),
      period: Yup.string().required(<FormattedMessage id="Required" />),
      amount: Yup.string().required(<FormattedMessage id="Required" />),
    }),
  }),
  area: Yup.string().required(<FormattedMessage id="Required" />),
  price: Yup.string().required(<FormattedMessage id="Required" />),
  rooms: Yup.string().when("propType", {
    is: (propType) => propType !== "Land",
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  bathRooms: Yup.string().when("propType", {
    is: (propType) => propType !== "Land",
    then: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  imgs: Yup.array().when("oldImgs", {
    is: (oldImgs) => oldImgs.length === 0,
    then: Yup.array()
      .min(3, <FormattedMessage id="FillAtLeastThreeImages" />)
      .max(15, <FormattedMessage id="FillAtMost15Images" />),
  }),
  description: Yup.string().required(<FormattedMessage id="Required" />),
  address: Yup.object().shape({
    name: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  appointments: Yup.object().shape({
    from: Yup.string()
      .required(<FormattedMessage id="Required" />)
      .nullable(<FormattedMessage id="Required" />),
    to: Yup.string()
      .required(<FormattedMessage id="Required" />)
      .nullable(<FormattedMessage id="Required" />),
  }),
});

export const realtyOldData = (data) => {
  return {
    user: data?.user._id,
    title: data?.title,
    offer: data?.offer,
    oldPropType: data?.propType,
    propType: data?.propType,
    unitType: data?.unitType?._id || "",
    oldUnitType: data?.unitType?._id || "",
    landType: data?.landType || "",
    area: data?.area?.toLocaleString(),
    price: data?.price?.toLocaleString(),
    commission: data?.commission?.toLocaleString() || 0,
    commission_type: data?.commission_type,
    rooms: data?.rooms?.toLocaleString() || 0,
    bathRooms: data?.bathRooms?.toLocaleString() || 0,
    finishingType: data?.finishingType,
    level: data?.level,
    buildingYear: data?.buildingYear || "",
    deliveryDate: data?.deliveryDate || "",
    isFurnished: data?.isFurnished,
    negotiable: data?.negotiable,
    description: data?.description,
    oldGovernrate: data?.governrate._id,
    imgs: [],
    oldImgs: data?.album,
    delImgs: [],
    service: data?.service.map((servInfo) => servInfo._id),
    address: data?.address,
    rentalPeriod: data?.rentalPeriod,
    insurance: data?.insurance || "",
    saleOption: data?.saleOption,
    downPayment: data?.downPayment || 0,
    installmentOption: {
      type: data?.installmentOption?.type || "Yearly",
      period: data?.installmentOption?.period?.toLocaleString() || "",
      amount: data?.installmentOption?.amount?.toLocaleString() || "",
    },
    appointments: {
      allDays: data?.appointments.allDays,
      from: new Date(data?.appointments.from),
      to: new Date(data?.appointments.to),
      startDate: data?.appointments.startDate
        ? new Date(data?.appointments.startDate)
        : "",
      endDate: data?.appointments.endDate
        ? new Date(data?.appointments.endDate)
        : "",
    },
  };
};

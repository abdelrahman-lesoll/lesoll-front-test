import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  title: {
    en: "",
    ar: "",
  },
};

export const validationSchema = Yup.object().shape({
  title: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
});

export const propertyValues = {
  title: {
    en: "",
    ar: "",
  },
  propType: "",
  header: "",
};

export const propertySchema = Yup.object().shape({
  title: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  propType: Yup.string().required(<FormattedMessage id="Required" />),
  header: Yup.string().required(<FormattedMessage id="Required" />),
});

export const PropertyTypes = [
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Administrative", value: "Administrative" },
];

import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  title: {
    en: "",
    ar: "",
  },
  googleTitle: {
    en: "",
    ar: "",
  },
  image: "",
};

export const validationSchema = Yup.object().shape({
  title: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  googleTitle: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  image: Yup.string().required(<FormattedMessage id="Required" />),
});

export const oldGovernrateData = (singleGovernrate) => {
  return {
    oldImage: singleGovernrate?.image,
    image: singleGovernrate?.image,
    title: singleGovernrate?.title,
    googleTitle: singleGovernrate?.googleTitle,
  };
};

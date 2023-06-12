import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  title: {
    en: "",
    ar: "",
  },
};

export const validationSchema = Yup.object({
  title: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
});

export const oldTermData = (data) => {
  return {
    title: data?.data.data.title,
  };
};

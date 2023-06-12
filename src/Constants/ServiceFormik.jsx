import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  name: {
    en: "",
    ar: "",
  },
};

export const validationSchema = Yup.object({
  name: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
});

export const oldService = (singleService) => {
  return {
    name: singleService?.name,
  };
};

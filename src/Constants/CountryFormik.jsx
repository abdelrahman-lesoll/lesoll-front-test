import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  title: {
    en: "",
    ar: "",
  },
  code: "",
  image: "",
};

export const validationSchema = Yup.object().shape({
  title: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  code: Yup.string().required(<FormattedMessage id="Required" />),
  image: Yup.string().required(<FormattedMessage id="Required" />),
});

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
  governrate: "",
};

export const validationSchema = Yup.object({
  title: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  googleTitle: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  governrate: Yup.string().required(<FormattedMessage id="Required" />),
});

export const findAllGovernrates = (governrates, Language) =>
  governrates?.map((governrate) => {
    return {
      label:
        Language.locale === "en-US" ? governrate.title.en : governrate.title.ar,
      value: governrate._id,
    };
  });

export const regionOldData = (data) => {
  return {
    title: data?.title,
    googleTitle: data?.googleTitle,
    governrate: data?.governrate,
  };
};

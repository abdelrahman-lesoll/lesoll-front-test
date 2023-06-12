import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  title: {
    en: "",
    ar: "",
  },
  description: {
    en: "",
    ar: "",
  },
  metaDescription: {
    en: "",
    ar: "",
  },
  image: "",
};

export const validationSchema = Yup.object({
  // title: Yup.object().shape({
  //   en: Yup.string().required(<FormattedMessage id="Required" />),
  //   ar: Yup.string().required(<FormattedMessage id="Required" />),
  // }),
  // description: Yup.object().shape({
  //   en: Yup.string().required(<FormattedMessage id="Required" />),
  //   ar: Yup.string().required(<FormattedMessage id="Required" />),
  // }),
  image: Yup.string().required(<FormattedMessage id="Required" />),
});

export const oldBlog = (singleBlog) => {
  return {
    title: singleBlog?.title,
    description: singleBlog?.description,
    metaDescription: singleBlog?.metaDescription,
    oldImage: singleBlog?.image,
    image: singleBlog?.image,
  };
};

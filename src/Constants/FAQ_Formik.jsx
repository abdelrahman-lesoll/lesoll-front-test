import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  question: {
    en: "",
    ar: "",
  },
  related: "",
  video: "",
  answers: [{ en: "", ar: "" }],
};

export const validationSchema = Yup.object().shape({
  question: Yup.object().shape({
    en: Yup.string().required(<FormattedMessage id="Required" />),
    ar: Yup.string().required(<FormattedMessage id="Required" />),
  }),
  answers: Yup.array().of(
    Yup.object().shape({
      en: Yup.string().required(<FormattedMessage id="Required" />),
      ar: Yup.string().required(<FormattedMessage id="Required" />),
    })
  ),
  related: Yup.string().required(<FormattedMessage id="Required" />),
});

export const relatedOptions = [
  { label: "General", value: "General" },
  { label: "Owner/Broker", value: "Owner/Broker" },
  { label: "Renter/Buyer", value: "Renter/Buyer" },
];

export const oldFaq = (singleFaq) => {
  return {
    question: singleFaq?.question,
    answers: singleFaq?.answers.map((answer) => {
      return {
        en: answer.en,
        ar: answer.ar,
      };
    }),
    related: singleFaq?.related,
    video: singleFaq?.video,
    oldVideo: singleFaq?.video,
  };
};

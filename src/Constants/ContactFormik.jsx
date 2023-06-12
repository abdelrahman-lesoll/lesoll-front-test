import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  email: "",
  fullname: "",
  code: "+20",
  phone: "",
  subject: "",
  message: "",
};

export const validationSchema = Yup.object({
  email: Yup.string().required(<FormattedMessage id="Required" />),
  fullname: Yup.string().required(<FormattedMessage id="Required" />),
  subject: Yup.string().required(<FormattedMessage id="Required" />),
  phone: Yup.string().required(<FormattedMessage id="Required" />),
  message: Yup.string().required(<FormattedMessage id="Required" />),
});

// Contact Owner from another User
export const AppointmentValues = {
  time: "",
};

export const AppointmentSchema = Yup.object({
  time: Yup.string().required(<FormattedMessage id="Required" />),
});

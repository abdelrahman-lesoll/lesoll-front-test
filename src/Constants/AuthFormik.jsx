import * as Yup from "yup";
import { FormattedMessage } from "react-intl";

export const ForgotInitial = {
  email: "",
};

export const ForgotValidation = Yup.object({
  email: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .email(<FormattedMessage id="EmailNotValid" />),
});

// Register Section
export const RegInitialValues = {
  code: "+20",
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const RegValidationSchema = Yup.object({
  fullname: Yup.string().required(<FormattedMessage id="Required" />),
  email: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .email(<FormattedMessage id="EmailNotValid" />),
  phone: Yup.string().required(<FormattedMessage id="Required" />),
  password: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .min(8, <FormattedMessage id="MinPassword" />),
  confirmPassword: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        <FormattedMessage id="ConfPasswordNotValid" />
      ),
    }),
});

// regular Email, Password Login
export const LoginInitialValues = {
  email: "",
  password: "",
};

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .email(<FormattedMessage id="EmailNotValid" />),
  password: Yup.string().required(<FormattedMessage id="Required" />),
});

// update Password section
export const PasswordInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const PasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required(<FormattedMessage id="Required" />),
  newPassword: Yup.string().required(<FormattedMessage id="Required" />),
  confirmPassword: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        <FormattedMessage id="ConfPasswordNotValid" />
      ),
    }),
});

// Reset Password section
export const ResetInitialValues = {
  newPassword: "",
  confirmPassword: "",
};

export const ResetValidationSchema = Yup.object({
  newPassword: Yup.string().required(<FormattedMessage id="Required" />),
  confirmPassword: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        <FormattedMessage id="ConfPasswordNotValid" />
      ),
    }),
});

import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const initialValues = {
  image: "",
  oldImage: "",
  fullname: "",
  email: "",
  phone: "",
  code: "",
  status: "",
};

export const validationSchema = Yup.object({
  fullname: Yup.string().required(<FormattedMessage id="Required" />),
  email: Yup.string()
    .required(<FormattedMessage id="Required" />)
    .email(<FormattedMessage id="EmailNotValid" />),
  phone: Yup.string().required(<FormattedMessage id="Required" />),
});

export const userRoles = [
  { value: "User", label: "User" },
  { value: "Admin", label: "Admin" },
];

export const userStatus = [
  { value: "Confirmed", label: "Confirmed" },
  { value: "Blocked", label: "Blocked" },
];

export const oldData = (auth) => {
  return {
    id: auth.user?._id,
    image: auth.user?.image,
    oldImage: auth.user?.image,
    fullname: auth.user?.fullname,
    email: auth.user?.email === auth.user?.googleId ? "" : auth.user?.email,
    phone:
      auth.user?.phone === auth.user?.googleId ||
      auth.user?.phone === auth.user?.faceId
        ? ""
        : auth.user?.phone,
    code:
      auth.user?.phone === auth.user?.googleId ||
      auth.user?.phone === auth.user?.faceId
        ? "+20"
        : auth.user?.code,
    status: auth.user?.status,
  };
};

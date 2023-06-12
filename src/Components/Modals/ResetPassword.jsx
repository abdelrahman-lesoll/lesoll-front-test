import { Formik, Form } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { useFind } from "../Hooks/useUser";
import { useLogin } from "../Hooks/useAuth";
import { Helmet } from "react-helmet";
import {
  ResetInitialValues,
  ResetValidationSchema,
} from "../../Constants/AuthFormik";
import DefaultInput from "../Client/Other/DefaultInput";
import SubmitButton from "../Client/Other/SubmitButton";
import BreadCrumb from "../Shared/BreadCrumb";

const ResetPassword = () => {
  useFind("reset-password", location.search);
  const [searchParams] = useSearchParams();
  const intl = useIntl();
  const { handleResetPassword } = useLogin("Reset-Password");
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetResetPassword" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="ResetPassword" />} />
      <div className="container reset-password-container my-5">
        <div className="bg-white shadow-lg border border-radius-5 p-5 w-75 m-auto">
          <h3 className="text-center">
            <span className="border-bottom">
              <FormattedMessage id="ResetPassword" />
            </span>
          </h3>
          <Formik
            initialValues={ResetInitialValues}
            validationSchema={ResetValidationSchema}
            onSubmit={(values) => {
              values.email = searchParams.get("email");
              values.access_token = searchParams.get("access_token");
              handleResetPassword(values);
            }}
          >
            <Form>
              <div className="mb-2">
                <label className="mb-1 mx-1">
                  <FormattedMessage id="NewPassword" />
                </label>
                <DefaultInput
                  type="password"
                  name="newPassword"
                  placeholder="NewPassword"
                />
              </div>
              <div className="mb-2">
                <label className="mb-1 mx-1">
                  <FormattedMessage id="ConfirmPassword" />
                </label>
                <DefaultInput
                  type="password"
                  name="confirmPassword"
                  placeholder="ConfirmPassword"
                />
              </div>
              <div className="mb-2">
                <SubmitButton SubmitName="SaveChanges" />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

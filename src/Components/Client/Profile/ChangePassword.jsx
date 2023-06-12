import { FormattedMessage } from "react-intl";
import { PasswordInitialValues } from "../../../Constants/AuthFormik";
import { PasswordValidationSchema } from "../../../Constants/AuthFormik";
import { Formik, Form } from "formik";
import { useToggleOptions } from "../../Hooks/useUser";
import { Helmet } from "react-helmet";
import DefaultInput from "../Other/DefaultInput";
import SubmitButton from "../Other/SubmitButton";

const ChangePassword = ({ auth }) => {
  const { handleUpdatePassword } = useToggleOptions();
  return (
    <>
      <Helmet>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <div className="col-lg-9 user-profile ">
        <div className="mb-2">
          <h2>
            <FormattedMessage id="ChangePassword" />
          </h2>
        </div>
        <div className="shadow-sm border border-radius-5 py-3 px-2">
          <Formik
            initialValues={PasswordInitialValues}
            validationSchema={PasswordValidationSchema}
            validateOnBlur={false}
            onSubmit={(values, { resetForm }) => {
              values.id = auth.user._id;
              handleUpdatePassword(values);
              resetForm();
            }}
          >
            <Form>
              <PassInput id="CurrentPassword" name="oldPassword" />
              <PassInput id="NewPassword" name="newPassword" />
              <PassInput id="ConfirmPassword" name="confirmPassword" />
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

const PassInput = ({ id, name }) => {
  return (
    <div className="mb-2">
      <label className="fw-bold font-17 mb-1 cursor-pointer">
        <FormattedMessage id={id} />
      </label>
      <DefaultInput type="password" placeholder={id} name={name} />
    </div>
  );
};

export default ChangePassword;

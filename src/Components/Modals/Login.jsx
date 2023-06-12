import { Formik, Form } from "formik";
import { Shared, Or } from "./Shared";
import { FormattedMessage } from "react-intl";
import { LoginInitialValues } from "../../Constants/AuthFormik";
import { LoginValidationSchema } from "../../Constants/AuthFormik";
import { Modal } from "react-bootstrap";
import SubmitButton from "../Client/Other/SubmitButton";
import DefaultInput from "../Client/Other/DefaultInput";
import AcceptTermsPrivacy from "./AcceptTermsPrivacy";

const Login = ({ Context, handleLogin, GooogleLogin, FaceBookLogin }) => {
  return (
    <Modal
      show={Context?.state.modalLogin}
      onHide={() => Context?.dispatch({ type: "modalLogin" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="mb-0">
            <FormattedMessage id="SignIn" />
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={LoginInitialValues}
          validationSchema={LoginValidationSchema}
          validateOnBlur={false}
          onSubmit={(values) => handleLogin(values)}
        >
          <Form>
            <div className="container-fluid">
              <div className="mb-2">
                <label className="mb-1 mx-1">
                  <FormattedMessage id="Email" />
                </label>
                <DefaultInput type="email" name="email" placeholder="Email" />
              </div>
              <div className="mb-2">
                <label className="mb-1 mx-1">
                  <FormattedMessage id="Password" />
                </label>
                <DefaultInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div className="main-text d-flex align-items-center justify-content-end font-14">
                  <span
                    onClick={() => Context.dispatch({ type: "modalForgot" })}
                    className="text-decoration-underline cursor-pointer"
                  >
                    <FormattedMessage id="ForgotPassword" />
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <SubmitButton SubmitName="SignIn" />
              </div>
              <Or title={<FormattedMessage id="Or" />} />
              <Shared {...{ GooogleLogin, FaceBookLogin }} />
              <div className="text-center my-3">
                <span
                  className="custom-transition main-text-hover cursor-pointer"
                  onClick={() => Context?.dispatch({ type: "modalRegister" })}
                >
                  <FormattedMessage id="SuggestRegister" />
                </span>
              </div>
            </div>
          </Form>
        </Formik>
        <AcceptTermsPrivacy />
      </Modal.Body>
    </Modal>
  );
};

export default Login;

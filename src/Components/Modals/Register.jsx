import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import { RegInitialValues } from "../../Constants/AuthFormik";
import { RegValidationSchema } from "../../Constants/AuthFormik";
import { Shared, Or, SharedReg } from "./Shared";
import { FormattedMessage } from "react-intl";
import SubmitButton from "../Client/Other/SubmitButton";
import Phone from "../Client/Other/Phone";
import AcceptTermsPrivacy from "./AcceptTermsPrivacy";
import { ButtonLoading } from "../Shared/Loading";

const Register = ({ Context, GooogleLogin, FaceBookLogin, handleRegister }) => {
  return (
    <Modal
      show={Context?.state.modalRegister}
      onHide={() => Context?.dispatch({ type: "modalRegister" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="mb-0">
            <FormattedMessage id="SignUp" />
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <Formik
            initialValues={RegInitialValues}
            validationSchema={RegValidationSchema}
            validateOnBlur={false}
            onSubmit={(values, { setFieldError }) => {
              // including plus and summation
              if (
                values.code.length + values.phone.length !== 13 &&
                values.code.length + values.phone.length !== 14
              ) {
                setFieldError(
                  "phone",
                  <FormattedMessage
                    id="PhoneNotValid"
                    values={{
                      num: "+201001234567",
                      bdi: (num) => <bdi>{num}</bdi>,
                    }}
                  />
                );
              } else if (
                values.code.length + values.phone.length === 14 &&
                values.phone[0] !== "0"
              ) {
                setFieldError(
                  "phone",
                  <FormattedMessage
                    id="PhoneNotValid"
                    values={{
                      num: "+201001234567",
                      bdi: (num) => <bdi>{num}</bdi>,
                    }}
                  />
                );
              } else {
                if (
                  values.code.length + values.phone.length === 14 &&
                  values.phone[0] === "0"
                ) {
                  values.phone = values.phone.slice(1, values.phone.length);
                }
                handleRegister(values);
              }
            }}
          >
            {(formik) => (
              <Form>
                <div className="row">
                  <SharedReg title="FullName" type="text" name="fullname" />
                  <SharedReg title="Email" type="email" name="email" />
                  <div className="col-12">
                    <div className="mb-2">
                      <label className="mb-1 mx-1">
                        <FormattedMessage id="Phone" />
                      </label>
                      <Phone formik={formik} />
                    </div>
                  </div>
                  <SharedReg title="Password" type="password" name="password" />
                  <SharedReg
                    title="ConfirmPassword"
                    type="password"
                    name="confirmPassword"
                  />
                  <div className="mb-2">
                    {formik.isSubmitting ? (
                      <ButtonLoading width="w-100" />
                    ) : (
                      <SubmitButton SubmitName="SignUp" />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <Or title={<FormattedMessage id="RegisterVia" />} />
          <Shared {...{ GooogleLogin, FaceBookLogin, Context }} />
          <AcceptTermsPrivacy />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;

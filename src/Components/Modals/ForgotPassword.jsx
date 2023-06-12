import { useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Formik, Form } from "formik";
import { ForgotInitial, ForgotValidation } from "../../Constants/AuthFormik";
import DefaultInput from "../Client/Other/DefaultInput";
import SubmitButton from "../Client/Other/SubmitButton";

const ForgotPassword = ({ Context, handleGenerateToken }) => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Modal
      show={Context?.state.modalForgot}
      onHide={() => Context.dispatch({ type: "modalForgot" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="mb-0">
            <FormattedMessage id="ForgotPassword" />
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          {!submitted ? (
            <Formik
              initialValues={ForgotInitial}
              validationSchema={ForgotValidation}
              onSubmit={(values) => {
                handleGenerateToken(values);
                setSubmitted(true);
              }}
            >
              <Form>
                <div className="mb-2">
                  <label className="mb-1 mx-1">
                    <FormattedMessage id="Email" />
                  </label>
                  <DefaultInput type="email" name="email" placeholder="Email" />
                </div>
                <div className="mb-2">
                  <SubmitButton SubmitName="SendEmail" />
                </div>
              </Form>
            </Formik>
          ) : (
            <Alert variant="info">
              <FormattedMessage id="ForgotInfo" />
            </Alert>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;

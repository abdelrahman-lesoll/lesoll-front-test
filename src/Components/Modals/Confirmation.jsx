import { Modal, Button, Form } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppointment } from "../Hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Confirmation = ({
  messageBody,
  confirmation,
  setConfirmation,
  execute,
}) => {
  return (
    <Modal
      show={confirmation}
      onHide={() => setConfirmation(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <FormattedMessage id="ConfirmationHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{messageBody}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            execute();
            setConfirmation(false);
          }}
        >
          <FormattedMessage id="Confirm" />
        </Button>
        <Button variant="secondary" onClick={() => setConfirmation(false)}>
          <FormattedMessage id="Back" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;

export const AppointmentConfirmation = ({
  confirmation,
  setConfirmation,
  data,
}) => {
  const { handleAddAppointment } = useAppointment();
  const navigate = useNavigate();
  return (
    <Modal
      show={confirmation}
      onHide={() => setConfirmation(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <FormattedMessage id="AddToGoogleCalendar" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormattedMessage id="AddCalendarToGoogle" />
        <p className="font-13 mb-0 text-muted text-decoration-underline">
          <FormattedMessage id="CalendarConfirmStat" />
        </p>
        <div className="d-flex align-items-center justify-content-end font-13">
          <span
            onClick={() => navigate("/Terms")}
            className="text-muted text-decoration-underline-hover cursor-pointer"
          >
            <FormattedMessage id="TermsUse" />
          </span>
          <span className="mx-1">.</span>
          <span
            onClick={() => navigate("/Privacy")}
            className="text-muted text-decoration-underline-hover cursor-pointer"
          >
            <FormattedMessage id="Privacy" />
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer className="m-0 p-0 border-0">
        <GoogleLogin
          render={(renderProps) => (
            <button
              className="btn btn-success shadow-none"
              onClick={renderProps.onClick}
            >
              <FormattedMessage id="Confirm" />
            </button>
          )}
          clientId={import.meta.env.VITE_CLIENT_ID}
          onSuccess={(res) => {
            handleAddAppointment({
              seller: data.seller, // here is seller Id
              time: data.time,
              realty: location.pathname.split("/")[2],
              summary: `You Have Appointment With ${data.sellerFullname}`,
              location: location.href,
              refreshToken: res.code,
            });
            setConfirmation(false);
          }}
          onFailure={(err) => console.log(err)}
          cookiePolicy="single_host_origin"
          responseType="code"
          accessType="offline"
          scope="openid email profile https://www.googleapis.com/auth/calendar"
        />
        <button
          className="btn btn-danger"
          onClick={() => {
            handleAddAppointment({
              seller: data.seller, // here is Seller Id
              time: data.time,
              realty: location.pathname.split("/")[2],
            });
            setConfirmation(false);
          }}
        >
          <FormattedMessage id="Cancel" />
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export const DeleteReasons = ({
  confirmation,
  setConfirmation,
  setDelConfirmation,
  reason,
  setReason,
}) => {
  const [error, setError] = useState(null);
  const [resDetail, setResDetail] = useState("");
  const { formatMessage } = useIntl();
  return (
    <Modal show={confirmation} onHide={() => setConfirmation(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="font-19">
          <FormattedMessage id="HelpUsReason" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                onChange={() => setReason("تم البيع")}
                name="flexRadioDefault"
                id="flexRadioDefault1"
                defaultChecked
              />
              <label
                className="cursor-pointer form-check-label mx-2"
                htmlFor="flexRadioDefault1"
              >
                <FormattedMessage id="HaveYourRealtyBeenSold?" />
              </label>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                onChange={() => setReason("غير مهتم")}
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
              <label
                className="cursor-pointer form-check-label mx-2"
                htmlFor="flexRadioDefault2"
              >
                <FormattedMessage id="AreYouNotIntrested?" />
              </label>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                onChange={() => setReason("مشكله فى الموقع اثناء الاعلان")}
              />
              <label
                className="cursor-pointer form-check-label mx-2"
                htmlFor="flexRadioDefault3"
              >
                <FormattedMessage id="FacingProblem" />
              </label>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                onChange={() => setReason("")}
                name="flexRadioDefault"
                id="flexRadioDefault4"
              />
              <label
                className="cursor-pointer form-check-label mx-2"
                htmlFor="flexRadioDefault4"
              >
                <FormattedMessage id="OtherReason?" />
              </label>
            </div>
          </Form.Group>
          {!reason && (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <FormattedMessage id="Reason" />
              </Form.Label>
              <Form.Control
                onChange={(e) => {
                  setResDetail(e.target.value);
                  setError(false);
                }}
                as="textarea"
                placeholder={formatMessage({ id: "Reason" })}
                rows={5}
              />
              {!!error && (
                <Form.Label className="text-danger text-center font-14 w-100">
                  <FormattedMessage id="Required" />
                </Form.Label>
              )}
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setConfirmation(false)}>
          <FormattedMessage id="Back" />
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (!reason && !resDetail) {
              setError(true);
            } else {
              if (!reason) {
                setReason(resDetail);
              }
              setConfirmation(false);
              setDelConfirmation(true);
            }
          }}
        >
          <FormattedMessage id="SubmitReason" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

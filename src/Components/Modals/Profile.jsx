import { Modal } from "react-bootstrap";
import { useAuth } from "../../Utils/Auth";
import { Form, Formik } from "formik";
import { initialValues, oldData } from "../../Constants/UserProfile";
import { validationSchema } from "../../Constants/UserProfile";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { FormattedMessage } from "react-intl";
import { ButtonLoading } from "../Shared/Loading";
import DefaultInput from "../Client/Other/DefaultInput";
import SubmitButton from "../Client/Other/SubmitButton";
import Phone from "../Client/Other/Phone";

const Profile = ({ Context, handleUpdate }) => {
  const auth = useAuth();
  return (
    <Modal
      show={Context?.state?.modalUpdate}
      onHide={() => Context?.dispatch({ type: "modalUpdate" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="mb-0">
            <FormattedMessage id="PersonalInformation" />
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={oldData(auth) || initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnBlur={false}
          onSubmit={(values, { setFieldError }) => {
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
              handleUpdate(values);
            }
          }}
        >
          {(formik) => (
            <Form>
              <div className="mb-2">
                <label className="fw-bold font-17 mb-1 cursor-pointer">
                  <FormattedMessage id="Image" />
                </label>
                <label
                  htmlFor="0"
                  className="cursor-pointer w-100 py-2 px-4 text-muted d-flex align-items-center justify-content-center border border-radius-5 p-2 outline-0"
                >
                  {!Context?.state.modalImg ? (
                    <>
                      <IoMdAddCircleOutline />
                      <span className="mx-1">
                        <FormattedMessage id="UploadImage" />
                      </span>
                    </>
                  ) : (
                    <>
                      <FcCheckmark size="1.2rem" />
                      <span className="mx-1">
                        <FormattedMessage id="UploadedImage" />
                      </span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.target.files[0]);
                    Context?.dispatch({ type: "modalImg" });
                  }}
                  id="0"
                  className="w-100 outline-0 border p-2 border-radius-5 d-none"
                />
              </div>
              <Input id="FullName" name="fullname" />
              <Input id="Email" name="email" />
              <div className="mb-2">
                <label className="fw-bold font-17 mb-1 cursor-pointer">
                  <FormattedMessage id="Phone" />
                </label>
                <Phone formik={formik} />
              </div>
              <div className="mb-1">
                {formik.isSubmitting ? (
                  <ButtonLoading width="w-100" />
                ) : (
                  <SubmitButton SubmitName="SaveChanges" />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const Input = ({ id, name }) => {
  return (
    <div className="mb-2">
      <label className="fw-bold font-17 mb-1 cursor-pointer">
        <FormattedMessage id={id} />
      </label>
      <DefaultInput type="text" placeholder={id} name={name} />
    </div>
  );
};

export default Profile;

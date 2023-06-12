import { Form, Formik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { initialValues } from "../../../Constants/ContactFormik";
import { validationSchema } from "../../../Constants/ContactFormik";
import { useDispatchContacts, ContactFields } from "../../Hooks/useContact";
import { Helmet } from "react-helmet";
import DefaultInput from "../Other/DefaultInput";
import SubmitButton from "../Other/SubmitButton";
import Info from "./Info";
import BreadCrumb from "../../Shared/BreadCrumb";
import Phone from "../Other/Phone";

const Contact = () => {
  const { handleAddContact } = useDispatchContacts();
  const intl = useIntl();
  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetContactUs" })}</title>
        <link rel="canonical" href={location.href} />
        <meta
          name="description"
          content={intl.formatMessage({ id: "HelmetContactDescription" })}
        />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Contact" />} />
      <div className="container my-5">
        <div className="row">
          <Info />
          <div className="col-lg-8">
            <div className="p-2">
              <div className="title mb-4">
                <h3 className="fw-semibold">
                  <span className="border-bottom">
                    <FormattedMessage id="ContactInfo" />
                  </span>
                </h3>
              </div>
              <Formik
                {...{ initialValues, validationSchema }}
                onSubmit={(values, { setFieldError, resetForm }) => {
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
                    values.phone = values.code + values.phone;
                    handleAddContact(values);
                    resetForm();
                  }
                }}
                validateOnBlur={false}
              >
                {(formik) => (
                  <Form>
                    <div className="row">
                      {ContactFields.map(({ type, name, placeholder }) => (
                        <div className="mb-3 col-md-6" key={name}>
                          <DefaultInput {...{ type, name, placeholder }} />
                        </div>
                      ))}
                      <div className="mb-3 col-md-6" key={name}>
                        {/* <DefaultInput {...{ type, name, placeholder }} /> */}
                        <Phone formik={formik} />
                      </div>
                      <div className="mb-3 col-12">
                        <DefaultInput
                          type="text"
                          name="message"
                          placeholder="Message"
                          isTextArea={true}
                          rows="10"
                        />
                      </div>
                      <div className="mb-3 col-12">
                        <SubmitButton SubmitName={"Submit"} />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

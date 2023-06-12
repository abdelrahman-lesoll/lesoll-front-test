import { useState } from "react";
import { TextError } from "../../Shared/ErrorPage";
import { AppointmentValues } from "../../../Constants/ContactFormik";
import { AppointmentSchema } from "../../../Constants/ContactFormik";
import { AppointmentConfirmation } from "../../Modals/Confirmation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import DatePicker from "react-datepicker";

const AddAppointment = ({ auth, owner, appointments }) => {
  const intl = useIntl();
  const [selected, setSelected] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [data, setData] = useState(false);
  return (
    <>
      <Formik
        initialValues={AppointmentValues}
        validationSchema={AppointmentSchema}
        onSubmit={(values) => {
          setData({
            ...values,
            seller: owner._id,
            sellerFullname: owner.fullname,
          });
          setConfirmation(true);
        }}
      >
        <Form>
          <div className="my-2">
            <label>
              <FormattedMessage id="YourName" />
            </label>
            <input
              defaultValue={auth.user.fullname}
              className="outline-0 border w-100 p-2 border-radius-5"
              readOnly
            />
          </div>
          <div className="my-2">
            <label>
              <FormattedMessage id="YourPhone" />
            </label>
            <input
              defaultValue={auth.user.code + auth.user.phone}
              className="outline-0 border w-100 p-2 border-radius-5"
              readOnly
            />
          </div>
          <div className="my-2">
            <label>
              <FormattedMessage id="ChooseAppointment" />
            </label>
            <Field name="time">
              {({ form }) => {
                return (
                  <DatePicker
                    placeholderText={intl.formatMessage({
                      id: "ChooseAppointment",
                    })}
                    className="w-100 p-2 border border-radius-5 outline-0"
                    selected={selected}
                    onChange={(date) => {
                      setSelected(date);
                      form.setFieldValue("time", date);
                    }}
                    showMonthDropdown
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    minTime={new Date()}
                    maxTime={new Date(appointments.to)}
                    {...(!appointments.allDays
                      ? {
                          includeDateIntervals: [
                            {
                              start: new Date(appointments.startDate),
                              end: new Date(appointments.endDate),
                            },
                          ],
                        }
                      : {})}
                  />
                );
              }}
            </Field>
            <ErrorMessage name="time" component={TextError} />
          </div>
          <button
            className="w-100 py-2 px-4 main-bg text-white outline-0 border-0 border-radius-5"
            type="submit"
          >
            <span className="mx-2">
              <FormattedMessage id="ConfirmAppointment" />
            </span>
          </button>
        </Form>
      </Formik>
      <AppointmentConfirmation {...{ confirmation, setConfirmation, data }} />
    </>
  );
};

export default AddAppointment;

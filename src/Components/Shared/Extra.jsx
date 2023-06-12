import { useEffect, useReducer } from "react";
import { initialState, reducer } from "../../Reducers/AddPropertyReducer";
import { FormattedMessage, useIntl } from "react-intl";
import { ErrorMessage, Field } from "formik";
import { TextError } from "./ErrorPage";
import DatePicker from "react-datepicker";

// formik is passed here because of admin panel
const Extra = ({ formik }) => {
  const intl = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (
      !formik.isSubmitting ||
      (Object.keys(formik.errors).length === 1 &&
        Object.keys(formik.errors)[0] === "appointments")
    )
      return;
    if (Object.entries(formik.errors).length > 0) {
      !document.getElementsByName(Object.keys(formik.errors)[0])[0]
        ? document
            .getElementById("gallery")
            ?.scrollIntoView({ behavior: "smooth" })
        : document
            .getElementsByName(Object.keys(formik.errors)[0])[0]
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [formik]);

  const onChange = (dates) => {
    const [start, end] = dates;
    dispatch({
      type: "changeDateRange",
      payload: { start, end },
    });
    formik.setValues({
      ...formik.values,
      appointments: {
        allDays: false,
        startDate: start,
        endDate: end,
        from: "",
        to: "",
      },
    });
  };

  const handleAllDays = () => {
    dispatch({ type: "changeDays" });
    formik.setValues({
      ...formik.values,
      appointments: {
        allDays: !formik.values.appointments.allDays,
        from: "",
        to: "",
        startDate: "",
        endDate: "",
      },
    });
  };
  return (
    <div className="col-12 mb-2">
      <div className="border-bottom mb-2">
        <h2>
          <FormattedMessage id="FreeAppointments" />
        </h2>
      </div>
      <div className="row">
        <div className="col-6 mb-1">
          <div className="border w-100 p-2 border-radius-5 d-flex align-items-center justify-content-between">
            <label htmlFor="all-days" className="text-muted cursor-pointer">
              <FormattedMessage id="AllDays" />
            </label>
            <div className="form-check form-switch">
              <Field
                className="form-check-input cursor-pointer"
                type="checkbox"
                role="switch"
                name="appointments.allDays"
                onChange={handleAllDays}
                id="all-days"
              />
            </div>
          </div>
        </div>
        <div className="mb-1 col-6">
          <DatePicker
            selected={state.start}
            onChange={onChange}
            startDate={state.start || formik.values.appointments.startDate}
            endDate={state.end || formik.values.appointments.endDate}
            selectsRange
            minDate={new Date()}
            placeholderText={intl.formatMessage({ id: "DateRange" })}
            className="outline-0 border w-100 p-2 border-radius-5"
            disabled={formik?.values.appointments.allDays}
          />
        </div>
        <div className="col-6 mb-1">
          <Time
            selected={state.startTime || formik.values.appointments.from}
            type="StartTime"
            dispatch={dispatch}
            name="appointments.from"
            formik={formik}
          />
        </div>
        <div className="col-6 mb-1">
          <Time
            selected={state.endTime || formik.values.appointments.to}
            type="EndTime"
            dispatch={dispatch}
            name="appointments.to"
            formik={formik}
          />
        </div>
      </div>
    </div>
  );
};

const Time = ({ type, selected, dispatch, name, formik }) => {
  const intl = useIntl();
  const handleChange = (date) => {
    dispatch({ type, payload: date });
    formik.setFieldValue(name, date);
  };
  return (
    <>
      <DatePicker
        selected={selected}
        onChange={handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="hh:mm aa"
        placeholderText={intl.formatMessage({ id: type })}
        className="outline-0 border w-100 p-2 border-radius-5"
        value={formik.values[name]}
      />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default Extra;

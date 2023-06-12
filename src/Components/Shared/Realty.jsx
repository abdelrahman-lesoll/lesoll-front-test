import { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import { TextError } from "./ErrorPage";
import ReactDatePicker from "react-datepicker";
import CustomSelect from "../Client/Other/CustomSelect";
import Loading from "./Loading";

export const Title = ({ className, id, placeholder, name, ...rest }) => {
  const intl = useIntl();
  return (
    <div className={`${className || "col-12"} mb-2`}>
      <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
        <span className="me-1 mt-1">
          <FormattedMessage id={id} />
        </span>
      </label>
      <Field
        name={name}
        placeholder={intl.formatMessage({ id: placeholder })}
        className="w-100 outline-0 border p-2 border-radius-5"
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export const RealtySelect = ({
  className,
  loading,
  name,
  id,
  options,
  placeholder,
  ...rest
}) => {
  const intl = useIntl();
  return (
    <div className={`${className || "col-lg-4"} mb-2`}>
      <label
        className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center"
        name={name}
      >
        <span className="me-1 mt-1">
          <FormattedMessage id={id} />
        </span>
      </label>
      {loading ? (
        <Loading />
      ) : (
        <Field
          name={name}
          component={CustomSelect}
          options={options}
          placeholder={intl.formatMessage({ id: placeholder || id })}
          {...rest}
        />
      )}
    </div>
  );
};

export const FieldNumber = ({
  formik,
  id,
  placeholder,
  min,
  max,
  name,
  fixed,
  ...rest
}) => {
  const intl = useIntl();
  return (
    <div className="col-lg-4 mb-2">
      <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
        <span className="me-1 mt-1">
          <FormattedMessage id={id} />
        </span>
      </label>
      <div className="d-flex align-items-center justify-content-between border p-2 border-radius-5">
        <Field
          name={name}
          type="text"
          inputMode="numeric"
          placeholder={intl.formatMessage({ id: placeholder || id })}
          className="w-100 outline-0 border-0"
          // onChange={(e) => {
          //   if (
          //     !(e.target.value === "" || /^[0-9,\b]+$/.test(e.target.value))
          //   ) {
          //     return;
          //   } else
          //   formik.setFieldValue(
          //     name,
          //     Number(e.target.value.split(",").join("")).toLocaleString()
          //   );
          // }}
          {...rest}
        />
        <span className="text-muted">{fixed}</span>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export const RealtySwitch = ({ id, name, placeholder }) => {
  return (
    <div className="col-lg-4 mb-2">
      <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
        <span className="me-1 mt-1">
          <FormattedMessage id={id} />
        </span>
      </label>
      <div className="border w-100 p-2 border-radius-5 d-flex align-items-center justify-content-between">
        <label htmlFor={name} className="text-muted cursor-pointer">
          <FormattedMessage id={placeholder || id} />
        </label>
        <div className="form-check form-switch">
          <Field
            className="form-check-input cursor-pointer"
            type="checkbox"
            role="switch"
            name={name}
            id={name}
          />
        </div>
      </div>
    </div>
  );
};

export const RealtyBuildingYear = ({ formik, fromUpdate, name, id }) => {
  const [year, setYear] = useState(
    fromUpdate && !!formik.values[name] ? new Date(formik.values[name]) : null
  );
  const intl = useIntl();
  return (
    <div className="col-lg-4 mb-2">
      <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
        <span className="me-1 mt-1">
          <FormattedMessage id={id} />
        </span>
      </label>
      <ReactDatePicker
        selected={year}
        onChange={(date) => {
          setYear(date);
          formik.setFieldValue(name, date);
        }}
        showYearPicker
        dateFormat="yyyy"
        placeholderText={intl.formatMessage({ id })}
        className="outline-0 border w-100 p-2 border-radius-5"
      />
    </div>
  );
};

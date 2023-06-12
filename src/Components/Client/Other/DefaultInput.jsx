import { ErrorMessage, Field } from "formik";
import { useIntl } from "react-intl";
import { TextError } from "../../Shared/ErrorPage";

function DefaultInput({ type, placeholder, name, isTextArea, ...rest }) {
  const intl = useIntl();
  return (
    <>
      <Field
        type={type}
        className="border outline-0 p-2 w-100 border-radius-5 mb-1"
        placeholder={intl.formatMessage({ id: placeholder })}
        name={name}
        as={isTextArea ? "textarea" : "input"}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default DefaultInput;

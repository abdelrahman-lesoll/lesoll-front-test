import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { ErrorMessage } from "formik";
import { TextError } from "../../Shared/ErrorPage";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export const styles = (name, locale) => {
  return {
    control: (styles) => {
      return {
        ...styles,
        boxShadow: "none",
        borderColor: "#dee2e6 !important",
        cursor: "pointer",
        padding: "0.2rem 0 !important",
        ...(name === "code" && {
          ...(locale === "en-US"
            ? {
                borderTopRightRadius: "0 !important",
                borderBottomRightRadius: "0 !important",
              }
            : {
                borderTopLeftRadius: "0 !important",
                borderBottomLeftRadius: "0 !important",
              }),
        }),
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        marginTop: "5px !important",
      };
    },
    option: (styles, state) => {
      return {
        ...styles,
        backgroundColor: state.isFocused ? "#1b6e6d" : "transparent",
        color: state.isFocused ? "#fff" : "#000",
        "&:hover": {
          backgroundColor: "#1b6e6d",
          color: "#fff",
          cursor: "pointer",
        },
      };
    },
  };
};

const CustomSelect = ({
  options,
  field,
  form,
  placeholder,
  isMulti = false,
  ...rest
}) => {
  const { locale } = useContext(LangContext);

  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? option !== null && option.map((item) => item.value)
        : option && option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option) => field.value && field.value.indexOf(option.value) >= 0
          )
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };
  return (
    <>
      <Select
        options={options}
        name={field.name}
        styles={styles(field.name, locale)}
        placeholder={placeholder}
        value={field.name ? getValue() : 0}
        onChange={onChange}
        isMulti={isMulti}
        components={makeAnimated()}
        noOptionsMessage={() => <FormattedMessage id="NoOptions" />}
        {...rest}
      />
      <ErrorMessage name={field.name} component={TextError} />
    </>
  );
};

export default CustomSelect;

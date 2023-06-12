import { Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { useIntl } from "react-intl";
import { LangContext } from "../../../Languages/LanguageProvider";
import { TextError } from "../../Shared/ErrorPage";
import { useCountry } from "../../Hooks/useCountry";
import CustomSelect from "./CustomSelect";
import Image from "../../Shared/Image";

const Phone = ({ formik }) => {
  const { locale } = useContext(LangContext);
  const { formatMessage } = useIntl();
  const { state } = useCountry("user-countries");
  const options = state.allCountries.map((country) => {
    return {
      value: country.code,
      label: (
        <div className="d-flex align-items-center justify-content-between">
          <span className="mt-1 font-14">{country.code}</span>{" "}
          <Image
            imageUrl={country.image}
            className="mw-100"
            height="18"
            width="18"
            alt=""
          />{" "}
        </div>
      ),
    };
  });

  return (
    <>
      <div className="input-group mb-3">
        <Field
          name="code"
          component={CustomSelect}
          disabled={state.loading}
          options={options}
        />
        <Field
          type="number"
          name="phone"
          placeholder={formatMessage({ id: "Phone" })}
          className={`form-control shadow-none border border-${
            locale === "en-US" ? "start" : "end"
          }-0`}
          aria-label="Text input with dropdown button"
          style={{
            ...(locale === "en-US"
              ? {
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }
              : {
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }),
            padding: "0.55rem",
          }}
          inputMode="numeric"
          onChange={(e) => {
            if (
              e.target.value.charCodeAt(e.target.value.length - 1) < 48 ||
              e.target.value.charCodeAt(e.target.value.length - 1) > 57
            ) {
              alert(formatMessage({ id: "ChangeKeyBoard" }));
            } else {
              formik.setFieldValue("phone", e.target.value);
            }
          }}
        />
      </div>
      <ErrorMessage name="phone" component={TextError} />
    </>
  );
};

export default Phone;

import { useContext } from "react";
import { LangContext } from "../../Languages/LanguageProvider";
import { useFindServices } from "../Hooks/useService";
import { Field } from "formik";
import { FormattedMessage } from "react-intl";

const Services = () => {
  const { locale } = useContext(LangContext);
  const { state } = useFindServices("all-services");
  return (
    <div className="col-12 mb-2">
      <div className="border-bottom mb-2">
        <h2>
          <FormattedMessage id="OtherFeatures" />
        </h2>
      </div>
      <div className="row">
        {state.services.map((service) => (
          <div className="col-lg-4 mb-1" key={service._id}>
            <div className="d-flex align-items-center mb-2">
              <Field
                className="form-check-input"
                type="checkbox"
                name="service"
                value={service._id}
                id={service._id}
              />
              <label
                className="form-check-label cursor-pointer text-dark-grey mx-2 mt-1"
                htmlFor={service._id}
              >
                {locale === "en-US" ? service.name.en : service.name.ar}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

import { Field, Form, ErrorMessage } from "formik";
import { useMemo, useContext } from "react";
import { findAllGovernrates } from "../../../Constants/RegionFormik";
import { LangContext } from "../../../Languages/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { useFindGovernrates } from "../../Hooks/useGovernrate";
import { TextError } from "../../Shared/ErrorPage";
import { HLoading } from "../../Shared/Loading";
import CustomSelect from "../../Client/Other/CustomSelect";

const FormikChildren = () => {
  const navigate = useNavigate();
  const { state } = useFindGovernrates("all-governrates");
  const governrates = useMemo(() => state.governrates, [state]);
  const options = findAllGovernrates(governrates, useContext(LangContext));
  return (
    <Form>
      {state.loading ? (
        <HLoading />
      ) : (
        <div className="row my-2">
          <div className="col-lg-6">
            <div className="mb-2">
              <label>Title in English</label>
              <Field
                type="text"
                className="p-2 outline-0 border border-radius-5 w-100"
                placeholder="Title in English "
                name="title.en"
              />
              <ErrorMessage name="title.en" component={TextError} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-2">
              <label>Title in Arabic</label>
              <Field
                type="text"
                className="p-2 outline-0 border border-radius-5 w-100"
                placeholder="Title in Arabic "
                name="title.ar"
              />
              <ErrorMessage name="title.ar" component={TextError} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-2">
              <label>Google Title in English</label>
              <Field
                type="text"
                className="p-2 outline-0 border border-radius-5 w-100"
                placeholder="Google Title in English "
                name="googleTitle.en"
              />
              <ErrorMessage name="googleTitle.en" component={TextError} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-2">
              <label>Google Title in Arabic</label>
              <Field
                type="text"
                className="p-2 outline-0 border border-radius-5 w-100"
                placeholder="Google Title in Arabic "
                name="googleTitle.ar"
              />
              <ErrorMessage name="googleTitle.ar" component={TextError} />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label htmlFor="">Governrate </label>
              <Field
                name="governrate"
                component={CustomSelect}
                options={options || []}
                placeholder="Choose Governrate"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-end">
              <button
                className="btn btn-secondary mx-2"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button className="btn btn-success" type="submit">
                Update Region
              </button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default FormikChildren;

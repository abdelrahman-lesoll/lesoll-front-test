import { Formik } from "formik";
import { useState } from "react";
import {
  initialValues,
  validationSchema,
} from "../../../Constants/CountryFormik";
import { useCountry } from "../../Hooks/useCountry";
import FormikChildren from "./FormikChildren";

const AddCountry = () => {
  const [added, setAdded] = useState(false);
  const { handleAddCountry } = useCountry();
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Add Country </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => {
            handleAddCountry(values);
            resetForm();
            setAdded(false);
          }}
        >
          {(formik) => <FormikChildren {...{ formik, added, setAdded }} />}
        </Formik>
      </div>
    </div>
  );
};

export default AddCountry;

import { Formik } from "formik";
import { useState } from "react";
import { useFindFaqs } from "../../Hooks/useFaq";
import { initialValues, validationSchema } from "../../../Constants/FAQ_Formik";
import FormikChildren from "./FormikChildren";

const AddFAQ = () => {
  const { handleAddFaq } = useFindFaqs();
  const [added, setAdded] = useState(false);
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Add New FAQ</h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => {
            handleAddFaq(values);
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

export default AddFAQ;

import { Formik } from "formik";
import { addTerm } from "../../../Api/Terms";
import { initialValues } from "../../../Constants/TermFormik";
import { validationSchema } from "../../../Constants/TermFormik";
import FormikChildren from "./FormikChildren";

const AddTerm = () => {
  const { mutateAsync } = addTerm();
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Add New Term</h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, onSubmitProps) => {
            mutateAsync(values);
            onSubmitProps.resetForm();
          }}
        >
          <FormikChildren />
        </Formik>
      </div>
    </div>
  );
};

export default AddTerm;

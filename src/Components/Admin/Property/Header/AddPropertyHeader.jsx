import { Formik } from "formik";
import { addPropertyHeaader } from "../../../../Api/Property";
import {
  initialValues,
  validationSchema,
} from "../../../../Constants/PropertyFormik";
import FormikChildren from "./FormikChildren";

const AddPropertyHeader = () => {
  const { mutateAsync } = addPropertyHeaader();
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Add New Prpoerty Header </h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => {
            mutateAsync(values);
            resetForm();
          }}
        >
          <FormikChildren />
        </Formik>
      </div>
    </div>
  );
};

export default AddPropertyHeader;

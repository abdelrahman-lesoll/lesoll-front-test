import { Formik } from "formik";
import { useFindServices } from "../../Hooks/useService";
import { initialValues } from "../../../Constants/ServiceFormik";
import { validationSchema } from "../../../Constants/ServiceFormik";
import FormikChildren from "./FormikChildren";

const AddService = () => {
  const { handleAddService } = useFindServices();
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Add New Service</h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, onSubmitProps) => {
            handleAddService(values);
            onSubmitProps.resetForm();
          }}
        >
          <FormikChildren />
        </Formik>
      </div>
    </div>
  );
};

export default AddService;

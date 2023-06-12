import { Formik } from "formik";
import { findAllPropHeaders, addProperty } from "../../../Api/Property";
import { propertySchema } from "../../../Constants/PropertyFormik";
import { propertyValues } from "../../../Constants/PropertyFormik";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const AddProperty = () => {
  const { data, isLoading } = findAllPropHeaders();
  const { mutateAsync } = addProperty();
  if (isLoading) {
    return <HLoading />;
  } else {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Add New Property </h4>
          </div>
          <Formik
            initialValues={propertyValues}
            validationSchema={propertySchema}
            validateOnBlur={false}
            onSubmit={(values, { resetForm }) => {
              mutateAsync(values);
              resetForm();
            }}
          >
            <FormikChildren propHeaders={data} />
          </Formik>
        </div>
      </div>
    );
  }
};

export default AddProperty;

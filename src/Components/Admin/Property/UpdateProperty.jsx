import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { findAllPropHeaders } from "../../../Api/Property";
import { findPropertyById, updateProperty } from "../../../Api/Property";
import { propertySchema } from "../../../Constants/PropertyFormik";
import { propertyValues } from "../../../Constants/PropertyFormik";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateProperty = () => {
  const { id } = useParams();
  const { mutateAsync } = updateProperty(id);
  const { data, isLoading } = findAllPropHeaders();
  const { data: propertyData, isLoading: propertyLoading } =
    findPropertyById(id);
  if (isLoading || propertyLoading) {
    return <HLoading />;
  } else {
    const property = propertyData?.data.data.property.find(
      (property) => property._id === id
    );
    const oldData = {
      title: property.title,
      header: propertyData?.data.data._id,
      propType: property.propType,
    };
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Existing Property </h4>
          </div>
          <Formik
            initialValues={oldData || propertyValues}
            validationSchema={propertySchema}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={(values) => {
              mutateAsync(values);
            }}
          >
            <FormikChildren fromUpdate={true} propHeaders={data} />
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdateProperty;

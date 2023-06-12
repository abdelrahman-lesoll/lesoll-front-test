import { Formik } from "formik";
import { useParams } from "react-router-dom";
import {
  findPropertyHeaderById,
  updatePropertyHeaader,
} from "../../../../Api/Property";
import {
  initialValues,
  validationSchema,
} from "../../../../Constants/PropertyFormik";
import { HLoading } from "../../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdatePropertyHeader = () => {
  const { id } = useParams();
  const { isLoading, data } = findPropertyHeaderById(id);
  const { mutateAsync } = updatePropertyHeaader(id);
  if (isLoading) {
    return <HLoading />;
  } else {
    const oldData = {
      title: data?.data.data.title,
    };
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Property Header </h4>
          </div>
          <Formik
            initialValues={oldData || initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={(values) => mutateAsync(values)}
          >
            <FormikChildren fromUpdate={true} />
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdatePropertyHeader;

import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { findTermById, updateTerm } from "../../../Api/Terms";
import { initialValues, oldTermData } from "../../../Constants/TermFormik";
import { validationSchema } from "../../../Constants/TermFormik";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateTerm = () => {
  const { id } = useParams();
  const { data, isLoading } = findTermById(id);
  const { mutateAsync } = updateTerm(id);
  if (isLoading) {
    <HLoading />;
  } else {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Term</h4>
          </div>
          <Formik
            initialValues={oldTermData(data) || initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={(values) => mutateAsync(values)}
          >
            <FormikChildren fromUpdate={true} />
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdateTerm;

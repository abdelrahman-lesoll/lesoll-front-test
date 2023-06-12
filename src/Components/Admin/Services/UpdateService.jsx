import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useFindServices } from "../../Hooks/useService";
import { initialValues, oldService } from "../../../Constants/ServiceFormik";
import { validationSchema } from "../../../Constants/ServiceFormik";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateService = () => {
  const { id } = useParams();
  const { state, handleUpdateService } = useFindServices("single-service", id);
  if (state.loading) {
    <HLoading />;
  } else {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Service</h4>
          </div>
          <Formik
            initialValues={oldService(state.singleService) || initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={(values) => {
              values.id = id;
              handleUpdateService(values);
            }}
          >
            <FormikChildren fromUpdate={true} />
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdateService;

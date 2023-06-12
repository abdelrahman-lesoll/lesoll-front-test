import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useFindRegions } from "../../Hooks/useRegion";
import { initialValues, regionOldData } from "../../../Constants/RegionFormik";
import { validationSchema } from "../../../Constants/RegionFormik";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateRegion = () => {
  const { id } = useParams();
  const { state, handleUpdateRegion } = useFindRegions("spec-region", id);
  if (state.loading) {
    <HLoading />;
  } else if (!!state.region) {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Region</h4>
          </div>
          <Formik
            initialValues={regionOldData(state.region) || initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={(values) => {
              values.id = id;
              handleUpdateRegion(values);
            }}
          >
            <FormikChildren />
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdateRegion;

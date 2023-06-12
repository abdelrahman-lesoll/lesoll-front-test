import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  initialValues,
  oldGovernrateData,
  validationSchema,
} from "../../../Constants/GovernrateFormik";
import { useFindGovernrates } from "../../Hooks/useGovernrate";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateGovernrate = () => {
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { state, handleUpdateGovernrate } = useFindGovernrates(
    "single-governrate",
    id
  );
  if (state.loading) {
    return <HLoading />;
  } else {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Governrate </h4>
          </div>
          <Formik
            initialValues={
              oldGovernrateData(state.singleGovernrate) || initialValues
            }
            validationSchema={validationSchema}
            enableReinitialize
            validateOnBlur={false}
            onSubmit={(values) => {
              values.id = id;
              handleUpdateGovernrate(values);
            }}
          >
            {(formik) => (
              <FormikChildren
                {...{ formik, added, setAdded, fromUpdate: true }}
              />
            )}
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdateGovernrate;

import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFindFaqs } from "../../Hooks/useFaq";
import {
  initialValues,
  oldFaq,
  validationSchema,
} from "../../../Constants/FAQ_Formik";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateFAQ = () => {
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { state, handleUpdateFaq } = useFindFaqs("single-faq", id);
  if (state.loading) {
    return <HLoading />;
  } else {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Existing FAQ</h4>
          </div>
          <Formik
            initialValues={oldFaq(state.singleFAQ) || initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => {
              values.id = id;
              handleUpdateFaq(values);
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

export default UpdateFAQ;

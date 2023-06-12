import { useNavigate } from "react-router-dom";
import { Field, Form, ErrorMessage } from "formik";
import { TextError } from "../../Shared/ErrorPage";

const FormikChildren = ({ fromUpdate }) => {
  const navigate = useNavigate();
  return (
    <Form>
      <div className="row my-2">
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Title in English</label>
            <Field
              as="textarea"
              rows="5"
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Title in English "
              name="title.en"
            />
            <ErrorMessage name="title.en" component={TextError} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Title in Arabic</label>
            <Field
              as="textarea"
              rows="5"
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Title in Arabic "
              name="title.ar"
            />
            <ErrorMessage name="title.ar" component={TextError} />
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-end">
            <button
              className="btn btn-secondary mx-2"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button className="btn btn-success" type="submit">
              {fromUpdate ? "Update " : "Add "} Term
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormikChildren;

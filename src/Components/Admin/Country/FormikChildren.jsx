import { Field, Form, ErrorMessage } from "formik";
import { FcCheckmark } from "react-icons/fc";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { TextError } from "../../Shared/ErrorPage";

const FormikChildren = ({ formik, fromUpdate, added, setAdded }) => {
  const navigate = useNavigate();
  return (
    <Form>
      <div className="row my-2">
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Title in English</label>
            <Field
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
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Title in Arabic "
              name="title.ar"
            />
            <ErrorMessage name="title.ar" component={TextError} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label htmlFor="">Image</label>
            <input
              type="file"
              name="image"
              className="d-none"
              id="governrate-img"
              onChange={(e) => {
                formik.setFieldValue("image", e.target.files[0]);
                setAdded(true);
              }}
            />
            <label
              htmlFor="governrate-img"
              className="text-muted text-center border border-radius-5 p-2 w-100 cursor-pointer d-flex align-items-center justify-content-center"
            >
              {!added ? (
                <>
                  <IoMdAddCircleOutline />
                  <span className="mx-1">
                    <FormattedMessage id="UploadImage" />
                  </span>
                </>
              ) : (
                <>
                  <FcCheckmark size={"1.2rem"} />
                  <span className="mx-1">
                    <FormattedMessage id="UploadedImage" />
                  </span>
                </>
              )}
            </label>
            <ErrorMessage name="image" component={TextError} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Code</label>
            <Field
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Code "
              name="code"
            />
            <ErrorMessage name="code" component={TextError} />
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
              {fromUpdate ? "Update " : "Add "} Country
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormikChildren;

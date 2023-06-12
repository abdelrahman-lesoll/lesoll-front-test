import { useState } from "react";
import { ErrorMessage, Field, Form } from "formik";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { FcCheckmark } from "react-icons/fc";
import { TextError } from "../../Shared/ErrorPage";
import { useNavigate } from "react-router-dom";
import JoditComponent from "./JoditComponent";

const FormikChildren = ({ formik, fromUpdate }) => {
  const [added, setAdded] = useState(false);
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
            <label>Meta Description in English</label>
            <Field
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Meta Description in English "
              name="metaDescription.en"
            />
            <ErrorMessage name="metaDescription.en" component={TextError} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Meta Description in Arabic</label>
            <Field
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Meta Description in Arabic "
              name="metaDescription.ar"
            />
            <ErrorMessage name="metaDescription.ar" component={TextError} />
          </div>
        </div>
        <div className="col-12">
          <div className="mb-2">
            <label htmlFor="">Image</label>
            <input
              type="file"
              name="image"
              className="d-none"
              id="region-img"
              onChange={(e) => {
                formik.setFieldValue("image", e.target.files[0]);
                setAdded(true);
              }}
            />
            <label
              htmlFor="region-img"
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
        <div className="col-12">
          <div className="mb-2">
            <label>Description in English</label>
            <Field name="description.en" lang="en" component={JoditComponent} />
          </div>
          <ErrorMessage name="description.en" component={TextError} />
        </div>
        <div className="col-12">
          <div className="mb-2">
            <label>Description in Arabic</label>
            <Field name="description.ar" lang="ar" component={JoditComponent} />
          </div>
          <ErrorMessage name="description.ar" component={TextError} />
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
              {fromUpdate ? "Update " : "Add "} Blog
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormikChildren;

import { ErrorMessage, Field, Form } from "formik";
import { TextError } from "../../Shared/ErrorPage";
import { PropertyTypes } from "../../../Constants/PropertyFormik";
import CustomSelect from "../../Client/Other/CustomSelect";

const FormikChildren = ({ fromUpdate, propHeaders }) => {
  const data = propHeaders?.data.data.map((header) => {
    return {
      label: header.title.en,
      value: header._id,
    };
  });
  return (
    <Form>
      <div className="row">
        <div className="col-lg-6 my-2">
          <label>Title in English</label>
          <div className="w-100 border border-radius-5">
            <Field
              name="title.en"
              className="p-2 outline-0 border-0 w-100"
              placeholder="Title in English"
            />
          </div>
          <ErrorMessage name="title.en" component={TextError} />
        </div>
        <div className="col-lg-6 my-2">
          <label>Title in Arabic</label>
          <div className="w-100 border border-radius-5">
            <Field
              name="title.ar"
              className="p-2 outline-0 border-0 w-100"
              placeholder="Title in Arabic"
            />
          </div>
          <ErrorMessage name="title.ar" component={TextError} />
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Property Header</label>
            <Field
              name="header"
              component={CustomSelect}
              options={data}
              placeholder="Property Header"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Property Type</label>
            <Field
              name="propType"
              component={CustomSelect}
              options={PropertyTypes}
              placeholder="Property Type"
            />
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-success w-100" type="submit">
            {fromUpdate ? "Update " : "Add "} Property
          </button>
        </div>
      </div>
    </Form>
  );
};

export default FormikChildren;

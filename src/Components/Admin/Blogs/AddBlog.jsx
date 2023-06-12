import { Formik } from "formik";
import { initialValues, validationSchema } from "../../../Constants/BlogFormik";
import { useBlogs } from "../../Hooks/useBlog";
import FormikChildren from "./FormikChildren";

const AddBlog = () => {
  const { handleAddBlog } = useBlogs();
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Add Blog</h4>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values) => handleAddBlog(values)}
        >
          {(formik) => <FormikChildren {...{ formik }} />}
        </Formik>
      </div>
    </div>
  );
};

export default AddBlog;

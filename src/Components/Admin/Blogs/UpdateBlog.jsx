import { Formik } from "formik";
import { useParams } from "react-router-dom";
import {
  initialValues,
  validationSchema,
  oldBlog,
} from "../../../Constants/BlogFormik";
import { useBlogs } from "../../Hooks/useBlog";
import { HLoading } from "../../Shared/Loading";
import FormikChildren from "./FormikChildren";

const UpdateBlog = () => {
  const { id } = useParams();
  const { state, handleUpdateBlog } = useBlogs("single-blog", id);
  if (state.loading) {
    return <HLoading />;
  } else {
    return (
      <div className="p-5">
        <div className="shadow p-4 border-radius-5">
          <div className="border-bottom pb-2">
            <h4 className="mb-1">Update Blog</h4>
          </div>
          <Formik
            initialValues={oldBlog(state.singleBlog) || initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            validateOnBlur={false}
            onSubmit={(values) => handleUpdateBlog({ ...values, slug: id })}
          >
            {(formik) => <FormikChildren {...{ formik, fromUpdate: true }} />}
          </Formik>
        </div>
      </div>
    );
  }
};

export default UpdateBlog;

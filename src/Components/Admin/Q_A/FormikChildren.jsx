import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Field, FieldArray, Form, ErrorMessage } from "formik";
import { IoMdAddCircleOutline } from "react-icons/io";
import { relatedOptions } from "../../../Constants/FAQ_Formik";
import { TextError } from "../../Shared/ErrorPage";
import { FcCheckmark } from "react-icons/fc";
import CustomSelect from "../../Client/Other/CustomSelect";

const FormikChildren = ({ formik, fromUpdate, added, setAdded }) => {
  const navigate = useNavigate();

  return (
    <Form>
      <div className="row my-2">
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Question in English </label>
            <Field
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Title in English "
              name="question.en"
            />
            <ErrorMessage name="question.en" component={TextError} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-2">
            <label>Question in Arabic</label>
            <Field
              className="p-2 outline-0 border border-radius-5 w-100"
              placeholder="Title in Arabic "
              name="question.ar"
            />
            <ErrorMessage name="question.ar" component={TextError} />
          </div>
        </div>
        <div className="col-12">
          <div className="mb-2">
            <label>Related To Whom ?</label>
            <Field
              name="related"
              component={CustomSelect}
              options={relatedOptions}
              placeholder="Related to Whom ?"
              onChange={({ value }) => formik.setFieldValue("related", value)}
            />
          </div>
        </div>
        <FieldArray name="answers">
          {({
            form: {
              values: { answers },
            },
            push,
            remove,
          }) => {
            return answers?.map((_, index) => {
              return (
                <Fragment key={index}>
                  <div className="col-12">
                    <div className="mb-2">
                      <label>Answer in English </label>
                      <Field
                        type="text"
                        className="p-2 outline-0 border border-radius-5 w-100"
                        placeholder="Answer in English "
                        name={`answers[${index}].en`}
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name={`answers[${index}].en`}
                    component={TextError}
                  />
                  <div className="col-12">
                    <div className="mb-2">
                      <label>Answer in Arabic</label>
                      <Field
                        type="text"
                        className="p-2 outline-0 border border-radius-5 w-100"
                        placeholder="Answer in Arabic "
                        name={`answers[${index}].ar`}
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name={`answers[${index}].ar`}
                    component={TextError}
                  />
                  <div className="col-12">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => remove(index)}
                        disabled={answers.length === 1}
                      >
                        Remove This Step{" "}
                      </button>
                      <button
                        className="btn btn-primary mx-2"
                        type="button"
                        onClick={() => push({ en: "", ar: "" })}
                      >
                        Add New Step{" "}
                      </button>
                    </div>
                  </div>
                </Fragment>
              );
            });
          }}
        </FieldArray>

        <div className="col-12">
          <div className="mb-2">
            <label htmlFor="">Video</label>
            <input
              type="file"
              name="image"
              className="d-none"
              id="question-video"
              accept="video/*"
              multiple="multiple"
              onChange={(e) => {
                formik.setFieldValue("video", e.target.files[0]);
                setAdded(true);
              }}
            />
            <label
              htmlFor="question-video"
              className="text-muted text-center border border-radius-5 p-2 w-100 cursor-pointer d-flex align-items-center justify-content-center"
            >
              {!added ? (
                <>
                  <IoMdAddCircleOutline />
                  <span className="mx-1">Upload Video</span>
                </>
              ) : (
                <>
                  <FcCheckmark size={"1.2rem"} />
                  <span className="mx-1">Video has been Uploaded</span>
                </>
              )}
            </label>
            <ErrorMessage name="video" component={TextError} />
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
              {!fromUpdate ? ` Add` : " Update"} FAQ
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormikChildren;

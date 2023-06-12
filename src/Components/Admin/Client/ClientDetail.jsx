import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextError } from "../../Shared/ErrorPage";
import { useParams, useNavigate } from "react-router-dom";
import { findUserById, update } from "../../../Api/User";
import { FullLoading } from "../../Shared/Loading";
import { initialValues, userStatus } from "../../../Constants/UserProfile";
import { validationSchema } from "../../../Constants/UserProfile";
import CustomSelect from "../../Client/Other/CustomSelect";

const ClientDetail = () => {
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { data, isLoading } = findUserById(id);
  const { mutateAsync } = update(id);
  const navigate = useNavigate();
  if (isLoading) {
    return <FullLoading />;
  } else {
    const oldData = {
      image: data?.data.data.image,
      oldImage: data?.data.data.image,
      fullname: data?.data.data.fullname,
      email: data?.data.data.email,
      phone: data?.data.data.phone,
      status: data?.data.data.status,
      numRealty: data?.data.data.numRealty,
      isOnline: data?.data.data.isOnline ? "Online" : "Offline",
    };
    return (
      <div className="p-5 client-detail">
        <h4 className="mb-1">Client Detail</h4>
        <span className="text-dark-grey">Welcome to Client Detail</span>
        <Formik
          {...{ validationSchema }}
          initialValues={oldData || initialValues}
          enableReinitialize
          onSubmit={(values) => mutateAsync(values)}
        >
          {(formik) => (
            <Form className="shadow py-4 px-3">
              <div className="row my-2">
                <div className="col-lg-4">
                  <div className="mb-2">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      className="d-none"
                      id="user-img"
                      onChange={(e) => {
                        formik.setFieldValue("image", e.target.files[0]);
                        setAdded(true);
                      }}
                    />
                    <label
                      htmlFor="user-img"
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
                  </div>
                </div>
                <UserInput name="fullname" label="Full Name" />
                <UserInput name="email" label="Email" />
                <UserInput name="phone" label="Phone" />
                <UserInput
                  name="numRealty"
                  label="Number Of Realty"
                  readOnly={true}
                />
                <div className="col-lg-4">
                  <div className="mb-2">
                    <label>Status</label>
                    <Field
                      name="status"
                      component={CustomSelect}
                      options={userStatus}
                      placeholder="Status"
                    />
                  </div>
                </div>
                <UserInput
                  name="isOnline"
                  label="Online Status"
                  readOnly={true}
                />
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-end">
                    <button
                      onClick={() => navigate(-1)}
                      className="btn btn-secondary mx-2"
                      type="button"
                    >
                      Back
                    </button>
                    <button className="btn btn-success" type="submit">
                      Update User
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

const UserInput = ({ label, name, ...rest }) => {
  return (
    <div className="col-lg-4">
      <div className="mb-2">
        <label>{label}</label>
        <Field
          type="text"
          name={name}
          className="p-2 outline-0 border border-radius-5 w-100"
          placeholder={label}
          {...rest}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
};

export default ClientDetail;

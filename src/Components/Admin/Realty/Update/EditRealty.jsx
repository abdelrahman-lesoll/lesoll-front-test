import { useState } from "react";
import { useParams } from "react-router-dom";
import { HLoading } from "../../../Shared/Loading";
import { Title } from "../../../Shared/Realty";
import { FormattedMessage } from "react-intl";
import { Form, Formik } from "formik";
import { initialValues } from "../../../../Constants/NewPropertyFormik";
import { validationSchema } from "../../../../Constants/NewPropertyFormik";
import { realtyOldData } from "../../../../Constants/NewPropertyFormik";
import { useRealty } from "../../../Hooks/useRealty";
import Services from "../../../Shared/Services";
import Offer from "./Offer";
import Money from "./Money";
import Building from "./Building";
import Location from "./../../../Shared/Location";
import Extra from "../../../Shared/Extra";
import Gallery from "./Gallery";

const EditRealty = () => {
  const [confirmed, setConfirmed] = useState(false);
  const { id } = useParams();
  const { state, handleChangeStatus, handleUpdateRealty } = useRealty(
    "realty-id",
    id
  );
  if (state.loading) {
    return <HLoading />;
  } else if (!!state.singleRealty) {
    return (
      <div className="p-5">
        <h4 className="mb-1">Realty Detail</h4>
        <div className="shadow-sm p-3 border border-radius-5">
          <Formik
            initialValues={realtyOldData(state.singleRealty) || initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, onSubmitProps) => {
              if (values.propType !== values.oldPropType) {
                if (values.propType === "Land") {
                  values.unitType = "";
                  values.id = id;
                  handleUpdateRealty(values);
                } else {
                  if (values.unitType === values.oldUnitType) {
                    onSubmitProps.setFieldError(
                      "unitType",
                      <FormattedMessage id="ThisFieldMustBeChanged" />
                    );
                    onSubmitProps.setSubmitting(false);
                  } else {
                    values.id = id;
                    handleUpdateRealty(values);
                  }
                }
              } else if (
                values.imgs.length +
                  (values.oldImgs.length - values.delImgs.length) <
                3
              ) {
                onSubmitProps.setFieldError(
                  "imgs",
                  <FormattedMessage id="FillAtLeastThreeImages" />
                );
                onSubmitProps.setSubmitting(false);
              } else if (
                values.imgs.length +
                  (values.oldImgs.length - values.delImgs.length) >
                15
              ) {
                onSubmitProps.setFieldError(
                  "imgs",
                  <FormattedMessage id="FillAtMost15Images" />
                );
                onSubmitProps.setSubmitting(false);
              } else {
                values.id = id;
                handleUpdateRealty(values);
              }
            }}
          >
            {(formik) => (
              <Form>
                <div className="row mt-3">
                  <Title
                    id="PropertyTitle"
                    className="col-lg-8"
                    name="title"
                    placeholder="TitlePlaceholder"
                    maxLength={70}
                  />
                  <div className="col-lg-4 mb-2">
                    <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
                      <span className="me-1 mt-1">
                        <FormattedMessage id="Phone" />
                      </span>
                    </label>
                    <input
                      readOnly
                      defaultValue={
                        state.singleRealty?.user.code +
                        state.singleRealty?.user.phone
                      }
                      className="w-100 outline-0 border p-2 border-radius-5"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
                      <span className="me-1 mt-1">
                        <FormattedMessage id="FullName" />
                      </span>
                    </label>
                    <input
                      readOnly
                      defaultValue={state.singleRealty?.user.fullname}
                      className="w-100 outline-0 border p-2 border-radius-5"
                    />
                  </div>
                  <Offer {...{ formik, fromUpdate: true }} />
                  <Money {...{ formik }} />
                  <Building {...{ formik }} />
                  <Location {...{ formik, fromUpdate: true }} />
                  <Gallery {...{ formik }} />
                  {state.singleRealty?.status === "Deleted" &&
                    state.singleRealty?.reason && (
                      <>
                        <div className="border-bottom my-2">
                          <h2>
                            <FormattedMessage id="Reason" />
                          </h2>
                        </div>
                        <textarea
                          rows="3"
                          className="outline-0 border"
                          readOnly
                          defaultValue={state.singleRealty?.reason}
                        ></textarea>
                      </>
                    )}
                  <Services />
                  <Extra {...{ formik, fromUpdate: true }} />
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        className={`btn btn-primary ${
                          (state.singleRealty?.status === "Confirmed" ||
                            confirmed) &&
                          "d-none"
                        }`}
                        type="button"
                        onClick={() => {
                          handleChangeStatus({
                            id,
                            status: "Confirmed",
                            user: state.singleRealty?.user._id,
                            governrate: state.singleRealty?.governrate._id,
                          });
                          setConfirmed(true);
                        }}
                      >
                        {" "}
                        Confirm Realty
                      </button>
                      <button className="btn btn-success mx-2" type="submit">
                        Update Realty
                      </button>
                      <button className="btn btn-secondary" type="button">
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
};

export default EditRealty;

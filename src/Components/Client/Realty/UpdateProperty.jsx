import { Formik } from "formik";
import { initialValues } from "../../../Constants/NewPropertyFormik";
import { validationSchema } from "../../../Constants/NewPropertyFormik";
import { realtyOldData } from "../../../Constants/NewPropertyFormik";
import { createContext } from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { FullLoading } from "../../Shared/Loading";
import { useRealty } from "../../Hooks/useRealty";
import BreadCrumb from "../../Shared/BreadCrumb";
import Shared from "./Shared";

export const FormikContext = createContext();

const UpdateProperty = ({ auth }) => {
  const { id } = useParams();
  const { formatMessage } = useIntl();
  const { state, handleUpdateRealty } = useRealty("realty-id", id);
  if (state.loading) {
    return <FullLoading />;
  } else if (!state.singleRealty) {
    return <></>;
  } else
    return (
      <>
        <Helmet>
          <title>{formatMessage({ id: "HelmetUpdateProperty" })}</title>
          <link rel="canonical" href={location.href} />
        </Helmet>
        <BreadCrumb title={<FormattedMessage id="UpdateProperty" />} />
        <div className="container-fluid p-5">
          <div className="border-bottom mb-2">
            <h2>
              <FormattedMessage id="PropertyDetails" />
            </h2>
          </div>
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
            {(formik) => <Shared {...{ formik, auth }} fromUpdate={true} />}
          </Formik>
        </div>
      </>
    );
};

export default UpdateProperty;

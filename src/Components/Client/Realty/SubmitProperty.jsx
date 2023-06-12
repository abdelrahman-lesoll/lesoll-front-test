import { initialValues } from "../../../Constants/NewPropertyFormik";
import { validationSchema } from "../../../Constants/NewPropertyFormik";
import { FormattedMessage, useIntl } from "react-intl";
import { useRealty } from "../../Hooks/useRealty";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { useAuth } from "../../../Utils/Auth";
import BreadCrumb from "../../Shared/BreadCrumb";
import Shared from "./Shared";

const SubmitProperty = () => {
  const { handleAddRealty } = useRealty();
  const auth = useAuth();
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetAddProperty" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="AddProperty" />} />
      <div className="container-fluid p-5">
        <div className="border-bottom mb-2">
          <h2>
            <FormattedMessage id="PropertyDetails" />
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={(values, onSubmitProps) => {
            if (values.imgs.length > 15) {
              onSubmitProps.setFieldError(
                "imgs",
                <FormattedMessage id="FillAtMost15Images" />
              );
              onSubmitProps.setSubmitting(false);
            } else if (!values.address.longitude) {
              onSubmitProps.setFieldError(
                "address.name",
                <FormattedMessage id="SpecifyLocationOnMap" />
              );
              onSubmitProps.setSubmitting(false);
            } else {
              handleAddRealty(values);
            }
          }}
        >
          {(formik) => <Shared {...{ formik, auth }} />}
        </Formik>
      </div>
    </>
  );
};

export default SubmitProperty;

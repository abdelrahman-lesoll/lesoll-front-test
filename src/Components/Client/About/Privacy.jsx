import { Helmet } from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";
import BreadCrumb from "../../Shared/BreadCrumb";

const Privacy = () => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetPrivacy" })}</title>
        <link rel="canonical" href={location.href} />
        <meta
          name="description"
          content={intl.formatMessage({ id: "HelmetPrivacyDescription" })}
        />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Privacy" />} />
      <div className="container-fluid my-5">
        <h1 className="title fw-bold">
          <FormattedMessage id="PrivacyTitle" />{" "}
        </h1>
        <p className="text-muted">
          <FormattedMessage id="Privacy1" />
        </p>
        <h3 className="fw-bold">
          <span className="border-bottom">
            <FormattedMessage id="Privacy2" />
          </span>{" "}
        </h3>
        <p className="text-muted mb-0">
          <FormattedMessage id="Privacy3" />
        </p>
        <ul>
          <li>
            <span className="fw-bold font-18">
              <FormattedMessage id="Privacy4" />
            </span>{" "}
            <span className="mx-1 text-muted">
              <FormattedMessage id="Privacy5" />
            </span>
          </li>

          <li>
            <span className="fw-bold font-18">
              <FormattedMessage id="Privacy6" />
            </span>{" "}
            <span className="mx-1 text-muted">
              <FormattedMessage id="Privacy7" />
            </span>
          </li>
          <li>
            <span className="fw-bold font-18">
              <FormattedMessage id="Privacy8" />
            </span>{" "}
            <span className="mx-1 text-muted">
              <FormattedMessage id="Privacy9" />
            </span>
          </li>
          <li>
            <span className="fw-bold font-18">
              <FormattedMessage id="Privacy10" />
            </span>{" "}
            <span className="mx-1 text-muted">
              <FormattedMessage id="Privacy11" />
            </span>
          </li>
          <li>
            <span className="fw-bold font-18">
              <FormattedMessage id="Privacy12" />
            </span>{" "}
            <span className="mx-1 text-muted">
              <FormattedMessage id="Privacy13" />
            </span>
          </li>
        </ul>
        <h3 className="fw-bold">
          <span className="border-bottom">
            <FormattedMessage id="Privacy14" />
          </span>{" "}
        </h3>
        <p className="text-muted">
          <FormattedMessage id="Privacy15" />
        </p>
        <h3 className="fw-bold">
          <span className="border-bottom">
            <FormattedMessage id="Privacy16" />
          </span>{" "}
        </h3>
        <div className="text-muted">
          <FormattedMessage id="Privacy17" />
          <ul>
            <li className="text-muted">
              <FormattedMessage id="Privacy18" />
            </li>
            <li className="text-muted">
              <FormattedMessage id="Privacy19" />
            </li>
            <li className="text-muted">
              <FormattedMessage id="Privacy20" />
            </li>
            <li className="text-muted">
              <FormattedMessage id="Privacy21" />
            </li>
          </ul>
        </div>
        <h3 className="fw-bold">
          <span className="border-bottom">
            <FormattedMessage id="Privacy22" />
          </span>{" "}
        </h3>
        <p className="text-muted">
          <FormattedMessage id="Privacy23" />
        </p>
        <h3 className="fw-bold">
          <span className="border-bottom">
            <FormattedMessage id="Privacy24" />
          </span>{" "}
        </h3>
        <p className="text-muted">
          <FormattedMessage id="Privacy25" />
        </p>
      </div>
    </>
  );
};

export default Privacy;

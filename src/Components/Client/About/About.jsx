import { Helmet } from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";
import BreadCrumb from "../../Shared/BreadCrumb";

const About = () => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetAboutUs" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="WhoWeAre" />} />
      <div className="container-fluid my-5">
        <div className="title text-center mb-5">
          <h1>
            <FormattedMessage id="AboutLesoll" />
          </h1>
          <p className="w-75 text-dark-grey m-auto lh-base text-justify">
            <FormattedMessage id="Stat1" />
          </p>
        </div>
        <div className="d-flex mb-4">
          <div className="img-container d-none d-xxl-block d-xl-block">
            <img
              src="/Img/About/1.png"
              className="mw-100"
              height={120}
              width={170}
              alt=""
            />
          </div>
          <div className="about-description mx-4 mt-4">
            <h3 className="title">
              <FormattedMessage id="Mission" />
            </h3>
            <p className="text-dark-grey font-14">
              <FormattedMessage id="MissionStat" />
            </p>
          </div>
        </div>
        <div className="d-flex">
          <div className="img-container d-none d-xxl-block d-xl-block">
            <img
              src="/Img/About/2.png"
              className="mw-100"
              height={120}
              width={170}
              alt=""
            />
          </div>
          <div className="about-description mx-4 mt-3">
            <h3 className="title">
              <FormattedMessage id="Vision" />
            </h3>
            <p className="text-dark-grey font-14">
              <FormattedMessage id="VisionStat" />
            </p>
          </div>
        </div>

        <div className="title text-center my-5">
          <h1>
            {" "}
            <span className="border-bottom">
              <FormattedMessage id="WhyLesoll" />
            </span>{" "}
          </h1>
        </div>

        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="p-2 h-100">
              <div className="img-container text-center">
                <img
                  src="/Img/About/3.png"
                  className="mw-100"
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <h5 className="text-center fw-semibold mt-2">
                <FormattedMessage id="Knowledgable" />
              </h5>
              <p className="py-1 text-muted text-center">
                <FormattedMessage id="KnowledgableStat" />
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="p-2 h-100">
              <div className="img-container text-center">
                <img
                  src="/Img/About/4.png"
                  className="mw-100"
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <h5 className="text-center fw-semibold mt-2">
                <FormattedMessage id="Facilitation" />
              </h5>
              <p className="py-1 text-muted text-center">
                <FormattedMessage id="FacilitationStat" />
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="p-2 h-100">
              <div className="img-container text-center">
                <img
                  src="/Img/About/5.png"
                  className="mw-100"
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <h5 className="text-center fw-semibold mt-2">
                <FormattedMessage id="Aspiration" />
              </h5>
              <p className="py-1 text-muted text-center">
                <FormattedMessage id="AspirationState" />
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="p-2 h-100">
              <div className="img-container text-center">
                <img
                  src="/Img/About/6.png"
                  className="mw-100"
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <h5 className="text-center fw-semibold mt-2">
                <FormattedMessage id="Perfection" />
              </h5>
              <p className="py-1 text-muted text-center">
                <FormattedMessage id="PerfectionState" />
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="p-2 h-100">
              <div className="img-container text-center">
                <img
                  src="/Img/About/7.png"
                  className="mw-100"
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <h5 className="text-center fw-semibold mt-2">
                <FormattedMessage id="Connection" />
              </h5>
              <p className="py-1 text-muted text-center">
                <FormattedMessage id="ConnectionState" />
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div className="p-2 h-100">
              <div className="img-container text-center">
                <img
                  src="/Img/About/8.png"
                  className="mw-100"
                  height={200}
                  width={200}
                  alt=""
                />
              </div>
              <h5 className="text-center fw-semibold mt-2">
                <FormattedMessage id="Loyalty" />
              </h5>
              <p className="py-1 text-muted text-center">
                <FormattedMessage id="LoyaltyState" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

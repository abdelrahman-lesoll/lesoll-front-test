import { FormattedMessage, useIntl } from "react-intl";
import { Tab, Tabs } from "react-bootstrap";
import { useFindFaqs } from "../../Hooks/useFaq";
import BreadCrumb from "../../Shared/BreadCrumb";
import Q_A_Info from "./Q_A_Info";
import { Helmet } from "react-helmet";

const Q_A = () => {
  const { state, handleFetchRelated } = useFindFaqs("all-faqs");
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetFaq" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Q_A_Detail" />} />
      <div className="container-fluid p-5 faq-questions">
        <Tabs
          id="controlled-tab-example"
          onSelect={(related) => handleFetchRelated(related)}
          // activeKey={related}
          className="mb-3"
        >
          <Tab eventKey="All" title={<FormattedMessage id="All" />}></Tab>
          <Tab
            eventKey="General"
            title={<FormattedMessage id="General" />}
          ></Tab>
          <Tab
            eventKey="Owner"
            title={<FormattedMessage id="Owner/Brooker" />}
          ></Tab>
          <Tab
            eventKey="Renter"
            title={<FormattedMessage id="Renter/Buyer" />}
          ></Tab>
        </Tabs>
        <div className="row btn-faq">
          <div className="mb-3 col-12">
            <button
              onClick={() => handleFetchRelated("All")}
              className="w-100 p-2 outline-0 border bg-white text-icon border-radius-5 custom-transition bg-icon-hover text-white-hover border-icon"
            >
              <FormattedMessage id="All" />
            </button>
          </div>
          <div className="mb-3 col-12">
            <button
              onClick={() => handleFetchRelated("General")}
              className="w-100 p-2 outline-0 border bg-white text-icon border-radius-5 custom-transition bg-icon-hover text-white-hover border-icon"
            >
              <FormattedMessage id="General" />
            </button>
          </div>
          <div className="mb-3 col-12">
            <button
              onClick={() => handleFetchRelated("Owner")}
              className="w-100 p-2 outline-0 border bg-white text-icon border-radius-5 custom-transition bg-icon-hover text-white-hover border-icon"
            >
              <FormattedMessage id="Owner/Brooker" />
            </button>
          </div>
          <div className="mb-3 col-12">
            <button
              onClick={() => handleFetchRelated("Renter")}
              className="w-100 p-2 outline-0 border bg-white text-icon border-radius-5 custom-transition bg-icon-hover text-white-hover border-icon"
            >
              <FormattedMessage id="Renter/Buyer" />
            </button>
          </div>
        </div>
        <Q_A_Info state={state} />
      </div>
    </>
  );
};

export default Q_A;

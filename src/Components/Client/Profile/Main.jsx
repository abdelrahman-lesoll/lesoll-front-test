import { Helmet } from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../../Shared/BreadCrumb";
import Aside from "./Aside";

const Main = () => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetProfile" })}</title>
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Profile" />} />
      <div className="container-fluid my-5">
        <div className="row">
          <Aside />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;

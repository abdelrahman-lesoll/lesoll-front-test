import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { Empty, HLoading } from "../../Shared/Loading";
import { useFindGovernrates } from "../../Hooks/useGovernrate";
import { FormattedMessage, useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import BreadCrumb from "../../Shared/BreadCrumb";
import SingleGovernrate from "./SingleGovernrate";

const AllGovernrates = () => {
  const { locale } = useContext(LangContext);
  const { state } = useFindGovernrates("all-governrates");
  const { formatMessage } = useIntl();
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: "HelmetGovernrates" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Governrates" />} />
      <div className="container-fluid my-5">
        <div className="row">
          {state.loading ? (
            <HLoading />
          ) : state.governrates.length === 0 ? (
            <Empty title={<FormattedMessage id="NoGovernrates" />} />
          ) : (
            state.governrates.map((governrate, index) => (
              <SingleGovernrate {...{ governrate, locale }} key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllGovernrates;

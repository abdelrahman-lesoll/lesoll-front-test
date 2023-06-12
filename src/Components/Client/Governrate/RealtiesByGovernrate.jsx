import { useParams } from "react-router-dom";
import { useRealty } from "../../Hooks/useRealty";
import { Empty, HLoading } from "../../Shared/Loading";
import { FormattedMessage, useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import BreadCrumb from "../../Shared/BreadCrumb";
import SingleRealty from "../Realty/SingleRealty";

const RealtiesByCityId = () => {
  const { formatMessage } = useIntl();
  const { state } = useRealty("realty-governrate", useParams().id);
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: "HelmetRealties" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="SearchResults" />} />
      <div className="container-fluid my-5">
        <div className="row">
          {state.loading ? (
            <HLoading />
          ) : state.realtyGovernrate.length === 0 ? (
            <Empty title={<FormattedMessage id="NoRealty" />} />
          ) : (
            state.realtyGovernrate.map((realty, index) => (
              <div className="col-lg-4 col-sm-6 mb-3" key={index}>
                <SingleRealty realty={realty} />
              </div>
            ))
          )}
        </div>
        {state.fetching && <HLoading />}
      </div>
    </>
  );
};

export default RealtiesByCityId;

import { useParams } from "react-router-dom";
import { useRealty } from "../../Hooks/useRealty";
import { Helmet } from "react-helmet";
import { Empty, HLoading } from "../../Shared/Loading";
import { FormattedMessage, useIntl } from "react-intl";
import BreadCrumb from "../../Shared/BreadCrumb";
import SingleRealty from "../Realty/SingleRealty";

const RealtiesByRegion = () => {
  const { title } = useParams();
  const { state } = useRealty("realty-region", title);
  const { formatMessage } = useIntl();
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: "HelmetRealtyRegions" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={formatMessage({ id: "RealtiesIn" }) + title} />
      <div className="container-fluid my-5">
        <div className="row">
          {state.loading ? (
            <HLoading />
          ) : state.realtyRegions.length === 0 ? (
            <Empty title={<FormattedMessage id="NoRealty" />} />
          ) : (
            state.realtyRegions.map((realty, index) => (
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

export default RealtiesByRegion;

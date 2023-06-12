import { Empty, HLoading } from "../../Shared/Loading";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useRealty } from "../../Hooks/useRealty";
import { Helmet } from "react-helmet";
import BreadCrumb from "../../Shared/BreadCrumb";
import SingleRealty from "../Realty/SingleRealty";

const UserRealties = () => {
  const { formatMessage } = useIntl();
  const { id } = useParams();
  const { state } = useRealty("user-realties", id);
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
          ) : state.userRealty.length === 0 ? (
            <Empty title={<FormattedMessage id="NoRealty" />} />
          ) : (
            state.userRealty.map((realty) => (
              <div className="col-lg-4 col-sm-6 mb-3" key={realty._id}>
                <SingleRealty {...{ realty }} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserRealties;

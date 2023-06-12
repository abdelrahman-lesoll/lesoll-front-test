import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { useRealty } from "../../Hooks/useRealty";
import { FullLoading, HLoading } from "../../Shared/Loading";
import BreadCrumb from "../../Shared/BreadCrumb";
import SingleRealty from "./SingleRealty";

const RelatedRealties = () => {
  const { state } = useRealty("related-realties", useParams());
  return (
    <>
      <BreadCrumb title={<FormattedMessage id="RelatedRealties" />} />
      {state.loading ? (
        <FullLoading />
      ) : (
        <div className="container-fluid my-5">
          <div className="row">
            {state.relatedRealties.map((realty, index) => (
              <div className="col-lg-4 col-sm-6 mb-3" key={index}>
                <SingleRealty {...{ realty }} />
              </div>
            ))}
          </div>
          {state.fetching && <HLoading />}
        </div>
      )}
    </>
  );
};

export default RelatedRealties;

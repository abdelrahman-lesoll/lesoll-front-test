import { HLoading } from "../../Shared/Loading";
import { FormattedMessage } from "react-intl";
import { useRealty } from "../../Hooks/useRealty";
import { Link } from "react-router-dom";
import SingleRealty from "../Realty/SingleRealty";

const GoodPlaces = () => {
  const { state } = useRealty("sub-realty");
  return (
    <div className="container-fluid my-5">
      <div className="title text-center mb-4">
        <h1 className="fw-bold">
          <FormattedMessage id="ExploreGoodPlaces" />
        </h1>
      </div>
      <div className="row">
        {state.loading ? (
          <HLoading />
        ) : (
          state.myRealty.map((realty) => (
            <div className="col-lg-4 col-sm-6 mb-3" key={realty._id}>
              <SingleRealty {...{ realty }} />
            </div>
          ))
        )}
      </div>
      <div className="row text-center my-4">
        <div className="col-12">
          <Link
            to="/Search"
            className="border-radius-10 border border-blue main-text main-bg-hover text-white-hover outline-0 px-4 py-2 custom-transition bg-white main-text"
          >
            <FormattedMessage id="MorePlaces" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoodPlaces;

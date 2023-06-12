import { HLoading } from "../../Shared/Loading";
import { useRef, useContext, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ShowContext } from "../../../App";
import { Empty } from "../../Shared/Loading";
import { useSearchParams } from "react-router-dom";
import { useRealty } from "../../Hooks/useRealty";
import { MapSearch } from "../../Hooks/useMap";
import { Alert } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Options from "./Options";
import SingleRealty from "../Realty/SingleRealty";
import InfiniteScroll from "react-infinite-scroll-component";
import ModalSearch from "../../Modals/ModalSearch";

const Search = () => {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSearch, state, hasMore } = useRealty(
    "search-Realty",
    searchParams.toString()
  );
  const [bounce, setBounce] = useState([]);
  useEffect(() => {
    setBounce(state.searchRealty.map((_) => 2));
  }, [state.searchRealty]);
  const mapRef = useRef();
  const Context = useContext(ShowContext);
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetSearchTitle" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <div className="container-fluid">
        <div className="d-block d-xxl-none d-xl-none d-lg-none">
          <button
            onClick={() => Context.dispatch({ type: "modalSearch" })}
            className="fixed-bottom outline-0 border-0 py-2 main-bg text-white border-radius-5 show-map-responsive-button w-25 m-auto bottom-5"
          >
            <FormattedMessage id="ShowMap" />
          </button>
          <div className="p-0 m-0">
            <ModalSearch {...{ Context, state, mapRef, bounce, setBounce }} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 vh-100 position-sticky top-0 lesoll-map-container order-lg-1 order-2 d-none d-xxl-block d-lg-block">
            {!state.loading && (
              <MapSearch {...{ state, mapRef, bounce, setBounce }} />
            )}
          </div>
          <div className="col-lg-7 order-lg-2 order-1">
            <Options {...{ searchParams, setSearchParams }} />
            <div className="row">
              {state.loading ? (
                <HLoading />
              ) : !state.searchRealty.length ? (
                <Empty title={<FormattedMessage id="NoSearchFound" />} />
              ) : (
                <>
                  <Alert
                    variant="dark"
                    className="width-95 m-auto mb-2 d-flex align-items-center"
                  >
                    <AiOutlineInfoCircle className="mx-2" size="1.3rem" />
                    <FormattedMessage id="SearchInfo" />
                  </Alert>
                  <InfiniteScroll
                    dataLength={state.searchRealty.length}
                    next={() => handleSearch(searchParams.toString())}
                    hasMore={hasMore}
                    className="overflow-hidden p-0 m-0"
                  >
                    <div className="row p-0 m-0">
                      {state.searchRealty.map((realty, index) => (
                        <div className="col-sm-6 col-12 h-100 mb-3" key={index}>
                          <SingleRealty
                            {...{
                              realty,
                              mapRef,
                              index,
                              bounce,
                              setBounce,
                              fromSearch: true,
                            }}
                          />
                        </div>
                      ))}
                      {state.fetching && <HLoading />}
                    </div>
                  </InfiniteScroll>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

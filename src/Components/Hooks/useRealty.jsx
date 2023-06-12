import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addRealty,
  deleteRealty,
  findAllOrSubRealty,
  findMyRealty,
  singleRealty,
  updateRealty,
  findByGovernrate,
  findByRegionTitle,
  findByOffer,
  changeStatus,
  findByStatus,
  resetError,
  searchRealty,
  findUserRealty,
  resetAddRealty,
  resetGovernrateRealty,
  resetRegionRealty,
  relatedRealties,
  resetRelatedRealty,
  findMostView,
  resetMostView,
  increaseViews,
  findBySaleOption,
  findByRentalPeriod,
  findAdminRealty,
  findAndCountStatus,
} from "../../Api/Realty";

export const useRealty = (realtyKey, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const state = useSelector((state) => state.realty);
  const handleAddRealty = (values) => dispatch(addRealty(values));
  const handleUpdateRealty = (values) => dispatch(updateRealty(values));
  const handleDeleteRealty = (values) => dispatch(deleteRealty(values));
  const handleChangeStatus = (values) => dispatch(changeStatus(values));
  const handleIncreaseViews = (values) => dispatch(increaseViews(values));
  const handleOfferState = (values) => dispatch(findByOffer(values));
  const handleSaleOptions = (values) => dispatch(findBySaleOption(values));
  const handleRentalPeriod = (values) => dispatch(findByRentalPeriod(values));
  const handleFindAdminRealty = (values) => dispatch(findAdminRealty(values));
  const handleFindAndCountStatus = (values) =>
    dispatch(findAndCountStatus(values));
  const handleSearch = (values) => {
    if (!state.searchRealty.length || state.searchRealty.length < 15) {
      setHasMore(false);
    } else {
      dispatch(searchRealty({ page: state.pageSearch, values }));
    }
  };

  useEffect(() => {
    if (realtyKey === "my-property") {
      dispatch(findMyRealty());
    } else if (realtyKey === "sub-realty") {
      dispatch(findAllOrSubRealty(0));
    } else if (realtyKey === "most-view" || realtyKey === "sub-most-view") {
      dispatch(findMostView({ page: 0, homePage: values }));
    } else if (realtyKey === "admin-realty") {
      dispatch(findAdminRealty({ page: 1 }));
    } else if (realtyKey === "realty-governrate") {
      dispatch(findByGovernrate({ page: 0, id: values }));
    } else if (realtyKey === "realty-region") {
      dispatch(findByRegionTitle({ page: 0, title: values }));
    } else if (realtyKey === "realty-offer") {
      dispatch(findByOffer(values));
    } else if (realtyKey === "realty-sale-option") {
      dispatch(findBySaleOption(values));
    } else if (realtyKey === "realty-rental-period") {
      dispatch(findByRentalPeriod(values));
    } else if (realtyKey === "realty-status-count") {
      dispatch(findAndCountStatus(values));
    } else if (realtyKey === "user-realties") {
      dispatch(findUserRealty(values));
    } else if (realtyKey === "realty-status") {
      dispatch(findByStatus(values));
    } else if (realtyKey === "search-Realty") {
      dispatch(searchRealty({ page: state.pageSearch, values }));
    } else {
      return;
    }
  }, [realtyKey]);

  useEffect(() => {
    // here this is alone because if user clicked view of related realty => component will reload.
    if (realtyKey === "realty-id") {
      dispatch(singleRealty(values));
    } else if (realtyKey === "related-realties") {
      dispatch(relatedRealties({ page: 0, ...values }));
    } else {
      return;
    }
  }, [realtyKey, values]);

  useEffect(() => {
    if (
      realtyKey === "realty-governrate" ||
      realtyKey === "realty-region" ||
      realtyKey === "related-realties" ||
      realtyKey === "most-view"
    ) {
      let currentPage = 0;
      const onScroll = () => {
        if (parseInt(window.pageYOffset % 1000) >= 0) {
          let page = parseInt(window.pageYOffset / 1000);
          if (currentPage < page) {
            currentPage = page;
            if (realtyKey === "realty-governrate") {
              dispatch(findByGovernrate({ page: currentPage, id: values }));
            } else if (realtyKey === "related-realties") {
              dispatch(relatedRealties({ page: currentPage, ...values }));
            } else if (realtyKey === "most-view") {
              dispatch(findMostView({ page: currentPage, homePage: values }));
            } else {
              dispatch(findByRegionTitle({ page: currentPage, title: values }));
            }
          }
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => {
        if (realtyKey === "realty-governrate") {
          dispatch(resetGovernrateRealty());
        } else if (realtyKey === "related-realties") {
          dispatch(resetRelatedRealty());
        } else if (realtyKey === "most-view") {
          dispatch(resetMostView());
        } else {
          dispatch(resetRegionRealty());
        }
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [realtyKey]);

  useEffect(() => {
    if (state.error) {
      navigate("/Error-Realty", { state: { statusCode: 500 } });
      dispatch(resetError());
    } else if (!!state.addRealtyNotifications.length) {
      navigate("/User/My-Property");
      dispatch(resetAddRealty());
    }
  }, [state]);

  return {
    state,
    hasMore,
    handleAddRealty,
    handleUpdateRealty,
    handleDeleteRealty,
    handleChangeStatus,
    handleSearch,
    handleIncreaseViews,
    handleOfferState,
    handleSaleOptions,
    handleRentalPeriod,
    handleFindAdminRealty,
    handleFindAndCountStatus,
  };
};

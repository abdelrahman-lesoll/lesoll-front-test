import { FormattedMessage, useIntl } from "react-intl";
import { AiOutlineSearch } from "react-icons/ai";
import { IoBanOutline } from "react-icons/io5";
import {
  defaultSearchValue,
  defaultExtra,
  defaultSaleOption,
} from "../../../Constants/HomeConstants";
import {
  OfferOption,
  ExtraSearch,
  SaleOption,
} from "../../../Reducers/AddPropertyReducer";
import { styles } from "../Other/CustomSelect";
import { useNavigate } from "react-router-dom";
import { memo, useEffect } from "react";
import Price from "./Price";
import Select from "react-select";

const Options = ({ searchParams, setSearchParams }) => {
  const intl = useIntl();
  const handleChange = (e, key) =>
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      [key]: e?.target?.value || e,
    });
  return (
    <div className="py-4">
      <div className="title">
        <h3 className="fw-bold">
          <FormattedMessage id="whereSearch" />
        </h3>
      </div>
      <div className="row">
        <div
          className={`${
            searchParams.get("offer") === "For Sale" && "col-md-3"
          } col-sm-6 col-12 mb-3`}
        >
          <input
            defaultValue={searchParams.get("location") || ""}
            onChange={(e) => handleChange(e.target.value ? e : "", "location")}
            className="outline-0 border border-radius-5 w-100 p-2 "
            placeholder={intl.formatMessage({ id: "SearchRegionCity" })}
          />
        </div>
        <div className="col-md-3 col-sm-6 col-12 mb-3">
          <Select
            styles={styles()}
            options={OfferOption}
            onChange={({ value }) => handleChange(value, "offer")}
            defaultValue={defaultSearchValue(searchParams)}
          />
        </div>
        {searchParams.get("offer") === "For Sale" && (
          <div className="col-md-3 col-sm-6 col-12 mb-3">
            <Select
              styles={styles()}
              options={SaleOption}
              onChange={({ value }) => handleChange(value, "saleOption")}
              defaultValue={defaultSaleOption(searchParams)}
            />
          </div>
        )}
        <div className="col-md-3 col-sm-6 col-12 mb-3">
          <Select
            styles={styles()}
            options={ExtraSearch}
            onChange={({ value }) => handleChange(value, "sortType")}
            defaultValue={defaultExtra(searchParams)}
          />
        </div>
        <div className="col-md-3 col-sm-6 col-12 mb-3">
          <input
            type="number"
            className="outline-0 border border-radius-5 w-100 p-2"
            placeholder={intl.formatMessage({ id: "Rooms" })}
            defaultValue={searchParams.get("rooms") || ""}
            onChange={(e) => handleChange(e.target.value ? e : "", "rooms")}
          />
        </div>
        <div className="col-md-3 col-sm-6 col-12 mb-3">
          <input
            type="number"
            className="outline-0 border border-radius-5 w-100 p-2"
            placeholder={intl.formatMessage({ id: "BathRooms" })}
            defaultValue={searchParams.get("bathRooms") || ""}
            onChange={(e) => handleChange(e.target.value ? e : "", "bathRooms")}
          />
        </div>
        <div className="col-md-3 col-sm-6 col-12 mb-3">
          <input
            type="number"
            className="outline-0 border border-radius-5 w-100 p-2"
            placeholder={intl.formatMessage({ id: "MinArea" })}
            defaultValue={searchParams.get("minArea") || ""}
            onChange={(e) => handleChange(e.target.value ? e : "", "minArea")}
          />
        </div>
        <div className="col-md-3 col-sm-6 col-12 mb-3">
          <input
            type="number"
            className="outline-0 border border-radius-5 w-100 p-2"
            placeholder={intl.formatMessage({ id: "MaxArea" })}
            defaultValue={searchParams.get("maxArea") || ""}
            onChange={(e) => handleChange(e.target.value ? e : "", "maxArea")}
          />
        </div>
      </div>
      <Price {...{ searchParams, setSearchParams }} />
      <SubmitSearchBtn {...{ setSearchParams }} />
    </div>
  );
};

const SubmitSearchBtn = ({ setSearchParams }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        location.reload();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <div className="my-2">
      <div className="row justify-content-end">
        <div className="col-lg-8">
          <div className="d-flex align-items-center justify-content-end">
            <button
              onClick={() => {
                setSearchParams();
                navigate("/Search");
                location.reload();
                localStorage.removeItem("sitemap-governrate");
                localStorage.removeItem("sitemap-region");
                localStorage.removeItem("sitemap-offer");
                localStorage.removeItem("sitemap-unitType");
                localStorage.removeItem("sitemap-proptype");
                localStorage.removeItem("sitemap-saleOption");
              }}
              className="d-flex align-items-center justify-content-center w-25 outline-0 border border-radius-5 p-2 bg-dark-grey text-white"
            >
              <IoBanOutline size="0.8rem" />
              <span className="mx-2">
                <FormattedMessage id="Reset" />
              </span>
            </button>
            <button
              type="submit"
              className="d-flex align-items-center justify-content-center w-25 outline-0 border border-radius-5 p-2 bg-orange text-white"
              onClick={() => {
                location.reload();
              }}
              disabled={!!localStorage.getItem("sitemap-offer")}
            >
              <AiOutlineSearch />{" "}
              <span className="mx-2">
                <FormattedMessage id="Search" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Options);

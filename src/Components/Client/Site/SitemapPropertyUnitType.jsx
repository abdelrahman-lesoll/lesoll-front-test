import { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { LangContext } from "../../../Languages/LanguageProvider";
import { LandTypes } from "../../../Reducers/AddPropertyReducer";
import { useFindWithPropType } from "../../Hooks/useProperty";

const SitemapPropertyUnitType = () => {
  const [propType, setPropType] = useState("Residential");
  const { state } = useFindWithPropType({ values: { propType } });
  const { locale } = useContext(LangContext);
  const { formatMessage } = useIntl();
  return (
    <>
      <div className="mb-2">
        <h3 className="title main-text">
          <FormattedMessage id="SiteMapPropertyType" />{" "}
          {formatMessage({
            id: localStorage.getItem("sitemap-offer") || "For Sale",
          })}
        </h3>
        <div className="row border-bottom py-2">
          <div className="col-sm-4 col-6 mb-2">
            <Link
              className={`cursor-pointer ${
                localStorage.getItem("sitemap-proptype") === "Residential"
                  ? "text-dark"
                  : "text-orange"
              }`}
              to={`/Sitemap/${
                locale === "en-US" ? "en" : "ar"
              }/${localStorage.getItem("sitemap-offer")}${
                !!localStorage.getItem("sitemap-saleOption")
                  ? `/${localStorage.getItem("sitemap-saleOption")}/Residential`
                  : "/Residential"
              }`}
              onClick={() => {
                setPropType("Residential");
                localStorage.setItem("sitemap-proptype", "Residential");
              }}
            >
              <FormattedMessage id="Residential" />
            </Link>
          </div>
          <div className="col-sm-4 col-6 mb-2">
            <Link
              className={`cursor-pointer ${
                localStorage.getItem("sitemap-proptype") === "Commercial"
                  ? "text-dark"
                  : "text-orange"
              }`}
              to={`/Sitemap/${
                locale === "en-US" ? "en" : "ar"
              }/${localStorage.getItem("sitemap-offer")}${
                !!localStorage.getItem("sitemap-saleOption")
                  ? `/${localStorage.getItem("sitemap-saleOption")}/Commercial`
                  : "/Commercial"
              }`}
              onClick={() => {
                setPropType("Commercial");
                localStorage.setItem("sitemap-proptype", "Commercial");
              }}
            >
              <FormattedMessage id="Commercial" />
            </Link>
          </div>
          <div className="col-sm-4 col-6 mb-2">
            <Link
              className={`cursor-pointer ${
                localStorage.getItem("sitemap-proptype") === "Land"
                  ? "text-dark"
                  : "text-orange"
              }`}
              to={`/Sitemap/${
                locale === "en-US" ? "en" : "ar"
              }/${localStorage.getItem("sitemap-offer")}${
                !!localStorage.getItem("sitemap-saleOption")
                  ? `/${localStorage.getItem("sitemap-saleOption")}/Land`
                  : "/Land"
              }`}
              onClick={() => {
                setPropType("Land");
                localStorage.setItem("sitemap-proptype", "Land");
              }}
            >
              <FormattedMessage id="Land" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="title main-text">
          <FormattedMessage id="SiteMapUnitType" />{" "}
          {formatMessage({
            id: localStorage.getItem("sitemap-offer") || "For Sale",
          })}
        </h3>
        <div className="row border-bottom py-2">
          {propType !== "Land"
            ? state.propWithHeader.map((header) => {
                return header.property.map((property) => (
                  <div className="col-sm-4 col-6 mb-2" key={property._id}>
                    <Link
                      to={`/Sitemap/${
                        locale === "en-US" ? "en" : "ar"
                      }/${localStorage.getItem("sitemap-offer")}${
                        !!localStorage.getItem("sitemap-saleOption")
                          ? `/${localStorage.getItem(
                              "sitemap-saleOption"
                            )}/${localStorage.getItem("sitemap-proptype")}`
                          : "/" + localStorage.getItem("sitemap-proptype")
                      }/${property.title.en}`}
                      onClick={() =>
                        localStorage.setItem(
                          "sitemap-unitType",
                          property.title.en
                        )
                      }
                      className={`cursor-pointer ${
                        localStorage.getItem("sitemap-unitType") ===
                        property.title.en
                          ? "text-dark"
                          : "text-orange"
                      }`}
                    >
                      {property.title[locale === "en-US" ? "en" : "ar"]}
                    </Link>
                  </div>
                ));
              })
            : LandTypes.map((land, index) => (
                <div className="col-sm-4 col-6 mb-2" key={index}>
                  <Link
                    to={`/Sitemap/${
                      locale === "en-US" ? "en" : "ar"
                    }/${localStorage.getItem("sitemap-offer")}${
                      !!localStorage.getItem("sitemap-saleOption")
                        ? `/${localStorage.getItem(
                            "sitemap-saleOption"
                          )}/${localStorage.getItem("sitemap-proptype")}`
                        : localStorage.getItem("sitemap-proptype")
                    }/${land.value}`}
                    onClick={() =>
                      localStorage.setItem("sitemap-unitType", land.value)
                    }
                    className={`cursor-pointer ${
                      localStorage.getItem("sitemap-unitType") === land.value
                        ? "text-dark"
                        : "text-orange"
                    }`}
                  >
                    {land.label}
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default SitemapPropertyUnitType;

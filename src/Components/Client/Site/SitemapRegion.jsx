import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { LangContext } from "../../../Languages/LanguageProvider";
import { useFindRegions } from "../../Hooks/useRegion";

const SitemapRegion = ({ setSearch }) => {
  const { locale } = useContext(LangContext);
  const { state } = useFindRegions(
    "region-by-governrate",
    localStorage.getItem("sitemap-governrate")
  );
  return (
    <>
      <div className="mb-2">
        <h3 className="title main-text">
          <FormattedMessage id="SiteMapRegion" />
        </h3>
        <div className="row py-2">
          {state.regionByGovernrates.map((region) => (
            <div className="col-sm-4 col-6 mb-2" key={region._id}>
              <Link
                className={`cursor-pointer ${
                  localStorage.getItem("sitemap-region") === region.title.en
                    ? "text-dark"
                    : "text-orange"
                }`}
                to={`/Sitemap/${
                  locale === "en-US" ? "en" : "ar"
                }/${localStorage.getItem("sitemap-offer")}${
                  !!localStorage.getItem("sitemap-saleOption")
                    ? `/${localStorage.getItem(
                        "sitemap-saleOption"
                      )}/${localStorage.getItem("sitemap-proptype")}`
                    : localStorage.getItem("sitemap-proptype")
                }/${localStorage.getItem(
                  "sitemap-unitType"
                )}/${localStorage.getItem("sitemap-governrate")}/${
                  region.title.en
                }`}
                onClick={() => {
                  localStorage.setItem("sitemap-region", region.title.en);
                  setSearch(true);
                }}
              >
                {region.title[locale === "en-US" ? "en" : "ar"]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SitemapRegion;

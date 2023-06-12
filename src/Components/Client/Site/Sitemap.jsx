import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { LangContext } from "../../../Languages/LanguageProvider";
import BreadCrumb from "../../Shared/BreadCrumb";
import Search from "../Search/Search";
import SitemapGovernrate from "./SitemapGovernrate";
import SitemapOffer from "./SitemapOffer";
import SitemapPropertyUnitType from "./SitemapPropertyUnitType";
import SitemapRegion from "./SitemapRegion";

const Sitemap = () => {
  const Language = useContext(LangContext);
  const [search, setSearch] = useState(false);
  useEffect(() => {
    localStorage.setItem("sitemap-offer", "For Sale");
    localStorage.setItem("sitemap-saleOption", "Cash");
    localStorage.setItem("sitemap-proptype", "Residential");
    localStorage.setItem("sitemap-unitType", "Villa");
    localStorage.setItem("sitemap-governrate", "Cairo");
    localStorage.setItem("sitemap-region", "--");
  }, []);

  if (!search) {
    return (
      <div className="lesoll-sitemap">
        <BreadCrumb title={<FormattedMessage id="SiteMap" />} />
        <div className="container-fluid p-4">
          <div className="mb-2">
            <h3 className="title main-text">
              <FormattedMessage id="SiteMapLanguage" />
            </h3>
            <div className="row border-bottom py-2">
              <div className="col-sm-4 col-6 mb-2">
                <Link
                  className={`cursor-pointer ${
                    localStorage.getItem("Language") === "en-US"
                      ? "text-dark"
                      : "text-orange"
                  }`}
                  onClick={() => Language.selectLang("en-US")}
                  to="/Sitemap/en"
                >
                  English
                </Link>
              </div>
              <div className="col-sm-4 col-6 mb-2">
                <Link
                  onClick={() => Language.selectLang("ar-EG")}
                  className={`cursor-pointer ${
                    localStorage.getItem("Language") === "ar-EG"
                      ? "text-dark"
                      : "text-orange"
                  }`}
                  to="/Sitemap/ar"
                >
                  عربى
                </Link>
              </div>
            </div>
          </div>

          <SitemapOffer locale={Language?.locale} />

          <SitemapPropertyUnitType />

          <SitemapGovernrate />

          <SitemapRegion setSearch={setSearch} />
        </div>
      </div>
    );
  } else {
    return <Search />;
  }
};

export default Sitemap;

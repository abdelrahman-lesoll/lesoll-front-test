import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { LangContext } from "../../../Languages/LanguageProvider";
import { useFindGovernrates } from "../../Hooks/useGovernrate";

const SitemapGovernrate = () => {
  const { state } = useFindGovernrates("all-governrates");
  const { locale } = useContext(LangContext);
  return (
    <>
      <div className="mb-2">
        <h3 className="title main-text">
          <FormattedMessage id="SiteMapGovernrate" />
        </h3>
        <div className="row border-bottom py-2">
          {state.governrates.map((governrate) => (
            <div className="col-sm-4 col-6 mb-2" key={governrate._id}>
              <Link
                to={`/Sitemap/${
                  locale === "en-US" ? "en" : "ar"
                }/${localStorage.getItem("sitemap-offer")}${
                  !!localStorage.getItem("sitemap-saleOption")
                    ? `/${localStorage.getItem(
                        "sitemap-saleOption"
                      )}/${localStorage.getItem("sitemap-proptype")}`
                    : "/" + localStorage.getItem("sitemap-proptype")
                }/${localStorage.getItem("sitemap-unitType")}/${
                  governrate.title.en
                }`}
                onClick={() =>
                  localStorage.setItem(
                    "sitemap-governrate",
                    governrate.title.en
                  )
                }
                className={`cursor-pointer ${
                  localStorage.getItem("sitemap-governrate") ===
                  governrate.title.en
                    ? "text-dark"
                    : "text-orange"
                }`}
              >
                {governrate.title[locale === "en-US" ? "en" : "ar"]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SitemapGovernrate;

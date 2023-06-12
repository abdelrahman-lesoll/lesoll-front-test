import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const SitemapOffer = ({ locale }) => {
  return (
    <>
      <div className="mb-2">
        <h3 className="title main-text">
          <FormattedMessage id="SiteMapOffer" />
        </h3>
        <div className="row border-bottom py-2">
          <div className="col-sm-4 col-6 mb-2">
            <Link
              className={`cursor-pointer ${
                localStorage.getItem("sitemap-offer") === "For Sale"
                  ? "text-dark"
                  : "text-orange"
              }`}
              onClick={() => {
                localStorage.setItem("sitemap-offer", "For Sale");
                localStorage.setItem("sitemap-saleOption", "Cash");
              }}
              to={`/Sitemap/${locale === "en-US" ? "en" : "ar"}/For Sale`}
            >
              <FormattedMessage id="For Sale" />
            </Link>
          </div>
          <div className="col-sm-4 col-6 mb-2">
            <Link
              className={`cursor-pointer ${
                localStorage.getItem("sitemap-offer") === "For Rent"
                  ? "text-dark"
                  : "text-orange"
              }`}
              onClick={() => {
                localStorage.setItem("sitemap-offer", "For Rent");
                localStorage.removeItem("sitemap-saleOption");
              }}
              to={`/Sitemap/${locale === "en-US" ? "en" : "ar"}/For Rent`}
            >
              <FormattedMessage id="For Rent" />
            </Link>
          </div>
        </div>
      </div>

      {localStorage.getItem("sitemap-offer") === "For Sale" && (
        <div className="mb-2">
          <h3 className="title main-text">
            <FormattedMessage id="SiteMapOfferForSale" />
          </h3>
          <div className="row border-bottom py-2">
            <div className="col-sm-4 col-6 mb-2">
              <Link
                className={`cursor-pointer ${
                  localStorage.getItem("sitemap-saleOption") === "Cash"
                    ? "text-dark"
                    : "text-orange"
                }`}
                onClick={() =>
                  localStorage.setItem("sitemap-saleOption", "Cash")
                }
                to={`/Sitemap/${
                  locale === "en-US" ? "en" : "ar"
                }/For Sale/Cash`}
              >
                <FormattedMessage id="Cash" />
              </Link>
            </div>
            <div className="col-sm-4 col-6 mb-2">
              <Link
                className={`cursor-pointer ${
                  localStorage.getItem("sitemap-saleOption") === "Installment"
                    ? "text-dark"
                    : "text-orange"
                }`}
                onClick={() =>
                  localStorage.setItem("sitemap-saleOption", "Installment")
                }
                to={`/Sitemap/${
                  locale === "en-US" ? "en" : "ar"
                }/For Sale/Installment`}
              >
                <FormattedMessage id="Installment" />
              </Link>
            </div>
            <div className="col-sm-4 col-6 mb-2">
              <Link
                className={`cursor-pointer ${
                  localStorage.getItem("sitemap-saleOption") ===
                  "Real-Estate-Finance"
                    ? "text-dark"
                    : "text-orange"
                }`}
                onClick={() =>
                  localStorage.setItem(
                    "sitemap-saleOption",
                    "Real-Estate-Finance"
                  )
                }
                to={`/Sitemap/${
                  locale === "en-US" ? "en" : "ar"
                }/For Sale/Real-Estate-Finance`}
              >
                <FormattedMessage id="RealFinance" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SitemapOffer;

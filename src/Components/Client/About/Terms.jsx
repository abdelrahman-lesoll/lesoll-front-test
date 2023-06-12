import { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { useFindTerms } from "../../Hooks/useTerm";
import { LangContext } from "../../../Languages/LanguageProvider";
import { HLoading } from "../../Shared/Loading";
import BreadCrumb from "../../Shared/BreadCrumb";

const Terms = () => {
  const { state } = useFindTerms("all-terms");
  const { locale } = useContext(LangContext);
  const { formatMessage } = useIntl();
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: "HelmetTerms" })}</title>
        <link rel="canonical" href={location.href} />
        <meta
          name="description"
          content={formatMessage({ id: "HelmetTermsDescription" })}
        />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Terms" />} />
      <div className="container-fluid my-5">
        {state.loading ? (
          <HLoading />
        ) : (
          <ol className="py-3 px-5">
            {state.terms.map((term) => (
              <li key={term._id} className="mb-2 text-justify">
                {locale === "en-US" ? term.title.en : term.title.ar}
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
};

export default Terms;

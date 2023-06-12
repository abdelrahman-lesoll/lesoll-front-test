import { FormattedMessage } from "react-intl";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";

const Links = ({ Options }) => {
  const { locale } = useContext(LangContext);
  return (
    <div className="col-lg-2 col-sm-6">
      <div className="p-2">
        <div className="title">
          <h4 className="fw-bold">
            <FormattedMessage id="HelpfulLinks" />
          </h4>
        </div>
        <ul className="list-unstyled text-muted m-0 p-0">
          {Options.map((option) => (
            <li
              className="py-1 cursor-pointer d-flex align-items-center"
              key={option}
            >
              {locale === "en-US" ? <IoIosArrowForward /> : <IoIosArrowBack />}
              <Link to={`/${option}`} className="mx-1">
                <FormattedMessage id={option} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Links;

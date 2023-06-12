import { useContext } from "react";
import { ShowContext } from "../../App";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const AcceptTermsPrivacy = () => {
  const Context = useContext(ShowContext);
  return (
    <div className="row">
      <div className="col-12 mt-2">
        <p className="text-center text-dark-grey font-13 border-top pt-2 link-primary">
          <FormattedMessage id="Accept" />
          <Link
            to="/Terms"
            className="main-text"
            onClick={() => Context.dispatch({ type: "closeAllModals" })}
          >
            <FormattedMessage id="TermsUse" />
          </Link>{" "}
          <FormattedMessage id="And" />
          <Link
            to="/Privacy"
            className="main-text"
            onClick={() => Context.dispatch({ type: "closeAllModals" })}
          >
            <FormattedMessage id="Privacy" />
          </Link>
          <FormattedMessage id="ForLesoll" />
        </p>
      </div>
    </div>
  );
};

export default AcceptTermsPrivacy;

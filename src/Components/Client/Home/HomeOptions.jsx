import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, Link } from "react-router-dom";
import { Owner, Buyer } from "../../../Constants/HomeConstants";

const HomeOptions = () => {
  const [owner, setOwner] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="container-fluid my-5 py-5 text-center how-it-work">
      <div className="main-title">
        <h1 className="text-dark">
          <FormattedMessage id="HowItWork" />
        </h1>
        <p className="text-dark-grey">
          <FormattedMessage id="HowItWorkDetail" />
        </p>
        <div className="mb-5">
          <button
            onClick={() => setOwner(true)}
            className={`custom-transition bg-orange-hover text-white-hover outline-0 border border-orange py-2 px-4 font-18 border-radius-5 mx-3 ${
              !owner ? "bg-white text-orange" : "bg-orange text-white"
            }`}
          >
            <FormattedMessage id="Owner" />
          </button>
          <button
            onClick={() => setOwner(false)}
            className={`custom-transition bg-orange-hover text-white-hover outline-0 border border-orange py-2 px-4 font-18 border-radius-5 mx-3 ${
              owner ? "bg-white text-orange" : "bg-orange text-white"
            }`}
          >
            <FormattedMessage id="Buyer" />
          </button>
        </div>
      </div>
      {!owner ? (
        <div className="row">
          {Buyer.map((info, index) => (
            <Link
              className={`col-lg-4 col-md-6 how-it-work-detail ${
                index !== 2 && "cursor-pointer"
              }`}
              key={index}
              to={index === 0 ? `/Search` : null}
            >
              <div className="img-container cursor-pointer">{info.icon}</div>
              <div className="title my-3">
                <h4>
                  <FormattedMessage id={info.title} />
                </h4>
                <p className="text-dark-grey">
                  <FormattedMessage id={info.description} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="row">
          {Owner.map((info, index) => (
            <div
              className={`col-lg-4 col-md-6 how-it-work-detail ${
                index !== 1 && "cursor-pointer"
              }`}
              key={index}
              onClick={() => index !== 1 && navigate("/Submit-Property")}
            >
              <div className="img-container">{info.icon}</div>
              <div className="title my-3">
                <h4>
                  <FormattedMessage id={info.title} />
                </h4>
                <p className="text-dark-grey">
                  <FormattedMessage id={info.description} />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeOptions;

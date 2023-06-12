import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import SingleRealty from "../Realty/SingleRealty";

const SubRelated = ({ relatedRealties, id }) => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid my-5">
      <div className="title text-center mb-4">
        <h1 className="fw-bold">
          <FormattedMessage id="RelatedRealties" />
        </h1>
      </div>
      <div className="row">
        {relatedRealties.map((realty, index) => (
          <div className="col-lg-4 col-sm-6 mb-3" key={index}>
            <SingleRealty {...{ realty }} />
          </div>
        ))}
      </div>
      {relatedRealties.length >= 6 && (
        <div className="row text-center my-4">
          <div className="col-12">
            <button
              onClick={() =>
                navigate(
                  `/Related/${
                    relatedRealties[0].unitType?.title.en || "Land"
                  }/${relatedRealties[0].governrate.title.en}/${
                    relatedRealties[0].region?.title.en || "-"
                  }/${id}`
                )
              }
              className="border-radius-10 border border-blue main-text main-bg-hover text-white-hover outline-0 px-4 py-2 custom-transition bg-white main-text"
            >
              <FormattedMessage id="MorePlaces" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubRelated;

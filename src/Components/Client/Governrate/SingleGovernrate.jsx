import { IoIosArrowForward } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Image from "../../Shared/Image";

const SingleGovernrate = ({ governrate, locale }) => {
  return (
    <div className="col-lg-4 col-sm-6 col-12 mb-3">
      <div className="border border-radius-5">
        <div className="img-container cursor-pointer">
          <Link to={`/Governrate/${governrate._id}`}>
            <Image
              imageUrl={governrate.image}
              className="mw-100 w-100 border-radius-5 custom-transition"
              height="250"
              alt=""
            />
          </Link>
        </div>
        <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="loc-detail">
              <h5 className="mb-1">
                {locale === "en-US" ? governrate.title.en : governrate.title.ar}
              </h5>
              <span className="font-14 text-dark-grey">
                {governrate.realties.length}{" "}
                <FormattedMessage
                  id={governrate.realties.length > 1 ? "Realties" : "Realty"}
                />
              </span>
            </div>
            <div className="loc-arrow-detail main-bg text-white p-2 rounded-circle">
              <Link to={`/Governrate/${governrate._id}`}>
                <IoIosArrowForward size={"1.5rem"} className="cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGovernrate;

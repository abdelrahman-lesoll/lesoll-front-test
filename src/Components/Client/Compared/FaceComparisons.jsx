import { FormattedMessage, FormattedNumber } from "react-intl";
import { Comparisons } from "./SliderSettings";

const FaceComparisons = () => {
  return (
    <div className="col-lg-3 d-none d-xxl-block d-xl-block d-lg-block">
      <div className="h-100 mt-1">
        <div className="p-2 mt-4">
          <div className="img-container invisible">
            <img
              src="/Img/Extra/p-1.jpg"
              height="170"
              className="mw-100"
              alt=""
            />
          </div>
          <div className="">
            <h5 className="text-primary text-center my-1 invisible">
              <FormattedNumber value={275000} />
              <span className="mx-1">LE</span>
            </h5>
            <h5 className="text-primary text-center my-1 invisible">
              <FormattedNumber value={275000} />
              <span className="mx-1">LE</span>
            </h5>
            {Comparisons.map((c, i) => (
              <div className="my-5" key={i}>
                <h5 className="bg-light-grey p-3 border-radius-5 text-center text-truncate">
                  <FormattedMessage id={c} />
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceComparisons;

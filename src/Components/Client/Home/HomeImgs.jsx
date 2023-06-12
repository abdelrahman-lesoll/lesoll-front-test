import { useContext } from "react";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { LangContext } from "../../../Languages/LanguageProvider";
import { HomeSearchImgs } from "../../../Reducers/SearchReducer";

const HomeImgs = () => {
  const { locale } = useContext(LangContext);

  return (
    <Fragment>
      <div className="img-container position-absolute top-0 left-0 h-100">
        <img
          src="/Img/Svg/Picture2.webp"
          className="mw-100 vw-100 h-100"
          alt=""
        />
      </div>
      <div className="mt-4">
        <h1
          className={`home-description ${
            locale === "en-US" ? "en" : "ar"
          } fw-bold font-50 my-3`}
        >
          <FormattedMessage id="HomeDescription" />
        </h1>
        <div className="d-flex align-items-center justify-content-center my-4">
          {HomeSearchImgs.map((img) => (
            <img
              key={img}
              src={`/Img/Header/${img}${
                locale === "en-US" ? "_En" : "_Ar"
              }.png`}
              className={`${locale === "en-US" ? "en" : "ar"} mw-100`}
              height="135"
              width="135"
              alt=""
            />
          ))}
        </div>{" "}
      </div>
    </Fragment>
  );
};

export default HomeImgs;

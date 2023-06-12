import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { LangContext } from "../../Languages/LanguageProvider";
import { NextArrow, PrevArrow } from "./Arrows";
import { useContext, createRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useRealty } from "../Hooks/useRealty";
import Slider from "react-slick";
import ReactTimeAgo from "react-time-ago";

const Image = ({ imageUrl, isVideo, ...rest }) => {
  if (!isVideo) {
    return (
      <LazyLoadImage
        src={
          imageUrl
            ? `${import.meta.env.VITE_SERVER_PORT}/api/${imageUrl}`
            : "/Img/User/blank.jpg"
        }
        {...rest}
      />
    );
  } else
    return (
      <video
        src={
          imageUrl
            ? `${import.meta.env.VITE_SERVER_PORT}/api/${imageUrl}`
            : "/Img/User/blank.jpg"
        }
        {...rest}
      ></video>
    );
};

export const AlbumSlider = ({ album, createdAt, id, views, ...rest }) => {
  const nextArrowRef = createRef();
  const prevArrowRef = createRef();
  const { locale } = useContext(LangContext);
  const { handleIncreaseViews } = useRealty();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow ref={nextArrowRef} />,
    prevArrow: <PrevArrow ref={prevArrowRef} />,
  };
  return (
    <div className="position-relative spec-realty">
      <div
        className="position-absolute top-50 left-0 cursor-pointer z-index-999 bg-white p-1 rounded-circle"
        onClick={() => {
          nextArrowRef.current.click();
          handleIncreaseViews({ id });
        }}
      >
        <BiChevronLeft className="text-dark" size="2rem" />
      </div>
      <Slider {...settings} className="position-relative">
        {album.map((info) => (
          <div key={info._id} className="position-relative">
            <Link to={`/Detail/${id}`}>
              <Image imageUrl={info.image} {...rest} />
            </Link>
            {createdAt && (
              <div
                className={`position-absolute top-4 ${
                  locale === "en-US" ? "left-2" : "right-2"
                } bg-white text-light-blue px-2 border-radius-5`}
              >
                <span className="fw-semibold">
                  <ReactTimeAgo date={new Date(createdAt)} locale={locale} />
                </span>
              </div>
            )}
            {!!views && (
              <div
                className={`position-absolute top-4 ${
                  locale === "en-US" ? "right-2" : "left-2"
                } bg-white px-2 border-radius-5`}
              >
                <span className="fw-semibold text-icon">
                  <FormattedNumber value={views} />
                  <FormattedMessage id="Views" />
                </span>
              </div>
            )}
          </div>
        ))}
      </Slider>
      <div
        className="position-absolute top-50 right-0 cursor-pointer z-index-999 bg-white p-1 rounded-circle"
        onClick={() => {
          prevArrowRef.current.click();
          handleIncreaseViews({ id });
        }}
      >
        <BiChevronRight className="text-dark" size="2rem" />
      </div>
    </div>
  );
};

export default Image;

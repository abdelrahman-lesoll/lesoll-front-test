import { useContext, useState } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Modal, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Image, { AlbumSlider } from "../../Shared/Image";

const Album = ({ album, offer, createdAt, price, area, views }) => {
  const { locale } = useContext(LangContext);
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  return (
    <div className="row mb-3">
      <div className="col-lg-8">
        <div className="main-img-container position-relative">
          <AlbumSlider
            album={album}
            id={id}
            alt=""
            className="mw-100 w-100 border-radius-5 custom-transition"
            height="355"
          />
          <div
            className={`position-absolute top-4 ${
              locale === "en-US" ? "left-2" : "right-2"
            } bg-white text-light-blue px-2 border-radius-5`}
          >
            <span className="fw-semibold">
              <FormattedMessage id={offer} />
            </span>
          </div>
          <div
            className={`position-absolute top-4 ${
              locale === "en-US" ? "right-2" : "left-2"
            } bg-white text-light-blue px-2 border-radius-5`}
          >
            <span className="fw-semibold">
              <ReactTimeAgo date={new Date(createdAt)} locale={locale} />
            </span>
          </div>
          <div
            className={`position-absolute bottom-4 ${
              locale === "en-US" ? "left-2" : "right-2"
            } bg-white text-light-blue px-2 border-radius-5`}
          >
            <span className="fw-semibold text-icon">
              <FormattedNumber value={price} /> <FormattedMessage id="LE" />
            </span>
          </div>
          <div
            className={`position-absolute bottom-4 ${
              locale === "en-US" ? "right-2" : "left-2"
            } bg-white text-light-blue px-2 border-radius-5`}
          >
            {!views ? (
              <span className="fw-semibold text-icon">
                <FormattedNumber value={area} />{" "}
                <FormattedMessage
                  id="M"
                  values={{
                    pow: "2",
                    sup: (word) => <sup>{word}</sup>,
                  }}
                />
              </span>
            ) : (
              <span className="fw-semibold text-icon">
                <FormattedNumber value={views} />
                <FormattedMessage id="Views" />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-lg-4 d-none d-xxl-block d-xl-block d-lg-block">
        <div className="album">
          <div className="img-container mb-2 position-relative">
            <Image
              imageUrl={album[1].image}
              alt=""
              className="mw-100 w-100 border-radius-5 custom-transition"
              height={175}
            />
          </div>
          <div className="img-container position-relative">
            <Image
              imageUrl={album[2].image}
              alt=""
              className="mw-100 w-100 border-radius-5 custom-transition"
              height={175}
            />
            <div
              onClick={() => setModalShow(true)}
              className={`cursor-pointer d-flex align-items-center position-absolute bottom-5 border border-secondary bg-secondary px-1 border-radius-5 ${
                locale === "en-US" ? "right" : "left"
              }-2`}
            >
              <img
                src="/Img/Svg/Img.svg"
                height={20}
                width={20}
                className="mw-100"
                alt=""
              />
              <span className="text-white mx-1">{album.length}</span>
            </div>
            <AlbumModal
              album={album}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AlbumModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <FormattedMessage id="AlbumDetail" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel>
          {props.album.map((img, index) => (
            <Carousel.Item key={index}>
              <Image
                imageUrl={img.image}
                className="w-100 border-radius-5"
                alt={index}
                height={400}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default Album;

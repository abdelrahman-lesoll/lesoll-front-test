import { BsFacebook, BsTelegram } from "react-icons/bs";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { WhatsappShareButton, EmailShareButton } from "react-share";
import { TelegramShareButton, EmailIcon } from "react-share";
import { FacebookMessengerShareButton } from "react-share";
import { FacebookMessengerIcon } from "react-share";
import { FormattedMessage } from "react-intl";
import { BiCopy } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";

const ShareRealty = ({ Context }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Modal
      show={Context?.state.modalShare}
      onHide={() => Context?.dispatch({ type: "modalShare" })}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="WhereShare" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">
          <Slider {...settings}>
            <div className="p-2">
              <div className="text-center py-3" title="Copy Link">
                <BiCopy
                  size="2rem"
                  className="text-dark-grey cursor-pointer"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(window.location.href)
                      .then(function () {
                        Context?.dispatch({ type: "modalShare" });
                      })
                  }
                />
              </div>
            </div>

            <div className="p-2">
              <div className="text-center py-3">
                <FacebookShareButton url={location.href}>
                  <BsFacebook
                    size="2rem"
                    className="auth-face-btn cursor-pointer"
                  />
                </FacebookShareButton>
              </div>
            </div>

            <div className="p-2">
              <div className="text-center py-3">
                <FacebookMessengerShareButton
                  appId={import.meta.env.VITE_FACE_ID}
                  url={location.href}
                >
                  <FacebookMessengerIcon
                    size="2rem"
                    className="auth-face-btn cursor-pointer rounded-circle"
                  />
                </FacebookMessengerShareButton>
              </div>
            </div>

            <div className="p-2">
              <div className="text-center py-3">
                <TwitterShareButton url={location.href}>
                  <BsTwitter size="2rem" className="text-info cursor-pointer" />
                </TwitterShareButton>
              </div>
            </div>

            <div className="p-2">
              <div className="text-center py-3">
                <WhatsappShareButton url={location.href}>
                  <BsWhatsapp
                    size="2rem"
                    className="auth-whats-btn cursor-pointer"
                  />
                </WhatsappShareButton>
              </div>
            </div>

            <div className="p-2">
              <div className="text-center py-3">
                <EmailShareButton url={location.href}>
                  <EmailIcon
                    size="2rem"
                    className="rounded-circle cursor-pointer"
                  />
                </EmailShareButton>
              </div>
            </div>

            <div className="p-2">
              <div className="text-center py-3">
                <TelegramShareButton url={location.href}>
                  <BsTelegram
                    size="2rem"
                    className="text-info cursor-pointer"
                  />
                </TelegramShareButton>
              </div>
            </div>
          </Slider>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareRealty;

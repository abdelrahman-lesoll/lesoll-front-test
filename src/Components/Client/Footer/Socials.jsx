import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiTwitter, FiFacebook } from "react-icons/fi";
import { FormattedMessage } from "react-intl";

const Socials = () => {
  return (
    <li className="py-1">
      <span>
        <bdi>
          <FormattedMessage id="Socials" />:
          <span className="main-text mx-1">
            <a href="https://www.facebook.com/LesollRealestate" target="blank">
              <FiFacebook
                size="1.2rem"
                className="cursor-pointer mx-1 custom-transition footer-facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/lesollrealestate/"
              target="blank"
            >
              <FaInstagram
                size="1.2rem"
                className="cursor-pointer mx-1 custom-transition footer-instagram"
              />
            </a>
            <a href="https://twitter.com/LesollRealstate" target="blank">
              <FiTwitter
                size="1.2rem"
                className="cursor-pointer mx-1 custom-transition footer-twitter"
              />
            </a>
            <a href="https://wa.me/+201032362898" target="blank">
              <FaWhatsapp
                size="1.2rem"
                className="cursor-pointer custom-transition mx-1 footer-whatsapp"
              />
            </a>
          </span>
        </bdi>
      </span>
    </li>
  );
};

export default Socials;

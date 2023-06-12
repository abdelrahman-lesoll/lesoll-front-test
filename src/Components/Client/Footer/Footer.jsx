import { FormattedMessage } from "react-intl";
import Links from "./Links";
import Socials from "./Socials";

const Footer = () => {
  return (
    <footer className="box-shadow">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-5 col-sm-6">
            <div className="logo-container">
              <img
                src="/Logo/header-logo.jpg"
                height="50"
                className="mw-100"
                alt=""
              />
            </div>
            <div className="description my-3">
              <p className="text-muted lh-base">
                <FormattedMessage id="FooterInfo" />
              </p>
            </div>
          </div>
          <Links Options={["Contact", "Blogs", "About"]} />
          <Links Options={["Q_A", "Terms", "Privacy", "SiteMap"]} />
          <div className="col-lg-3 col-sm-6">
            <div className="p-2">
              <div className="title">
                <h4 className="fw-bold">
                  <FormattedMessage id="Contact" />
                </h4>
              </div>
              <ul className="list-unstyled text-muted m-0 p-0">
                <li className="py-1">
                  <span>
                    <bdi>
                      <FormattedMessage id="Address" />:
                      <span className="main-text mx-1">
                        <FormattedMessage id="LesollAddress" />
                      </span>
                    </bdi>
                  </span>
                </li>
                <li className="py-1">
                  <span>
                    <bdi>
                      <FormattedMessage id="Email" />:
                      <span className="main-text mx-1">info@lesoll.com</span>
                    </bdi>
                  </span>
                </li>
                <Socials />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useContext } from "react";
import { BsChatDots } from "react-icons/bs";
import { LangContext } from "../../../Languages/LanguageProvider";
import { useNotifications } from "../../Hooks/useNotifiation";
import { HiMenuAlt2, HiSearch } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ShowContext } from "../../../App";
import SideBar from "./SideBar";

const Header = ({ auth }) => {
  const intl = useIntl();
  const Context = useContext(ShowContext);
  const { locale } = useContext(LangContext);
  const { state } = useNotifications("not-seen", auth);
  return (
    <header className="row py-2 border-bottom">
      <div className="col-2 d-flex align-items-center justify-content-between">
        <div className="img-container">
          <Link to="/">
            <img
              src="/Logo/header-logo.jpg"
              className="mw-100"
              height="40"
              alt=""
            />
          </Link>
        </div>
        <HiMenuAlt2
          size="1.5rem"
          className="cursor-pointer"
          onClick={() => Context.dispatch({ type: "modalAdminOffcanvas" })}
        />
      </div>
      <div className="col-lg-5 d-none d-xxl-block d-xl-block d-lg-block">
        <div className="position-relative border border-radius-5">
          <input
            type="text"
            className="outline-0 border-0 w-100 p-2"
            placeholder={intl.formatMessage({ id: "Search" })}
          />
          <HiSearch
            size="1.3rem"
            className={`position-absolute top-25 ${
              locale === "en-US" ? "right" : "left"
            }-3`}
          />
        </div>
      </div>
      <div className="col-lg-5 col-10">
        <div className="d-flex align-items-center justify-content-end h-100">
          <AiOutlineSearch
            size="1.7rem"
            className="cursor-pointer mx-3 d-xxl-none d-xl-none d-lg-none"
          />
          {/* <Link className="position-relative" to="/Admin/Chats"> */}
          <Link className="position-relative" to="#">
            <BsChatDots size="1.3rem" className="cursor-pointer" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
          </Link>
          <Link className="position-relative mx-3" to="/Admin/Notifications">
            <IoMdNotificationsOutline
              size="1.7rem"
              className="cursor-pointer"
            />
            <span
              className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
                state.notSeen <= 0 ? "d-none" : "d-block"
              }`}
            >
              {state.notSeen}
            </span>
          </Link>
        </div>
      </div>
      <SideBar {...{ Context, locale }} />
    </header>
  );
};

export default Header;

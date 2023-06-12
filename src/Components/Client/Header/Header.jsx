import { IoMdNotificationsOutline } from "react-icons/io";
import { useNotifications } from "../../Hooks/useNotifiation";
import { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { ShowContext } from "../../../App";
import { BsList } from "react-icons/bs";
import { useAuth } from "../../../Utils/Auth";
import { Link } from "react-router-dom";
import LeftHeader from "./LeftHeader";
import Responsive from "./Responsive";
import RightHeader from "./RightHeader";
import Image from "../../Shared/Image";

const Header = () => {
  const Context = useContext(ShowContext);
  const auth = useAuth();
  const { state } = useNotifications("not-seen", auth);
  return (
    <header className="bg-white border-bottom py-2">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className="left-header d-flex align-items-center">
            <div className="logo-container cursor-pointer">
              <Link to="/">
                <img
                  src="/Logo/header-logo.jpg"
                  className="mw-100"
                  height={50}
                  alt=""
                />
              </Link>
            </div>
            <LeftHeader />
          </div>
          <div className="right-header">
            <RightHeader {...{ Context, auth, state }} />
            <div className="d-xxl-none d-xl-none d-lg-none cursor-pointer">
              {!auth.user ? (
                <AiOutlineUser
                  size="2rem"
                  onClick={() => Context?.dispatch({ type: "modalLogin" })}
                />
              ) : (
                <>
                  <span
                    onClick={() => Context?.dispatch({ type: "modalUpdate" })}
                  >
                    <Image
                      imageUrl={auth.user.image}
                      className="mw-100 rounded-circle"
                      height="32"
                      width="32"
                      alt=""
                    />
                  </span>
                  <Link
                    to={`${
                      auth.user.role === "Admin" ? "/Admin" : "/User"
                    }/Notifications`}
                    className="position-relative mx-2"
                  >
                    <IoMdNotificationsOutline size="1.7rem" />
                    <span
                      className={`position-absolute bottom-45 right-0 bg-danger px-1 font-14 rounded-circle text-white ${
                        state.notSeen <= 0 ? "d-none" : "d-block"
                      }`}
                    >
                      {state.notSeen}
                    </span>
                  </Link>
                </>
              )}
              <BsList
                size="2rem"
                className={`${!auth.user ? "mx-1" : "mx-0"}`}
                onClick={() => Context?.dispatch({ type: "modalOffcanvas" })}
              />
              <Responsive {...{ Context, auth }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

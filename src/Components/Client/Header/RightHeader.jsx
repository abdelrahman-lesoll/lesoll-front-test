import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { FormattedMessage } from "react-intl";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserLink, UserLinks } from "./Shared";
import Image from "../../Shared/Image";

const RightHeader = ({ Context, auth, state }) => {
  const navigate = useNavigate();
  return (
    <div className="d-none d-xxl-block d-xl-block d-lg-block mt-2">
      <div className="d-flex align-items-center">
        <button
          className="d-flex align-items-center border-0 py-0 m-0 px-4 bg-transparent outline-0"
          onClick={() => navigate("/Submit-Property")}
        >
          <FormattedMessage id="AddProperty" />
        </button>
        {!auth.user ? (
          <div className="suggest-login d-flex align-items-center">
            <button
              className="d-flex align-items-center py-2 px-4 bg-orange text-white border border-orange outline-0 border-radius-5"
              onClick={() => Context?.dispatch({ type: "modalLogin" })}
            >
              <AiOutlineUser />
              <span className="mx-2">
                <FormattedMessage id="SignIn" />
              </span>
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <div className="drop-down-parent d-flex align-items-center px-2 cursor-pointer">
              <div className="img-container">
                <Image
                  imageUrl={auth.user.image}
                  className="mw-100 rounded-circle"
                  height="32"
                  width="32"
                  alt=""
                />
              </div>
              <span className="mx-2 font-15">{auth.user.fullname}</span>
              <IoIosArrowDown />
              <ul className="m-0 p-0 lang-drop-down custom-transition border-radius-10 top-130 list-unstyled position-absolute bg-white box-shadow">
                {UserLinks.slice(
                  auth.user.role === "Admin" ? 0 : 1,
                  UserLinks.length
                ).map((user, index) => (
                  <UserLink key={index} id={user.id} link={user.link} />
                ))}
                <li
                  onClick={() => auth.logout()}
                  className="py-2 px-3 custom-transition main-text-hover"
                >
                  <FormattedMessage id="Logout" />
                </li>
              </ul>
            </div>

            <div className="user-notification px-0 position-relative cursor-pointer">
              <Link
                to={`${
                  auth.user.role === "Admin" ? "/Admin" : "/User"
                }/Notifications`}
              >
                <IoMdNotificationsOutline size="1.7rem" />
                <span
                  className={`position-absolute top--30 right-0 bg-danger px-1 font-14 rounded-circle text-white ${
                    state.notSeen <= 0 ? "d-none" : "d-block"
                  }`}
                >
                  {state.notSeen}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightHeader;

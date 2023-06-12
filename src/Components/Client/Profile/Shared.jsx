import { FormattedMessage } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineLock } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { ImCopy } from "react-icons/im";

export const UserLinks = [
  { link: "/Admin", id: "Dashboard", icon: <AiOutlineHome size="1.2rem" /> },
  {
    link: "/User/Bookmarks",
    id: "Favourites",
    icon: <AiOutlineHeart size="1.2rem" />,
  },
  {
    link: "/User/My-Property",
    id: "ListedProperty",
    icon: <ImCopy size="1.2rem" />,
  },
  {
    link: "/User/Appointments",
    id: "Appointments",
    icon: <BiTimeFive size="1.2rem" />,
  },
  {
    link: "/User/Notifications",
    id: "Notifications",
    icon: <IoMdNotificationsOutline size="1.2rem" />,
  },
  {
    link: "/User/Password",
    id: "ChangePassword",
    icon: <AiOutlineLock size="1.2rem" />,
  },
];

export const UserLink = ({ link, id, icon, auth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <li
      className={`border-radius-5 border-bottom p-2 custom-transition ${
        location.pathname === link
          ? "main-bg text-white"
          : "bg-light-grey-hover"
      } cursor-pointer ${
        (!!auth.user.googleId || !!auth.user.faceId) && id === "ChangePassword"
          ? "d-none"
          : "d-flex align-items-center"
      }`}
      onClick={() => navigate(link)}
    >
      {icon}
      <Link to={link} className="mx-2 mt-1 font-16">
        <FormattedMessage id={id} />
      </Link>
    </li>
  );
};

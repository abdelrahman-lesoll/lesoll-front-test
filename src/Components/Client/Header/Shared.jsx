import { useContext } from "react";
import { ShowContext } from "../../../App";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";

export const Links = ["Home", "About", "Contact", "Q_A", "Blogs"];

export const UserLinks = [
  { link: "Admin", id: "Dashboard" },
  { link: "/User/Profile", id: "Profile" },
  { link: "/User/Bookmarks", id: "Favourites" },
  { link: "/User/My-Property", id: "ListedProperty" },
  { link: "/User/Appointments", id: "Appointments" },
  { link: "/Compare-Property", id: "Compared" },
];

export const HLink = ({ id }) => {
  return (
    <li className="pt-4 px-3 custom-transition main-text-hover">
      <Link to={id === "Home" ? "/" : `/${id}`}>
        <FormattedMessage {...{ id }} />
      </Link>
    </li>
  );
};

export const RespLink = ({ id, ...rest }) => {
  return (
    <div className="py-2 px-3 border-bottom border-secondary" {...rest}>
      <Link to={null} className="fw-bold">
        <FormattedMessage {...{ id }} />
      </Link>
    </div>
  );
};

export const UserLink = ({ link, id }) => {
  const navigate = useNavigate();
  const Context = useContext(ShowContext);
  return (
    <li
      onClick={() =>
        link === "/User/Profile"
          ? Context?.dispatch({ type: "modalUpdate" })
          : navigate(link)
      }
      className="py-2 px-3 border-bottom custom-transition main-text-hover"
    >
      <FormattedMessage {...{ id }} />
    </li>
  );
};

export const LangSelect = ({ Language }) => {
  return (
    <span
      className="cursor-pointer"
      onClick={() =>
        Language?.selectLang(Language?.locale === "en-US" ? "ar-EG" : "en-US")
      }
    >
      <img
        src={`/I18n/${
          Language?.locale !== "en-US" ? "English.svg" : "Arabic.png"
        }`}
        className="mw-100"
        height="20"
        width="20"
        alt=""
      />
      <span className="mx-1">
        {Language?.locale !== "en-US" ? "English" : "عربى"}
      </span>
    </span>
  );
};

import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { FormattedMessage } from "react-intl";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { LangSelect, Links, RespLink } from "./Shared";
import { Offcanvas } from "react-bootstrap";

const Responsive = ({ Context, auth }) => {
  const Language = useContext(LangContext);
  const navigate = useNavigate();
  const navTo = (link) => {
    navigate(link);
    Context?.dispatch({ type: "modalOffcanvas" });
  };
  return (
    <Offcanvas
      show={Context?.state?.modalOffcanvas}
      onHide={() => Context?.dispatch({ type: "modalOffcanvas" })}
      className="bg-dark-grey text-white w-75"
      placement={Language?.locale === "ar-EG" ? "end" : "start"}
    >
      <div className="px-3 title my-2 border-bottom border-secondary d-flex align-items-center justify-content-between">
        <h4 className="fw-bold">
          <FormattedMessage id="Menu" />
        </h4>
        <AiOutlineClose
          className="cursor-pointer"
          size="1.5rem"
          onClick={() => Context?.dispatch({ type: "modalOffcanvas" })}
        />
      </div>
      {Links.map((link, index) => (
        <RespLink
          key={index}
          id={link}
          onClick={() => navTo(!index ? "/" : link)}
        />
      ))}
      <div className="py-2 px-3 border-bottom border-secondary">
        <LangSelect Language={Language} />
      </div>
      <div
        className="py-2 px-3 border-bottom border-secondary"
        onClick={() => {
          navigate("/Submit-Property");
          Context?.dispatch({ type: "modalOffcanvas" });
        }}
      >
        <Link to="/Submit-Property" className="fw-bold">
          <FormattedMessage id="AddProperty" />
        </Link>
      </div>
      {auth.user && auth.user.role === "Admin" && (
        <div
          className="py-2 px-3 border-bottom border-secondary"
          onClick={() => {
            navigate("/Admin");
            Context?.dispatch({ type: "modalOffcanvas" });
          }}
        >
          <Link to="/Admin" className="fw-bold">
            <FormattedMessage id="Dashboard" />
          </Link>
        </div>
      )}
      {auth.user && (
        <div>
          <div
            className="py-2 px-3 border-bottom border-secondary"
            onClick={() => {
              navigate("/User/Bookmarks");
              Context?.dispatch({ type: "modalOffcanvas" });
            }}
          >
            <Link to="/User/Bookmarks" className="fw-bold">
              <FormattedMessage id="Favourites" />
            </Link>
          </div>
          <div
            className="py-2 px-3 border-bottom border-secondary"
            onClick={() => {
              navigate("/User/My-Property");
              Context?.dispatch({ type: "modalOffcanvas" });
            }}
          >
            <Link to="/User/My-Property" className="fw-bold">
              <FormattedMessage id="ListedProperty" />
            </Link>
          </div>
          <div
            className="py-2 px-3 border-bottom border-secondary"
            onClick={() => {
              navigate("/User/Appointments");
              Context?.dispatch({ type: "modalOffcanvas" });
            }}
          >
            <Link to="/User/Appointments" className="fw-bold">
              <FormattedMessage id="Appointments" />
            </Link>
          </div>

          <div
            className="py-2 px-3 border-bottom border-secondary"
            onClick={() => {
              navigate("Compare-Property");
              Context?.dispatch({ type: "modalOffcanvas" });
            }}
          >
            <Link to="Compare-Property" className="fw-bold">
              <FormattedMessage id="Compared" />
            </Link>
          </div>
          <div
            className="py-2 px-3 border-bottom border-secondary"
            onClick={() => Context?.dispatch({ type: "modalOffcanvas" })}
          >
            <span
              onClick={() => auth.logout()}
              className="fw-bold cursor-pointer"
            >
              <FormattedMessage id="Logout" />
            </span>
          </div>
        </div>
      )}
    </Offcanvas>
  );
};

export default Responsive;

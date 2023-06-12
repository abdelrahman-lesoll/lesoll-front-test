import { useReducer } from "react";
import { Offcanvas } from "react-bootstrap";
import {
  AiOutlineExclamationCircle,
  AiOutlineHome,
  AiOutlinePropertySafety,
  AiOutlineQuestionCircle,
  AiOutlineUser,
  AiOutlineFileWord,
} from "react-icons/ai";
import { HiOutlinePhone, HiOutlineSupport } from "react-icons/hi";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { initialState, reducer } from "../../../Reducers/AdminSideReducer";
import { BsDot } from "react-icons/bs";
import { GiModernCity } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ Context, locale }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  return (
    <Offcanvas
      show={Context.state.modalAdminOffcanvas}
      onHide={() => Context.dispatch({ type: "modalAdminOffcanvas" })}
      placement={locale === "en-US" ? "start" : "end"}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <ul className="list-group border-radius-0 px-0">
          <li
            className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0"
            onClick={() => Context.dispatch({ type: "modalAdminOffcanvas" })}
          >
            <Link className="d-flex align-items-center" to="/Admin">
              <AiOutlineHome size="1rem" />
              <span className="mt-1 mx-1">Dashboard</span>
            </Link>
          </li>
          <li
            className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0"
            onClick={() => {
              navigate("/Admin/Contacts");
              Context.dispatch({ type: "modalAdminOffcanvas" });
            }}
          >
            <Link className="d-flex align-items-center" to="/Admin/Contacts">
              <HiOutlinePhone size="1rem" />
              <span className="mt-1 mx-1">Contacts</span>
            </Link>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "country" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <AiOutlineFileWord size="1rem" />
                  <span className="mt-1 mx-1">Countries</span>
                </div>
                {!state.isCountry ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isCountry && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/All-Countries");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/All-Countries">
                      <BsDot /> All Countries
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-Country");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-Country">
                      <BsDot /> Add New Country
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>

          <li
            className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0"
            onClick={() => {
              navigate("/Admin/Regions");
              Context.dispatch({ type: "modalAdminOffcanvas" });
            }}
          >
            <Link className="d-flex align-items-center" to="/Admin/Regions">
              <GoLocation size="1rem" />
              <span className="mt-1 mx-1">Regions</span>
            </Link>
          </li>

          <li
            className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0"
            onClick={() => {
              navigate("/Admin/Governrates");
              Context.dispatch({ type: "modalAdminOffcanvas" });
            }}
          >
            <Link className="d-flex align-items-center" to="/Admin/Governrates">
              <GiModernCity size="1rem" />
              <span className="mt-1 mx-1">Governrates</span>
            </Link>
          </li>

          <li
            className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0"
            onClick={() => {
              navigate("/Admin/All-Users");
              Context.dispatch({ type: "modalAdminOffcanvas" });
            }}
          >
            <Link className="d-flex align-items-center" to="/Admin/All-Users">
              <AiOutlineUser size="1rem" />
              <span className="mt-1 mx-1">Users</span>
            </Link>
          </li>

          <li
            className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0"
            onClick={() => {
              navigate("/Admin/Contacts");
              Context.dispatch({ type: "modalAdminOffcanvas" });
            }}
          >
            <Link className="d-flex align-items-center" to="/Admin/Contacts">
              <HiOutlinePhone size="1rem" />
              <span className="mt-1 mx-1">Contacts</span>
            </Link>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "blog" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <AiOutlineFileWord size="1rem" />
                  <span className="mt-1 mx-1">Blogs</span>
                </div>
                {!state.isBlog ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isBlog && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Blogs");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Blogs">
                      <BsDot /> All Blogs
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-Blog");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-Blog">
                      <BsDot /> Add New Blog
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "service" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <HiOutlineSupport size="1rem" />
                  <span className="mt-1 mx-1">Services</span>
                </div>
                {!state.isService ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isService && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Services");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Services">
                      <BsDot /> All Services
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-Service");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-Service">
                      <BsDot /> Add New Service
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "realty" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <MdOutlineRealEstateAgent size="1rem" />
                  <span className="mt-1 mx-1">Realties</span>
                </div>
                {!state.isRealty ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isRealty && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Realties");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Realties">
                      <BsDot /> All Realties
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Realties/Status/Pending");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Realties/Status/Pending">
                      <BsDot /> Pending Realties
                    </Link>
                  </li>

                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Realties/Status/Deleted");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Realties/Status/Deleted">
                      <BsDot /> Deleted Realties
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "faq" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <AiOutlineQuestionCircle size="1rem" />
                  <span className="mt-1 mx-1">FAQ</span>
                </div>
                {!state.isFAQ ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isFAQ && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/FAQS");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/FAQS">
                      <BsDot /> All FAQS
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-FAQ");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-FAQ">
                      <BsDot /> Add New
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "term" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <AiOutlineExclamationCircle size="1rem" />
                  <span className="mt-1 mx-1">Terms</span>
                </div>
                {!state.isTerm ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isTerm && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Terms");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Terms">
                      <BsDot /> All Terms
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-Term");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-Term">
                      <BsDot /> Add New
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>

          <li className="list-group-item cursor-pointer main-text-hover border-start-0 border-end-0">
            <div onClick={() => dispatch({ type: "property" })}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <AiOutlinePropertySafety size="1rem" />
                  <span className="mt-1 mx-1">Properties</span>
                </div>
                {!state.isProperty ? (
                  <BiChevronDown size="1.2rem" />
                ) : (
                  <BiChevronUp size="1.2rem" />
                )}
              </div>
              {state.isProperty && (
                <ol className="list-group px-0" type="i">
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Property-Headers");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Property-Headers">
                      <BsDot /> All Property Headers
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-Property-Header");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-Property-Header">
                      <BsDot /> Add Property Header
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Properties");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Properties">
                      <BsDot /> All Properties
                    </Link>
                  </li>
                  <li
                    className="list-group-item border-0 bg-light-grey-hover main-text-hover"
                    onClick={() => {
                      navigate("/Admin/Add-Property");
                      Context.dispatch({ type: "modalAdminOffcanvas" });
                    }}
                  >
                    <Link to="/Admin/Add-Property">
                      <BsDot /> Add Property
                    </Link>
                  </li>
                </ol>
              )}
            </div>
          </li>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;

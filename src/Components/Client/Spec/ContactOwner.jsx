import { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { ShowContext } from "../../../App";
import { AiOutlineUser } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import { FaHouseUser } from "react-icons/fa";
import { useAppointment } from "../../Hooks/useAppointment";
import Image from "../../Shared/Image";
import AddAppointment from "./AddAppointment";

const ContactOwner = ({ user, id, appointments, auth }) => {
  const Context = useContext(ShowContext);
  const { state } = useAppointment("is-exist", {
    realty: id,
    seller: user._id,
    buyer: auth.user?._id,
  });
  if (state.isExist) {
    return;
  } else
    return (
      <Fragment>
        <div className="bg-white box-shadow p-3 border-radius-5">
          <div className="title pb-2 mb-3 d-flex align-items-center border-bottom">
            <div className="user-image">
              <Image
                imageUrl={user.image}
                className="mw-100 rounded-circle"
                height={80}
                width={80}
                alt=""
              />
            </div>
            <div className="info mx-3">
              <h4 className="fw-bold text-icon">{user.fullname}</h4>
              {user.numRealty > 1 && (
                <h6 className="text-dark-grey fw-semibold d-flex align-items-center">
                  <FaHouseUser size="1.3rem" />
                  <div className="mx-2 text-decoration-underline">
                    <Link to={`/User/${user._id}`}>
                      <FormattedMessage id="ListAllRealties" />
                    </Link>
                  </div>
                </h6>
              )}
              <h6 className="text-success fw-semibold d-flex align-items-center">
                <BsWhatsapp size="1.2rem" />
                <div className="mx-2 text-decoration-underline">
                  <bdi>
                    {auth.user &&
                    auth.user.phone !== auth.user.googleId &&
                    auth.user.phone !== auth.user.faceId ? (
                      <a
                        href={`https://wa.me/${user.code + user.phone}?text=${
                          new Date().getHours() >= 12
                            ? "مساء الخير"
                            : "صباح الخير"
                        } مهتم أعرف تفاصيل أكتر عن عقارك اللى تم نشره على موقع ليسول \n ${
                          location.href
                        }`}
                        target="_blank"
                      >
                        {user.code + user.phone}
                      </a>
                    ) : (
                      user.code + user.phone.slice(0, 3) + "XXXXXXX"
                    )}
                  </bdi>
                </div>
              </h6>
            </div>
          </div>

          {!auth.user ||
          auth.user.phone === auth.user.googleId ||
          auth.user.phone === auth.user.faceId ? (
            <button
              onClick={() =>
                Context.dispatch({
                  type: !auth.user ? "modalLogin" : "modalUpdate",
                })
              }
              className="w-100 border-0 border-radius-5 p-2 outline-0 main-bg text-white"
            >
              <AiOutlineUser />
              <span className="mx-2">
                <FormattedMessage id={!auth.user ? "SignIn" : "EditProfile"} />
              </span>
            </button>
          ) : (
            <AddAppointment {...{ auth, appointments, owner: user }} />
          )}
        </div>

        <p className="my-2 bg-white text-danger border p-2 border-radius-5 text-center shadow">
          <img
            src="/Logo/header-title.jpg"
            className="mw-100"
            height="30"
            width="30"
            alt=""
          />
          <span>
            <FormattedMessage
              id={
                !auth.user
                  ? "SuggestLogin"
                  : auth.user.phone === auth.user.googleId ||
                    auth.user.phone === auth.user.faceId
                  ? "SuggestUpdate"
                  : "LesollDetailWarning"
              }
            />
          </span>
        </p>
      </Fragment>
    );
};

export default ContactOwner;

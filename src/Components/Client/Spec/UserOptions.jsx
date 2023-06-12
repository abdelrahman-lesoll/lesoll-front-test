import { useContext } from "react";
import { ShowContext } from "../../../App";
import { BiShareAlt } from "react-icons/bi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { useToggleOptions } from "../../Hooks/useUser";
import { AiOutlineExclamationCircle, AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart, AiFillExclamationCircle } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import ShareRealty from "../../Modals/ShareRealty";

const UserOptions = ({ users, id, auth }) => {
  const Context = useContext(ShowContext);
  const Option = useToggleOptions(auth, users);
  return (
    <div className="row">
      <div className="col-sm-6 mb-1">
        <button
          onClick={() =>
            !auth.user
              ? Context?.dispatch({ type: "modalLogin" })
              : Option.handleToggleOption({ id, key: "favourite" })
          }
          className="border-0 outline-0 py-2 bg-transparent"
        >
          <div className="d-flex align-items-center">
            {Option.fav ? (
              <AiFillHeart size="1.3rem" className="text-danger" />
            ) : (
              <AiOutlineHeart size="1.3rem" />
            )}
            <span className="mx-2">
              <FormattedMessage id="AddToFavourite" />
            </span>
          </div>
        </button>
      </div>

      <div className="col-sm-6 mb-1">
        <button
          className="border-0 outline-0 py-2 bg-transparent"
          onClick={() => Context.dispatch({ type: "modalShare" })}
        >
          <div className="d-flex align-items-center ">
            <BiShareAlt size="1.3rem" />{" "}
            <span className="mx-2">
              <FormattedMessage id="Share" />
            </span>
          </div>
        </button>
        <ShareRealty {...{ Context }} />
      </div>

      <div className="col-sm-6 mb-1">
        <button
          onClick={() =>
            !auth.user
              ? Context?.dispatch({ type: "modalLogin" })
              : Option.handleToggleOption({ id, key: "report" })
          }
          className="border-0 outline-0 py-2 bg-transparent"
        >
          <div className="d-flex align-items-center">
            {Option.report ? (
              <AiFillExclamationCircle size="1.3rem" className="text-danger" />
            ) : (
              <AiOutlineExclamationCircle size="1.3rem" />
            )}
            <span className="mx-2">
              <FormattedMessage id="Report" />
            </span>
          </div>
        </button>
      </div>

      <div className="col-sm-6">
        <button
          className="border-0 outline-0 py-2 bg-transparent"
          onClick={() =>
            !auth.user
              ? Context?.dispatch({ type: "modalLogin" })
              : Option.handleToggleOption({ id, key: "compare" })
          }
        >
          <div className="d-flex align-items-center">
            <MdOutlineCompareArrows
              size="1.3rem"
              className={Option.compare ? "text-danger" : "text-dark"}
            />{" "}
            <span className="mx-2">
              <FormattedMessage id="Compare" />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserOptions;

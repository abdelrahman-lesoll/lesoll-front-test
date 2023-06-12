import { BiSad } from "react-icons/bi";
import { FormattedMessage } from "react-intl";

const Loading = () => {
  return (
    <div className="spinner-border main-text" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export const FullLoading = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Loading />
    </div>
  );
};

export const HLoading = () => {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <Loading />
    </div>
  );
};

export const ButtonLoading = ({ width }) => {
  return (
    <button
      className={`btn main-bg text-white ${width || ""}`}
      type="button"
      disabled
    >
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <FormattedMessage id="Loading" />
    </button>
  );
};

export const Empty = ({ title }) => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-dark-grey">
      <BiSad size={"4rem"} />
      <h3>{title}</h3>
    </div>
  );
};

export default Loading;

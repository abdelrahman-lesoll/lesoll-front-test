import { useNavigate, useLocation } from "react-router-dom";
// import { FormattedMessage } from "react-intl";
import "./error.css";

const ErrorPage = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  return (
    <div className="container my-5 text-center">
      {/* <div className="img-container">
        <img
          src={`/Img/Error/${
            location.state?.statusCode === 500
              ? "Error_500.svg"
              : "Error404.svg"
          }`}
          className="w-100"
          height={300}
          width={300}
          alt=""
        />
      </div> */}
      <div className="img-container">
        <img
          // style={{ width: "400px" }}
          src={`/Img/Error/Error.jpg`}
          className="err-img"
          alt=""
        />
      </div>
      {/* <div className="error-content my-3">
        <h1 className="fw-bold">
          {location.state?.statusCode === 500 ? (
            <FormattedMessage id="ServerError" />
          ) : (
            <FormattedMessage id="PageNotFound" />
          )}
        </h1>
        <p className="text-muted font-22">
          {location.state?.statusCode === 500 ? (
            <FormattedMessage id="ServerDescription" />
          ) : (
            <FormattedMessage id="NotFoundDescription" />
          )}
        </p>
      </div>
      <button
        className="btn btn-primary px-4 py-2"
        onClick={() => navigate(-1)}
      >
        <FormattedMessage id="Back" />
      </button> */}
    </div>
  );
};

export const TextError = (props) => {
  return <div className="text-center text-danger my-1">{props.children}</div>;
};

export default ErrorPage;

import { useState, useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { AiFillCheckCircle, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import Confirmation, { DeleteReasons } from "../../Modals/Confirmation";
import { HLoading } from "../../Shared/Loading";
import { useRealty } from "../../Hooks/useRealty";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Image from "../../Shared/Image";

const MyProperty = () => {
  const [confStatus, setConfStatus] = useState(false);
  const [delReasons, setDelReasons] = useState(false);
  const [reason, setReason] = useState("تم البيع");
  const [delConfirmation, setDelConfirmation] = useState(false);
  const [realtyStatus, setRealtyStatus] = useState({
    id: null,
    user: null,
    status: null,
  });
  const { state, handleChangeStatus } = useRealty("my-property");
  const intl = useIntl();
  const { locale } = useContext(LangContext);
  return (
    <>
      <Helmet>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <div className="col-lg-9 ">
        <div className="title border-bottom">
          <h3 className="fw-semi-bold">
            <FormattedMessage id="ListedProperty" />
          </h3>
        </div>
        {state.loading ? (
          <HLoading />
        ) : state.myRealty.length === 0 ? (
          <Link to="/Submit-Property">
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-dark-grey">
              <img
                src="/Img/Extra/NoProperty.png"
                className="mw-100"
                height="100"
                width="100"
                alt=""
              />
              <h3 className="text-center lh-base">
                <FormattedMessage id="NoProperties" />
              </h3>
            </div>
          </Link>
        ) : (
          state.myRealty.map((realty) => {
            return (
              <div className="row py-3 border-bottom" key={realty._id}>
                <div className="col-md-3 align-self-center d-none d-xxl-block d-xl-block d-lg-block d-md-block">
                  <div className="img-container">
                    <Image
                      imageUrl={realty.album[0].image}
                      height="150"
                      className="mw-100 w-100 m-auto border-radius-5 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="col-md-7 col-9">
                  <Link
                    to={`/Detail/${
                      !realty.unitType
                        ? intl.formatMessage({ id: "Land" })
                        : locale === "en-US"
                        ? realty.unitType.title.en
                        : realty.unitType.title.ar
                    }/${intl.formatMessage({ id: realty.offer })}/${
                      Array.isArray(realty.governrate)
                        ? `${
                            locale === "en-US"
                              ? realty.governrate[0].title.en
                              : realty.governrate[0].title.ar
                          }${
                            realty.region[0]?.title.en
                              ? "-" + locale == "en-US"
                                ? realty.region[0]?.title?.en
                                : realty.region[0]?.title?.ar
                              : ""
                          }`
                        : `${
                            locale === "en-US"
                              ? realty.governrate.title.en
                              : realty.governrate.title.ar
                          }${
                            realty.region?.title?.en
                              ? "-" + locale === "en-US"
                                ? realty.region?.title?.en
                                : realty.region?.title?.ar
                              : ""
                          }`
                    }/${realty._id}`}
                  >
                    <h5 className="fw-semibold text-icon">{realty.title}</h5>
                  </Link>
                  <p
                    className="text-dark-grey text-truncate font-14 mb-0 my-1"
                    title={realty.address.name}
                  >
                    {realty.address.name}
                  </p>
                  <div className="my-2 d-flex align-items-center flex-wrap">
                    <span className="text-light-blue fw-semibold px-3 border-radius-5 font-14">
                      <FormattedNumber value={realty.price} />{" "}
                      <FormattedMessage id="LE" />{" "}
                      {realty.offer === "For Rent" &&
                        `/ ${intl.formatMessage({ id: realty.rentalPeriod })}`}
                    </span>
                    <span
                      className={`my-1 mx-1 ${
                        realty.status === "Confirmed"
                          ? "text-success"
                          : realty.status === "Pending"
                          ? "text-primary"
                          : "text-danger"
                      } fw-semibold px-3 border-radius-5 font-14 d-flex align-items-center`}
                    >
                      <AiFillCheckCircle className="mx-1" />{" "}
                      <span className="mt-1">
                        <FormattedMessage id={realty.status} />
                      </span>
                    </span>
                    {/* {realty.status === "Confirmed" && (
                      <>
                        <span
                          onClick={() => {
                            setConfStatus(true);
                            setRealtyStatus({
                              id: realty._id,
                              status: "Sold",
                              user: realty.user,
                            });
                          }}
                          className="cursor-pointer px-3 bg-danger text-white border-radius-5 font-14 my-1"
                        >
                          <FormattedMessage id="ChangeToSold" />
                        </span>
                      </>
                    )} */}
                  </div>
                </div>
                <div className="col-2">
                  {realty.status !== "Sold" && (
                    <div className="d-flex align-items-end flex-column justify-content-center h-100">
                      <Link
                        to={`/Detail/${
                          !realty.unitType
                            ? intl.formatMessage({ id: "Land" })
                            : locale === "en-US"
                            ? realty.unitType.title.en
                            : realty.unitType.title.ar
                        }/${intl.formatMessage({ id: realty.offer })}/${
                          Array.isArray(realty.governrate)
                            ? `${
                                locale === "en-US"
                                  ? realty.governrate[0].title.en
                                  : realty.governrate[0].title.ar
                              }${
                                realty.region[0]?.title.en
                                  ? "-" + locale == "en-US"
                                    ? realty.region[0]?.title?.en
                                    : realty.region[0]?.title?.ar
                                  : ""
                              }`
                            : `${
                                locale === "en-US"
                                  ? realty.governrate.title.en
                                  : realty.governrate.title.ar
                              }${
                                realty.region?.title?.en
                                  ? "-" + locale === "en-US"
                                    ? realty.region?.title?.en
                                    : realty.region?.title?.ar
                                  : ""
                              }`
                        }/${realty._id}`}
                      >
                        <AiOutlineEye
                          className="text-dark-grey mb-2 cursor-pointer"
                          size={"1.3rem"}
                          title="View"
                        />
                      </Link>
                      <Link to={`/Update-Property/${realty._id}`}>
                        <AiOutlineEdit
                          className="text-primary mb-2 cursor-pointer"
                          size={"1.3rem"}
                          title="Edit"
                        />
                      </Link>
                      <FiTrash
                        className="text-danger mb-2 cursor-pointer"
                        size={"1.2rem"}
                        title="Delete Realty"
                        onClick={() => {
                          setDelReasons(true);
                          setRealtyStatus({
                            id: realty._id,
                            status: "Deleted",
                            user: realty.user,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <DeleteReasons
          confirmation={delReasons}
          setConfirmation={setDelReasons}
          reason={reason}
          setReason={setReason}
          setDelConfirmation={setDelConfirmation}
        />
        <Confirmation
          confirmation={delConfirmation}
          setConfirmation={setDelConfirmation}
          messageBody={<FormattedMessage id="DeleteRealtyConfirmation" />}
          execute={() => {
            handleChangeStatus({ ...realtyStatus, reason });
            setReason("تم البيع");
          }}
        />
        <Confirmation
          confirmation={confStatus}
          setConfirmation={setConfStatus}
          messageBody={<FormattedMessage id="ChangeStatusConfirmation" />}
          execute={() => handleChangeStatus(realtyStatus)}
        />
      </div>
    </>
  );
};

export default MyProperty;

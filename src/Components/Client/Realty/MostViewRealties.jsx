import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { LangContext } from "../../../Languages/LanguageProvider";
import { MdOutlineAddLocation } from "react-icons/md";
import { AlbumSlider } from "../../Shared/Image";
import { useRealty } from "../../Hooks/useRealty";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { IoResizeSharp } from "react-icons/io5";
import { HLoading } from "../../Shared/Loading";
import BreadCrumb from "../../Shared/BreadCrumb";

const MostViewRealties = () => {
  const { state } = useRealty("most-view", false);
  const { locale } = useContext(LangContext);
  const intl = useIntl();

  return (
    <>
      <BreadCrumb title={<FormattedMessage id="MostViewRealty" />} />
      <div className="container-fluid my-5">
        <div className="row">
          {state.loading ? (
            <HLoading />
          ) : (
            state.mostView.map((realty, index) => (
              <div className="col-lg-4 col-sm-6 mb-3" key={index}>
                <div className="bg-white border border-radius-5">
                  <div className="img-container">
                    <AlbumSlider
                      album={realty.album}
                      createdAt={realty.createdAt}
                      id={realty._id}
                      views={realty.views}
                      className="mw-100 w-100 custom-transition"
                      height="250"
                    />
                  </div>
                  <div className="px-3 pt-2">
                    <div className="real-title d-flex align-items-center justify-content-between mb-1">
                      <span className="text-dark-grey fw-light font-14">
                        <FormattedMessage id={realty.offer} />
                      </span>
                      <h5 className="fw-bold text-light-blue mb-0">
                        <FormattedNumber value={realty.price} />
                        <FormattedMessage id="LE" />
                      </h5>
                    </div>
                    <Link
                      to={`/Detail/${
                        realty.unitType.length === 0
                          ? intl.formatMessage({ id: "Land" })
                          : locale === "en-US"
                          ? realty.unitType[0].title.en
                          : realty.unitType[0].title.ar
                      }/${intl.formatMessage({ id: realty.offer })}/${`${
                        locale === "en-US"
                          ? realty.governrate[0].title.en
                          : realty.governrate[0].title.ar
                      }${
                        realty.region.length !== 0
                          ? "-" + locale === "en-US"
                            ? realty.region[0].title.en
                            : realty.region[0].title.ar
                          : ""
                      }`}/${realty._id}`}
                    >
                      <h6
                        className="fw-normal text-icon text-truncate"
                        title={realty.title}
                      >
                        {realty.title}
                      </h6>
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between px-3 pb-2 border-bottom">
                    <div className="bed-room-detail">
                      <BiBed className="text-dark-grey" />
                      <span className="mx-1 font-14 text-dark-grey">
                        <FormattedNumber value={realty.rooms} />{" "}
                        <FormattedMessage id="Room" />
                      </span>
                    </div>
                    <div className="bed-room-detail">
                      <BiBath className="text-dark-grey" />
                      <span className="mx-1 font-14 text-dark-grey">
                        <FormattedNumber value={realty.bathRooms} />{" "}
                        <FormattedMessage id="Baths" />
                      </span>
                    </div>
                    <div className="bed-room-detail">
                      <IoResizeSharp className="text-dark-grey" />
                      <span className="mx-1 font-14 text-dark-grey">
                        <FormattedNumber value={realty.area} />{" "}
                        <FormattedMessage
                          id="M"
                          values={{
                            pow: "2",
                            sup: (word) => <sup>{word}</sup>,
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-2">
                    <div className="location-info text-dark d-flex align-items-center">
                      <MdOutlineAddLocation size="1.5rem" />
                      <span
                        className="me-1"
                        title={
                          realty.address.governrate +
                          " " +
                          realty.address.region
                        }
                      >
                        {(
                          realty.address.governrate +
                          " " +
                          realty.address.region
                        ).slice(0, 15)}
                        {realty.address.governrate.length +
                          realty.address.region.length >
                          15 && "..."}
                      </span>
                    </div>
                    <Link
                      to={`/Detail/${
                        realty.unitType.length === 0
                          ? intl.formatMessage({ id: "Land" })
                          : locale === "en-US"
                          ? realty.unitType[0].title.en
                          : realty.unitType[0].title.ar
                      }/${intl.formatMessage({ id: realty.offer })}/${`${
                        locale === "en-US"
                          ? realty.governrate[0].title.en
                          : realty.governrate[0].title.ar
                      }${
                        realty.region.length !== 0
                          ? "-" + locale === "en-US"
                            ? realty.region[0].title.en
                            : realty.region[0].title.ar
                          : ""
                      }`}/${realty._id}`}
                    >
                      <button className="main-bg text-white rounded-pill outline-0 border-0 px-3 py-1">
                        <FormattedMessage id="View" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
          {state.fetching && <HLoading />}
        </div>
      </div>
    </>
  );
};

export default MostViewRealties;

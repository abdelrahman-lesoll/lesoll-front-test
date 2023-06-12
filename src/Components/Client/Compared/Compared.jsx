import { useContext, useState } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { Helmet } from "react-helmet";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { settings, prevArrowRef, nextArrowRef } from "./SliderSettings";
import { Empty, HLoading } from "../../Shared/Loading";
import { AlbumSlider } from "../../Shared/Image";
import { useFind, useToggleOptions } from "../../Hooks/useUser";
import BreadCrumb from "../../Shared/BreadCrumb";
import Slider from "react-slick";
import FaceComparisons from "./FaceComparisons";
import Confirmation from "../../Modals/Confirmation";

const Compare = () => {
  const { locale } = useContext(LangContext);
  const { state, resort, dragStart, dragEnter } = useFind("compared");
  const { handleToggleOption } = useToggleOptions();
  const { formatMessage } = useIntl();
  const [confirmation, setConfirmation] = useState(false);
  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: "HelmetCompared" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Compared" />} />
      <div className="container my-5">
        {state.loading ? (
          <HLoading />
        ) : !state.compared.length ? (
          <Empty title={<FormattedMessage id="NoComparisons" />} />
        ) : (
          <div className="row">
            <FaceComparisons />
            <div
              className={`col-12 ${
                state.compared?.length === 1
                  ? "col-lg-3 "
                  : state.compared?.length === 2
                  ? "col-lg-6"
                  : "col-lg-9"
              }`}
            >
              <div>
                <div
                  className={`d-flex align-items-center justify-content-between position-relative ${
                    locale === "ar-EG" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="cursor-pointer">
                    <HiOutlineArrowNarrowLeft
                      size="1.3rem"
                      onClick={() => prevArrowRef.current?.click()}
                    />
                  </div>
                  <div className="cursor-pointer">
                    <HiOutlineArrowNarrowRight
                      size="1.3rem"
                      onClick={() => nextArrowRef.current?.click()}
                    />
                  </div>
                </div>
                <Slider {...settings(state.compared?.length)}>
                  {state.compared?.map((realty, index) => (
                    <div className="px-2" key={index}>
                      <div
                        draggable
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={() => resort(state.compared)}
                      >
                        <div className="img-container position-relative">
                          <AlbumSlider
                            album={realty.album}
                            className="mw-100 border-radius-5 w-100"
                            height="170"
                          />

                          <div className="position-absolute top-5 left-2 cursor-pointer">
                            <AiOutlineCloseSquare
                              size="1.5rem"
                              className="text-danger"
                              onClick={() => setConfirmation(true)}
                            />
                          </div>
                          <Confirmation
                            {...{ confirmation, setConfirmation }}
                            execute={() =>
                              handleToggleOption({
                                id: realty._id,
                                key: "compare",
                              })
                            }
                            messageBody={
                              <FormattedMessage id="ComparedConfirmation" />
                            }
                          />
                        </div>
                        <div className="cursor-move">
                          <h5
                            className="text-icon text-center text-truncate my-1"
                            title={realty?.title}
                          >
                            {realty?.title.slice(0, 20)}
                            {realty?.title.length > 20 && "..."}
                          </h5>
                          <h5 className="text-primary text-center my-1">
                            <span className="mx-1">
                              <FormattedMessage id={realty?.offer} />
                            </span>
                          </h5>
                          <div className="my-5">
                            <h5 className="bg-light-grey p-3 border-radius-5">
                              <div className="mx-3 d-flex align-items-center justify-content-center text-truncate">
                                {realty?.unitType
                                  ? locale === "en-US"
                                    ? realty?.unitType.title.en
                                    : realty?.unitType.title.ar
                                  : formatMessage({ id: "Land" })}
                              </div>
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="bg-light-grey text-center my-1 p-3 border-radius-5">
                              <FormattedNumber value={realty?.price} />
                              <span className="mx-1">
                                <FormattedMessage id="LE" />
                              </span>
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="bg-light-grey p-3 border-radius-5">
                              <div className="mx-3 text-center">
                                <FormattedNumber value={realty?.area} />
                                <span className="mx-1 w-50 text-truncate">
                                  <FormattedMessage
                                    id="M"
                                    values={{
                                      pow: "2",
                                      sup: (word) => <sup>{word}</sup>,
                                    }}
                                  />
                                </span>
                              </div>
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="bg-light-grey text-center my-1 p-3 border-radius-5">
                              {!!realty?.downPayment ? (
                                <>
                                  <FormattedNumber
                                    value={realty?.downPayment}
                                  />
                                  <span className="mx-1">
                                    <FormattedMessage id="LE" />
                                  </span>
                                </>
                              ) : (
                                "-"
                              )}
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="bg-light-grey text-center my-1 p-3 border-radius-5">
                              {!!realty?.installmentOption.period ? (
                                <>
                                  <FormattedNumber
                                    value={realty?.installmentOption.period}
                                  />
                                  <span className="mx-1">
                                    <FormattedMessage
                                      id={
                                        realty?.installmentOption.type ===
                                        "Monthly"
                                          ? "Month"
                                          : "Year"
                                      }
                                    />
                                  </span>
                                </>
                              ) : (
                                "-"
                              )}
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="bg-light-grey text-center my-1 p-3 border-radius-5">
                              {!!realty?.installmentOption.amount ? (
                                <>
                                  <FormattedNumber
                                    value={realty?.installmentOption.amount}
                                  />
                                  <span className="mx-1">
                                    <FormattedMessage id="LE" />
                                  </span>
                                </>
                              ) : (
                                "-"
                              )}
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="text-center bg-light-grey p-3 border-radius-5">
                              <FormattedNumber value={realty?.rooms} />
                              <span className="w-50 text-truncate mx-1 d-xxl-none d-xl-none d-lg-none">
                                <FormattedMessage id="Room" />
                              </span>
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="text-center bg-light-grey p-3 border-radius-5">
                              <FormattedNumber value={realty?.bathRooms} />{" "}
                              <span className="w-50 text-truncate mx-1 d-xxl-none d-xl-none d-lg-none">
                                <FormattedMessage id="BathRoom" />
                              </span>
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="text-center bg-light-grey p-3 border-radius-5">
                              {realty?.negotiable ? (
                                <AiFillCheckCircle
                                  size="1.5rem"
                                  className="text-success"
                                />
                              ) : (
                                <AiFillCloseCircle
                                  size="1.5rem"
                                  className="text-danger"
                                />
                              )}
                              <span className="w-50 text-truncate mx-1 mt-1 d-xxl-none d-xl-none d-lg-none">
                                <FormattedMessage id="Negotiable" />
                              </span>
                            </h5>
                          </div>
                          <div className="my-5">
                            <h5 className="text-center bg-light-grey p-3 border-radius-5">
                              {realty?.isFurnished ? (
                                <AiFillCheckCircle
                                  size="1.5rem"
                                  className="text-success"
                                />
                              ) : (
                                <AiFillCloseCircle
                                  size="1.5rem"
                                  className="text-danger"
                                />
                              )}
                              <span className="w-50 text-truncate mx-1 mt-1 d-xxl-none d-xl-none d-lg-none">
                                <FormattedMessage id="Furnished" />
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Compare;

import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { FormattedMessage, useIntl } from "react-intl";
import { IoLocationOutline } from "react-icons/io5";
import { Accordion } from "react-bootstrap";
import { useRealty } from "../../Hooks/useRealty";
import { Empty, FullLoading } from "../../Shared/Loading";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Album from "./Album";
import PropertyDetail from "./PropertyDetail";
import Service from "./Service";
import SpecMap from "./SpecMap";
import ContactOwner from "./ContactOwner";
import UserOptions from "./UserOptions";
import SubRelated from "./SubRelated";

const Detail = ({ auth }) => {
  const { locale } = useContext(LangContext);
  const { id } = useParams();
  const intl = useIntl();
  const {
    state: { loading, singleRealty, relatedRealties },
  } = useRealty("realty-id", id);
  if (loading) {
    return <FullLoading />;
  } else if (!singleRealty) {
    return (
      <div className="container vh-100">
        <Empty title={<FormattedMessage id="NoRealty" />} />
      </div>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>
            {intl.formatMessage({ id: "HelmetLesoll" }) +
              " | " +
              (singleRealty.unitType?.title[locale === "en-US" ? "en" : "ar"] ||
                "") +
              " " +
              intl.formatMessage({ id: singleRealty.offer }) +
              " | " +
              singleRealty.title}
          </title>
          <link rel="canonical" href={location.href} />
        </Helmet>

        <div className="custom-detail container-fluid my-5">
          <div className="row">
            <div
              className={`${
                !auth.user || auth.user._id !== singleRealty.user._id
                  ? "col-lg-8 "
                  : "m-auto col-md-10 "
              }`}
            >
              <Album
                album={singleRealty.album}
                offer={singleRealty.offer}
                createdAt={singleRealty.createdAt}
                price={singleRealty.price}
                area={singleRealty.area}
                views={singleRealty.users.views?.length}
              />

              <div className="title">
                <h6 className="fw-semibold text-dark-grey mb-3">
                  {singleRealty.unitType ? (
                    locale === "en-US" ? (
                      singleRealty.unitType.title.en
                    ) : (
                      singleRealty.unitType.title.ar
                    )
                  ) : (
                    <FormattedMessage id="Land" />
                  )}
                  {`  `}
                  {<FormattedMessage id={singleRealty.offer} />}
                  {` - `}
                  {locale === "en-US"
                    ? singleRealty.governrate.title.en
                    : singleRealty.governrate.title.ar}

                  {!!singleRealty.region
                    ? locale === "en-US"
                      ? ` - ${singleRealty.region?.title.en}`
                      : ` - ${singleRealty.region?.title.ar}`
                    : ""}
                </h6>
                <h3 className="fw-semibold text-icon mb-3">
                  {singleRealty.title}
                </h3>
                <p className="text-dark-grey d-flex align-items-center mb-0">
                  <IoLocationOutline className="text-icon" size="1.5rem" />
                  <span className="mx-1 mb-0 mt-1 text-truncate w-75 font-14">
                    <a
                      href={`https://maps.google.com/?q=${singleRealty.address.latitude},${singleRealty.address.longitude}`}
                      target="_blank"
                    >
                      {singleRealty.address.name}
                    </a>
                  </span>
                </p>
              </div>

              <PropertyDetail {...{ singleRealty, locale }} />

              <Accordion className="my-2">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="font-20">
                    <FormattedMessage id="Description" />
                  </Accordion.Header>
                  <Accordion.Body>
                    <textarea
                      rows="10"
                      className="font-15 text-dark-grey w-100 border-0 outline-0"
                      defaultValue={singleRealty.description}
                      readOnly
                    ></textarea>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {singleRealty.service.length > 0 && (
                <Service {...{ locale, singleRealty }} />
              )}

              <SpecMap {...{ singleRealty }} />
            </div>
            {(!auth.user || auth.user._id !== singleRealty.user._id) && (
              <div className="col-lg-4">
                <UserOptions users={singleRealty.users} {...{ id, auth }} />
                {singleRealty.user.phone !== singleRealty.user.googleId &&
                  singleRealty.user.phone !== singleRealty.user.faceId && (
                    <ContactOwner
                      user={singleRealty.user}
                      appointments={singleRealty.appointments}
                      {...{ auth, id }}
                    />
                  )}
              </div>
            )}
          </div>
        </div>
        {/* {relatedRealties.length !== 0 && (
          <SubRelated relatedRealties={relatedRealties} id={id} />
        )} */}
      </>
    );
  }
};

export default Detail;

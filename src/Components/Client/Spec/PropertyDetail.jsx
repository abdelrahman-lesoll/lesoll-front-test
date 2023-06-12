import { Accordion } from "react-bootstrap";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FormattedMessage, FormattedNumber } from "react-intl";

const PropertyDetail = ({ singleRealty, locale }) => {
  return (
    <Accordion className="my-2" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="font-20">
          <FormattedMessage id="PropertyDetails" />
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            {singleRealty.offer === "For Sale" && (
              <div className="col-12 mb-3">
                <span className="text-dark fw-bold">
                  {" "}
                  <bdi>
                    <FormattedMessage id="SaleOption" /> :
                  </bdi>{" "}
                </span>{" "}
                {singleRealty.saleOption.map((option, index) => (
                  <span className="text-muted" key={option}>
                    <bdi>
                      <FormattedMessage id={option} />
                      {index !== singleRealty.saleOption.length - 1 && " , "}
                    </bdi>
                  </span>
                ))}
              </div>
            )}
            {singleRealty.offer === "For Sale" &&
              singleRealty.saleOption.includes("Installment") && (
                <>
                  <div className="col-md-6 mb-3">
                    <span className="text-dark fw-bold">
                      <bdi>
                        <FormattedMessage id="DownPayment" /> :{" "}
                      </bdi>
                    </span>{" "}
                    <span className="text-muted">
                      <FormattedNumber value={singleRealty.downPayment} /> {` `}{" "}
                      <FormattedMessage id="LE" />
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <span className="text-dark fw-bold">
                      <bdi>
                        <FormattedMessage id="InstallmentOption" /> :{" "}
                      </bdi>
                    </span>{" "}
                    <span className="text-muted">
                      <FormattedMessage
                        id={singleRealty.installmentOption.type}
                      />
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <span className="text-dark fw-bold">
                      <bdi>
                        <FormattedMessage id="InstallmentPeriod" /> :{" "}
                      </bdi>
                    </span>{" "}
                    <span className="text-muted">
                      <FormattedNumber
                        value={singleRealty.installmentOption.period}
                      />
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <span className="text-dark fw-bold">
                      <bdi>
                        <FormattedMessage id="InstallmentAmount" /> :{" "}
                      </bdi>
                    </span>{" "}
                    <span className="text-muted">
                      <FormattedNumber
                        value={singleRealty.installmentOption.amount}
                      />{" "}
                      <FormattedMessage id="LE" />
                    </span>
                  </div>
                </>
              )}
            {singleRealty.offer === "For Rent" && (
              <>
                <div className="col-md-6 mb-3">
                  <span className="text-dark fw-bold">
                    <bdi>
                      <FormattedMessage id="RentalPeriod" /> :{" "}
                    </bdi>
                  </span>{" "}
                  <span className="text-muted">
                    <FormattedMessage id={singleRealty.rentalPeriod} />
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <span className="text-dark fw-bold">
                    <bdi>
                      <FormattedMessage id="Insurance" /> :{" "}
                    </bdi>
                  </span>{" "}
                  <span className="text-muted">
                    <FormattedNumber value={singleRealty.insurance} />{" "}
                    <FormattedMessage id="LE" />
                  </span>
                </div>
              </>
            )}
            <div className="col-md-6 mb-3">
              <span className="text-dark fw-bold">
                <bdi>
                  <FormattedMessage id="Governrate" /> :{" "}
                </bdi>
              </span>{" "}
              <span className="text-muted">
                {locale === "en-US"
                  ? singleRealty.governrate.title.en
                  : singleRealty.governrate.title.ar}
              </span>
            </div>
            {!!singleRealty.region && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="City" /> :{" "}
                  </bdi>
                </span>{" "}
                <span className="text-muted">
                  {locale === "en-US"
                    ? singleRealty.region.title.en
                    : singleRealty.region.title.ar}
                </span>
              </div>
            )}
            <div className="col-md-6 mb-3">
              <span className="text-dark fw-bold">
                <bdi>
                  <FormattedMessage id="PropertyType" /> :{" "}
                </bdi>{" "}
              </span>{" "}
              <span className="text-muted">
                <FormattedMessage id={singleRealty.propType} />
              </span>
            </div>
            {singleRealty.propType !== "Land" ? (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="UnitType" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  {locale === "en-US"
                    ? singleRealty.unitType.title.en
                    : singleRealty.unitType.title.ar}
                </span>
              </div>
            ) : (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="LandType" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  <FormattedMessage id={singleRealty.landType} />
                </span>
              </div>
            )}
            {!!singleRealty.commission && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="Commission" /> :{" "}
                  </bdi>
                </span>{" "}
                <span className="text-muted">
                  <FormattedNumber value={singleRealty.commission} />{" "}
                  <FormattedMessage id="LE" />
                </span>
              </div>
            )}
            <div className="col-md-6 mb-3">
              <span className="text-dark fw-bold">
                <bdi>
                  <FormattedMessage id="Price" /> :{" "}
                </bdi>{" "}
              </span>{" "}
              <span className="text-muted">
                <FormattedNumber value={singleRealty.price} />
                <FormattedMessage id="LE" />
              </span>
            </div>
            <div className="col-md-6 mb-3">
              <span className="text-dark fw-bold">
                <bdi>
                  <FormattedMessage id="Area" /> :{" "}
                </bdi>{" "}
              </span>{" "}
              <span className="text-muted">
                <FormattedNumber value={singleRealty.area} />
                <FormattedMessage
                  id="M"
                  values={{
                    pow: "2",
                    sup: (word) => <sup>{word}</sup>,
                  }}
                />
              </span>
            </div>
            {!!singleRealty.rooms && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="Rooms" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  <FormattedNumber value={singleRealty.rooms} />
                </span>
              </div>
            )}
            {!!singleRealty.bathRooms && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  {" "}
                  <bdi>
                    <FormattedMessage id="BathRooms" /> :{" "}
                  </bdi>
                </span>{" "}
                <span className="text-muted">
                  <FormattedNumber value={singleRealty.bathRooms} />
                </span>
              </div>
            )}
            {!!singleRealty.buildingYear && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="BuildingYear" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  {new Date(singleRealty.buildingYear).getFullYear()}
                </span>
              </div>
            )}
            {!!singleRealty.deliveryDate && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="DeliveryDate" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  {new Date(singleRealty.deliveryDate).getFullYear()}
                </span>
              </div>
            )}
            {!!singleRealty.level && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="Level" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  {singleRealty.level === "0" ? (
                    <FormattedMessage id="Ground" />
                  ) : (
                    <FormattedNumber value={singleRealty.level} />
                  )}
                </span>
              </div>
            )}
            <div className="col-md-6 mb-3">
              <span className="text-dark fw-bold">
                <bdi>
                  <FormattedMessage id="Negotiable" /> :{" "}
                </bdi>{" "}
              </span>{" "}
              <span className="text-muted">
                {singleRealty.negotiable ? (
                  <AiFillCheckCircle className="text-success" size={"1.5rem"} />
                ) : (
                  <AiFillCloseCircle size="1.5rem" className="text-danger" />
                )}
              </span>
            </div>
            {!singleRealty.landType && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="Furnished" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  {singleRealty.isFurnished ? (
                    <AiFillCheckCircle
                      className="text-success"
                      size={"1.5rem"}
                    />
                  ) : (
                    <AiFillCloseCircle size="1.5rem" className="text-danger" />
                  )}
                </span>
              </div>
            )}
            {!!singleRealty.finishingType && (
              <div className="col-md-6 mb-3">
                <span className="text-dark fw-bold">
                  <bdi>
                    <FormattedMessage id="FinishingOption" /> :{" "}
                  </bdi>{" "}
                </span>{" "}
                <span className="text-muted">
                  <FormattedMessage id={singleRealty.finishingType} />
                </span>
              </div>
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default PropertyDetail;

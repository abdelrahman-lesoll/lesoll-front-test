import { ErrorMessage, Field } from "formik";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { FormattedMessage, useIntl } from "react-intl";
import { useMapForProperty } from "../Hooks/useMap";
import { TextError } from "./ErrorPage";

const Location = ({ formik, fromUpdate }) => {
  useMapForProperty(formik, fromUpdate);
  const intl = useIntl();
  return (
    <div className="col-12 my-3">
      <div className="border-bottom mb-2">
        <h2>
          <FormattedMessage id="LocationInformation" />
        </h2>
      </div>
      <div id="map"></div>
      <button
        id="user-current-location"
        type="button"
        title="Click To Access Your Location"
        className="bg-white p-2 border-0 outline-0 shadow-sm m-2"
      >
        <BiCurrentLocation size="1.5rem" />
      </button>
      <div className="row">
        <div className="col-12 mb-2">
          <label className="fw-bold font-17 mb-1 cursor-pointer d-flex align-items-center">
            <span className="me-1 mt-1">
              <FormattedMessage id="LocationAddress" />
              <OverlayTrigger
                trigger={["click", "hover"]}
                placement="top"
                defaultShow
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Body>
                      <FormattedMessage id="RealtyGoogleLocation" />
                    </Popover.Body>
                  </Popover>
                }
              >
                <span className="mx-3">
                  <AiOutlineExclamationCircle />
                </span>
              </OverlayTrigger>
            </span>
          </label>
          <Field
            className="outline-0 border p-2 border-radius-5 w-100"
            id="autocomplete"
            name="address.name"
            placeholder={intl.formatMessage({ id: "LocationAddress" })}
          />
          <ErrorMessage name="address.name" component={TextError} />
        </div>
      </div>
    </div>
  );
};

export default Location;

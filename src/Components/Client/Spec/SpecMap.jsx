import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ConstantMap } from "../../Hooks/useMap";

const SpecMap = ({ singleRealty }) => {
  const [service, setService] = useState("Map");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const getDirections = () => {
    navigator?.geolocation.getCurrentPosition((pos) => {
      setLongitude(pos.coords.longitude);
      setLatitude(pos.coords.latitude);
    });
  };
  return (
    <div className="local-information-detail my-4">
      <div className="title">
        <h4 className="fw-semibold mb-3">
          <FormattedMessage id="LocationInformation" />
        </h4>
      </div>
      <button
        onClick={() => {
          setService("Map");
          setLongitude("");
          setLatitude("");
        }}
        className={`text-dark-grey outline-0 py-2 px-3 border-radius-5 map-btns-detail m-2 bg-transparent ${
          service === "Map" && "active"
        }`}
      >
        <FormattedMessage id="Map" />
      </button>
      <button
        onClick={() => {
          setService("Direction");
          getDirections();
        }}
        className={`text-dark-grey outline-0 py-2 px-3 border-radius-5 map-btns-detail m-2 bg-transparent ${
          service === "Direction" && "active"
        }`}
      >
        <FormattedMessage id="Direction" />
      </button>
      <button
        onClick={() => {
          setService("school");
          setLongitude("");
          setLatitude("");
        }}
        className={`text-dark-grey outline-0 py-2 px-3 border-radius-5 map-btns-detail m-2 bg-transparent ${
          service === "school" && "active"
        }`}
      >
        <FormattedMessage id="Schools" />
      </button>
      <button
        onClick={() => {
          setService("hospital");
          setLongitude("");
          setLatitude("");
        }}
        className={`text-dark-grey outline-0 py-2 px-3 border-radius-5 map-btns-detail m-2 bg-transparent ${
          service === "hospital" && "active"
        }`}
      >
        <FormattedMessage id="Hospitals" />
      </button>
      <button
        onClick={() => {
          setService("restaurant");
          setLongitude("");
          setLatitude("");
        }}
        className={`text-dark-grey outline-0 py-2 px-3 border-radius-5 map-btns-detail m-2 bg-transparent ${
          service === "restaurant" && "active"
        }`}
      >
        <FormattedMessage id="Restaurants" />
      </button>
      <ConstantMap
        addressLocation={singleRealty.address.name}
        lng={parseFloat(singleRealty.address.longitude)}
        lat={parseFloat(singleRealty.address.latitude)}
        longitude={longitude}
        latitude={latitude}
        service={service}
      />
    </div>
  );
};

export default SpecMap;

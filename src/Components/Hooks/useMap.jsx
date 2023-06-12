import { Fragment, useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { AiOutlineCar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import SingleRealty from "../Client/Realty/SingleRealty";

// add To Formik When Add Or Update !
const addToFormik = (results, formik) => {
  Object.entries(results[0]).map((info) => {
    if (info[0] === "address_components") {
      Object.values(info[1]).map((AddCompInfo) => {
        if (AddCompInfo.types.includes("administrative_area_level_2")) {
          formik.setFieldValue("address.region", AddCompInfo.long_name);
        }
        if (AddCompInfo.types.includes("administrative_area_level_1")) {
          formik.setFieldValue("address.governrate", AddCompInfo.long_name);
        }
      });
    }
    if (info[0] === "formatted_address") {
      formik.setFieldValue("address.name", info[1]);
    }
    if (info[0] === "place_id") {
      formik.setFieldValue("address.placeId", info[1]);
    }
    if (info[0] === "geometry") {
      formik.setFieldValue("address.longitude", info[1].location.lng());
      formik.setFieldValue("address.latitude", info[1].location.lat());
    }
  });
};

const setGeoCoderToCenter = (formik, map, geocoder, marker, location) => {
  geocoder
    .geocode({ location })
    .then(({ results }) => {
      addToFormik(results, formik);
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setPlace({
        placeId: results[0].place_id,
        location: results[0].geometry.location,
      });
      marker.setMap(map);
      document.getElementById("autocomplete").value =
        results[0].formatted_address;
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
};

// for add And Update Property
export const useMapForProperty = (formik, fromUpdate) => {
  useEffect(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: fromUpdate
          ? parseFloat(formik.values.address.latitude)
          : 30.064742,
        lng: fromUpdate
          ? parseFloat(formik.values.address.longitude)
          : 31.249509,
      },
      zoom: 15,
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
      mapId: "90c8ba4f2e738273",
    });
    const marker = new google.maps.Marker({
      map,
      position: {
        lat: fromUpdate
          ? parseFloat(formik.values.address.latitude)
          : 30.064742,
        lng: fromUpdate
          ? parseFloat(formik.values.address.longitude)
          : 31.249509,
      },
    });

    const locationButton = document.getElementById("user-current-location");
    const infoWindow = new google.maps.InfoWindow();
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);

    locationButton.onclick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            setGeoCoderToCenter(formik, map, geocoder, marker, map.center);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
    };

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    const geocoder = new google.maps.Geocoder();
    const input = document.getElementById("autocomplete");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.place_id) {
        return;
      }
      geocoder
        .geocode({ placeId: place.place_id })
        .then(({ results }) => {
          addToFormik(results, formik);
          map.setCenter(results[0].geometry.location);
          marker.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location,
          });
          marker.setVisible(true);
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
    });
    map.addListener("click", (e) => {
      setGeoCoderToCenter(formik, map, geocoder, marker, e.latLng);
    });
  }, []);
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
  scrollwheel: true,
  gestureHandling: "greedy",
  mapId: "90c8ba4f2e738273",
};

const mapOptions = {
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  mapIds: ["90c8ba4f2e738273"],
};

const center = { lat: 30.0967005, lng: 31.3052927 };
let Service;

export const ConstantMap = ({ lng, lat, service, longitude, latitude }) => {
  const { isLoaded } = useJsApiLoader(mapOptions);
  const center = { lng, lat };
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  let [openMarkers, setOpenMarkers] = useState([]);
  const [markersInfo, setMarkersInfo] = useState([]);
  const [directionResponse, setDirectionResponse] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (service !== "Map") {
      let request = {
        location: { lng, lat },
        radius: "10000",
        type: [service],
      };
      Service = new google.maps.places.PlacesService(mapRef.current);
      Service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(
            results.map((result) => {
              return {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
              };
            })
          );
          setOpenMarkers(results.map(() => false));
          setMarkersInfo(
            results.map((result) => {
              return {
                image: result.photos ? result.photos[0].getUrl() : result.icon,
                name: result.name,
                rating: result.rating || 0,
              };
            })
          );
          mapRef.current.setZoom(14);
        }
      });
    } else {
      setMarkers([]);
      setMarkersInfo([]);
    }
  }, [service]);

  useEffect(() => {
    const calculateRoute = async () => {
      const directionService = new google.maps.DirectionsService();
      const result = await directionService.route({
        origin: new google.maps.LatLng(String(lat), String(lng)),
        destination: new google.maps.LatLng(latitude, longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDistance(result.routes[0].legs[0].distance.value);
      setDuration(result.routes[0].legs[0].duration.value);
      setDirectionResponse(result);
    };
    if (longitude && latitude) {
      calculateRoute();
    } else {
      setDistance("");
      setDuration("");
      setDirectionResponse("");
    }
  }, [longitude, latitude]);

  if (isLoaded) {
    return (
      <>
        <GoogleMap
          options={options}
          center={center}
          zoom={7}
          mapContainerClassName="w-100"
          mapContainerStyle={{ height: "300px" }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {directionResponse && longitude && latitude ? (
            <DirectionsRenderer directions={directionResponse} />
          ) : (
            <Marker
              position={center}
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${lat},${lng}`,
                  "_blank"
                )
              }
            ></Marker>
          )}
          {markers.length > 0 &&
            service !== "Direction" &&
            markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  position={marker}
                  icon={{
                    url: `/Svg/${service}.svg`,
                  }}
                  onClick={() => {
                    openMarkers = openMarkers.map(() => false);
                    openMarkers[index] = true;
                    setOpenMarkers(openMarkers);
                  }}
                >
                  {openMarkers[index] && (
                    <InfoWindow>
                      <div className="d-flex justify-content-between p-2">
                        <img
                          src={markersInfo[index].image}
                          height="40"
                          width="60"
                          className="border-radius-5"
                        />
                        <div className="mx-1">
                          <h6>{markersInfo[index].name}</h6>
                          {markersInfo[index].rating
                            ? [
                                ...Array(Math.ceil(markersInfo[index].rating)),
                              ].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className="text-warning"
                                  size="0.9rem"
                                />
                              ))
                            : null}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
        </GoogleMap>
        {longitude && latitude && (
          <div className="mt-2 p-2 d-flex align-items-center flex-wrap">
            <div className="mx-3 mt-1 lesoll-distance">
              <AiOutlineCar className="text-dark-grey mx-1" size="1.2rem" />{" "}
              <span className="mt-1">
                {" "}
                <FormattedMessage id="Distance" /> :{" "}
                {distance ? (
                  <FormattedNumber value={Math.ceil(distance / 1000)} />
                ) : (
                  "--"
                )}{" "}
                <FormattedMessage id="KM" />
              </span>
            </div>
            <div className="mt-1">
              <BiTimeFive className="text-dark-grey mx-1" size="1.2rem" />{" "}
              <span className="mt-1">
                {" "}
                <FormattedMessage id="Duration" /> :{" "}
                {duration ? (
                  <FormattedNumber value={Math.ceil(duration / 3600)} />
                ) : (
                  "--"
                )}{" "}
                <FormattedMessage id="Hour" />
              </span>
            </div>
          </div>
        )}
      </>
    );
  }
};

export const MapSearch = ({ state, mapRef, bounce, setBounce }) => {
  const { isLoaded } = useJsApiLoader(mapOptions);
  if (isLoaded && !state.loading) {
    return (
      <GoogleMap
        options={options}
        center={center}
        zoom={9}
        mapContainerClassName="w-100 h-100"
        onLoad={(map) => (mapRef.current = map)}
      >
        {state.searchRealty.map((realty, index) => (
          <Fragment key={index}>
            <Marker
              position={{
                lat: parseFloat(realty.address.latitude),
                lng: parseFloat(realty.address.longitude),
              }}
              onClick={() => {
                bounce = bounce.map((_) => 2);
                bounce[index] = 1;
                setBounce(bounce);
                mapRef.current.panTo({
                  lat: parseFloat(realty.address.latitude),
                  lng: parseFloat(realty.address.longitude),
                });
              }}
              animation={bounce[index]}
            >
              {bounce[index] === 1 ? (
                <InfoWindow
                  onCloseClick={() => {
                    bounce = bounce.map((_) => 2);
                    setBounce(bounce);
                  }}
                >
                  <SingleRealty realty={realty} />
                </InfoWindow>
              ) : null}
            </Marker>
          </Fragment>
        ))}
      </GoogleMap>
    );
  }
};

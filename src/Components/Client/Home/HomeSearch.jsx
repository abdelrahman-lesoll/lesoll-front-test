import { FormattedMessage, useIntl } from "react-intl";
import { IoLocationOutline } from "react-icons/io5";
import { useState, useContext, useReducer, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HomeSearchOptions, HomeCheck } from "../../../Constants/HomeConstants";
import { LangContext } from "../../../Languages/LanguageProvider";
import { initialState, reducer } from "../../../Reducers/SearchReducer";
import { useDispatch } from "react-redux";
import { resetSearchRealty } from "../../../Api/Realty";
import { ShowContext } from "../../../App";

const HomeSearch = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { locale } = useContext(LangContext);
  const Context = useContext(ShowContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const intl = useIntl();
  const navigate = useNavigate();
  const dis = useDispatch();

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        let isModalOpen = false;
        for (let i in Context.state) {
          if (Context.state[i]) {
            isModalOpen = true;
          }
        }
        if (!isModalOpen) {
          navigate(
            `/Search?offer=${state.offer}&location=${state.location}&rooms=${state.rooms}&bathRooms=${state.bathRooms}&minPrice=${state.minPrice}&maxPrice=${state.maxPrice}&minArea=${state.minArea}&maxArea=${state.maxArea}&sortType=${state.sortType}`
          );
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [state, Context]);

  return (
    <div className="home-search row justify-content-center text-dark">
      <div className="col-sm-8 col-10 position-relative">
        <div className="bg-white shadow-sm border border-radius-5 px-3 py-1">
          <div className="row">
            <div className="col-lg-5 col-12">
              <div
                className={`h-100 d-flex align-items-center justify-content-between ${
                  locale === "en-US" ? "border-end" : "border-start"
                } custom-check-box py-3 flex-wrap`}
              >
                {HomeCheck.map((check, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id={check}
                      onClick={() => {
                        dis(resetSearchRealty());
                        dispatch({
                          type: "offer",
                          payload: !index ? "" : check,
                        });
                      }}
                      defaultChecked={!index}
                    />
                    <label
                      className="form-check-label cursor-pointer"
                      htmlFor={check}
                    >
                      <FormattedMessage id={check} />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="py-3">
                <div className="custom-search d-flex align-items-center">
                  <div className="d-flex align-items-center w-100">
                    <IoLocationOutline
                      size="1.5rem"
                      className="text-dark-grey mb-1"
                    />
                    <input
                      placeholder={intl.formatMessage({
                        id: "SearchRegionCity",
                      })}
                      className="border-0 outline-0 width-90 mx-1 border"
                      onChange={(e) => {
                        dis(resetSearchRealty());
                        dispatch({
                          type: "location",
                          payload: e.target.value,
                        });
                      }}
                    />
                    <FaSlidersH
                      size="1.5rem"
                      className="text-dark-grey cursor-pointer"
                      onClick={() => setIsOpened(!isOpened)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      navigate(
                        `/Search?offer=${state.offer}&location=${state.location}&rooms=${state.rooms}&bathRooms=${state.bathRooms}&minPrice=${state.minPrice}&maxPrice=${state.maxPrice}&minArea=${state.minArea}&maxArea=${state.maxArea}&sortType=${state.sortType}`
                      );
                    }}
                    className={`text-white-hover bg-orange text-white p-2 border-0 outline-0 border-radius-5 w-25 ${
                      locale === "en-US" ? "ms-3" : "me-3"
                    }`}
                  >
                    <FormattedMessage id="Search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`advanced-home-search position-absolute top-102 left-1 width-98 bg-white border border-radius-5 shadow p-4 ${
            isOpened ? "d-block" : "d-none"
          }`}
        >
          <div className="row pb-2">
            {HomeSearchOptions.map(({ id, type }) => (
              <SharedInput key={id} {...{ id, type, dispatch }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SharedInput = ({ id, type, dispatch }) => {
  const intl = useIntl();
  return (
    <div className="col-lg-4 col-sm-6 mb-2">
      <input
        type="number"
        placeholder={intl.formatMessage({ id })}
        className="outline-0 border p-3 border-radius-5 w-100"
        onChange={(e) => dispatch({ type, payload: e.target.value })}
      />
    </div>
  );
};

export default HomeSearch;

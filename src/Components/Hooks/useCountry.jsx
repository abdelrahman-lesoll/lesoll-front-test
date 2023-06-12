import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCountry,
  findAdminCountries,
  findAllCountries,
  resetError,
} from "../../Api/Country";

export const useCountry = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddCountry = (values) => dispatch(addCountry(values));
  const handleAdminCountry = (values) => dispatch(findAdminCountries(values));
  const state = useSelector((state) => state.country);

  useEffect(() => {
    if (key === "admin-countries") {
      dispatch(findAdminCountries(values));
    }
    // used in register component and Contact Us Component
    if (key === "user-countries") {
      dispatch(findAllCountries());
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Country", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, handleAddCountry, handleAdminCountry };
};

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findGovernrates,
  findGovernrate,
  updateGovernrate,
  resetError,
} from "../../Api/Governrate";

export const useFindGovernrates = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdateGovernrate = (values) => dispatch(updateGovernrate(values));
  const state = useSelector((state) => state.governrate);

  // Fetch Governrates
  useEffect(() => {
    if (key === "all-governrates") {
      dispatch(findGovernrates());
    } else if (key === "single-governrate") {
      dispatch(findGovernrate(values));
    } else if (key === "sub-governrate") {
      dispatch(findGovernrates(1));
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Find-Governrates", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, handleUpdateGovernrate };
};

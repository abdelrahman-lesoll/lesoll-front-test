import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findTerms, resetError } from "../../Api/Terms";

export const useFindTerms = (key) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.term);

  // Dispatch Terms
  useEffect(() => {
    if (key === "all-terms") {
      dispatch(findTerms());
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Find-Terms", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state };
};

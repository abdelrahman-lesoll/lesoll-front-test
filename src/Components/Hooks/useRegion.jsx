import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findAllRegions,
  findRegion,
  updateRegion,
  findRegionByGovernrateTitle,
  resetError,
} from "../../Api/Region";

export const useFindRegions = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdateRegion = (values) => dispatch(updateRegion(values));
  const state = useSelector((state) => state.region);

  // Fetch All Regions
  useEffect(() => {
    if (key === "all-regions") {
      dispatch(findAllRegions());
    } else if (key === "spec-region") {
      dispatch(findRegion(values));
    } else {
      return;
    }
  }, [key]);

  useEffect(() => {
    if (key === "region-by-governrate") {
      // here iam passing title
      dispatch(findRegionByGovernrateTitle(values));
    }
  }, [key, values]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Regions", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, handleUpdateRegion };
};

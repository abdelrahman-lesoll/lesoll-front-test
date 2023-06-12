import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findServices,
  addService,
  findService,
  updateService,
  deleteService,
  resetError,
} from "../../Api/Service";

export const useFindServices = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddService = (values) => dispatch(addService(values));
  const handleUpdateService = (values) => dispatch(updateService(values));
  const handleDeleteService = (values) => dispatch(deleteService(values));
  const state = useSelector((state) => state.service);

  // Fetch All Services
  useEffect(() => {
    if (key === "all-services") {
      dispatch(findServices());
    } else if (key === "single-service") {
      dispatch(findService(values));
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Services", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, handleAddService, handleUpdateService, handleDeleteService };
};

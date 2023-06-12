import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAppointment,
  checkIfExist,
  deleteAppointment,
  findUserAppointments,
  findAllAppointments,
  resetError,
  addToCalendar,
} from "../../Api/Appointment";

export const useAppointment = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.appointment);
  const handleAddAppointment = (values) => dispatch(addAppointment(values));
  const handleAddToCalendar = (values) => dispatch(addToCalendar(values));
  const handleDelAppointment = (values) => dispatch(deleteAppointment(values));

  useEffect(() => {
    if (key === "all-appointments") {
      dispatch(findAllAppointments());
    } else if (key === "is-exist") {
      const { realty, seller, buyer } = values;
      // required for auth
      if (!!realty && !!seller && !!buyer) {
        dispatch(checkIfExist({ realty, seller, buyer }));
      }
    } else if (key === "my-appointments") {
      dispatch(findUserAppointments());
    } else {
      return;
    }
  }, [key]);

  useEffect(() => {
    if (state.error) {
      navigate("/Error-Appointment", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return {
    handleAddAppointment,
    handleDelAppointment,
    handleAddToCalendar,
    state,
  };
};

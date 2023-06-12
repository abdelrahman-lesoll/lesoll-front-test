import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findWithPropType, resetError } from "../../Api/Property";

export const useFindWithPropType = (formik, fromUpdate) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.property);

  // Dispatch Terms
  useEffect(() => {
    dispatch(findWithPropType(formik.values.propType));
  }, [formik.values.propType]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Find-Property", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  const defaultUnitType =
    fromUpdate &&
    formik.values.propType !== "Land" &&
    formik.values.propType === formik.values.oldPropType &&
    state.propWithHeader.length > 0 &&
    state.propWithHeader
      .map((header) =>
        header.property.filter(
          (property) => property._id === formik.values.unitType
        )
      )
      .filter((res) => res.length !== 0)[0][0];

  return { state, defaultUnitType };
};

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleRealtyOption,
  findFavourites,
  updatePassword,
  comparedRealties,
  resortCompared,
  findAllUsers,
  resetError,
  verifyToken,
  findBetweenTwoDates,
} from "../../Api/User";

export const useToggleOptions = (auth, users) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fav, setFav] = useState(
    auth?.user && users?.favourites.includes(auth.user._id)
  );
  const [report, setReport] = useState(
    auth?.user && users?.reports.includes(auth.user._id)
  );
  const [compare, setCompare] = useState(
    auth?.user && users?.compared.includes(auth.user._id)
  );
  const state = useSelector((state) => state.user);
  const handleToggleOption = (values) => {
    dispatch(toggleRealtyOption(values));
    if (values.key === "favourite") setFav(!fav);
    if (values.key === "report") setReport(!report);
    if (values.key === "compare") setCompare(!compare);
  };
  const handleUpdatePassword = (values) => dispatch(updatePassword(values));

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Invalid", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return {
    fav,
    report,
    compare,
    handleToggleOption,
    handleUpdatePassword,
  };
};

export const useFind = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dragOverItem = useRef();
  const dragItem = useRef();
  const state = useSelector((state) => state.user);
  const handleFindBetweenTwoDates = (values) =>
    dispatch(findBetweenTwoDates(values));
  const handleFindAllUsers = (values) => dispatch(findAllUsers(values));
  const dragStart = (_, position) => {
    dragItem.current = position;
  };

  const dragEnter = (_, position) => {
    dragOverItem.current = position;
  };

  const resort = () => {
    const copyListItems = [...state.compared];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    dispatch(resortCompared(copyListItems));
  };

  useEffect(() => {
    if (key === "all-users") {
      dispatch(findAllUsers({ page: 1 }));
    } else if (key === "favourites") {
      dispatch(findFavourites());
    } else if (key === "compared") {
      dispatch(comparedRealties());
    } else if (key === "reset-password") {
      dispatch(verifyToken(values));
    } else if (key === "user-between-two-dates") {
      dispatch(findBetweenTwoDates(values));
    } else {
      return;
    }
  }, [key]);

  useEffect(() => {
    if (state.error) {
      navigate("/Error-Invalid", { state: { statusCode: 500 } });
    }
  }, [state]);

  return {
    state,
    resort,
    dragStart,
    dragEnter,
    handleFindBetweenTwoDates,
    handleFindAllUsers,
  };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findNotifications,
  markAsRead,
  notSeenNotifications,
  resetError,
  resetNotifications,
  markAllAsRead,
  deleteAllNotifications,
} from "../../Api/Notification";

export const useNotifications = (key, auth) => {
  const state = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const handleMarkAsRead = (values) => dispatch(markAsRead(values));
  const handleMarkAllAsRead = () => dispatch(markAllAsRead());
  const handleDeleteAllNotifications = () => dispatch(deleteAllNotifications());
  const navigate = useNavigate();
  useEffect(() => {
    if (key === "all-notifications") {
      dispatch(findNotifications(0));
    } else if (key === "not-seen" && !!auth.user) {
      dispatch(notSeenNotifications());
    } else {
      return;
    }
  }, [key]);

  useEffect(() => {
    if (key === "all-notifications") {
      let currentPage = 0;
      const onScroll = () => {
        if (parseInt(window.pageYOffset % 1000) >= 0) {
          let page = parseInt(window.pageYOffset / 1000);
          if (currentPage < page) {
            currentPage = page;
            dispatch(findNotifications(currentPage));
          }
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => {
        dispatch(resetNotifications());
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [key]);

  useEffect(() => {
    if (state.error) {
      navigate("/Error-Invalid", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return {
    state,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteAllNotifications,
  };
};

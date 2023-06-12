import { Link } from "react-router-dom";
import { BsCheck2All } from "react-icons/bs";
import { FullLoading, HLoading } from "../../Shared/Loading";
import { useNotifications } from "../../Hooks/useNotifiation";
import { FormattedMessage } from "react-intl";
import { useContext, useState } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import Confirmation from "../../Modals/Confirmation";

const Notification = () => {
  const {
    state,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteAllNotifications,
  } = useNotifications("all-notifications");
  const [delConfirmation, setDelConfirmation] = useState(false);
  const { locale } = useContext(LangContext);
  return (
    <div className="p-5 admin-notification">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <div className="left">
          <h4 className="mb-1">
            <FormattedMessage id="Notifications" />
          </h4>
        </div>
        <div className="right">
          <button
            className="btn btn-secondary mx-2 mb-1"
            onClick={() => handleMarkAllAsRead()}
            disabled={state.notifications.length === 0}
          >
            <FormattedMessage id="MarkAllNotificationBtn" />
          </button>
          <button
            className="btn btn-danger mb-1"
            onClick={() => setDelConfirmation(true)}
            disabled={state.notifications.length === 0}
          >
            <FormattedMessage id="DelAllNotificationBtn" />
          </button>
          <Confirmation
            confirmation={delConfirmation}
            setConfirmation={setDelConfirmation}
            messageBody={<FormattedMessage id="DelNotificationConfirmation" />}
            execute={() => handleDeleteAllNotifications()}
          />
        </div>
      </div>
      {state.loading ? (
        <FullLoading />
      ) : (
        <div className="border border-radius-5 my-3">
          {state.notifications.map((notification) => (
            <div
              key={notification._id}
              className={`cursor-pointer px-3 bg-light-grey-hover notification border-bottom py-3 d-flex align-items-center justify-content-between ${
                !notification.isVisited && "bg-light-grey"
              }`}
              onClick={() => handleMarkAsRead({ id: notification._id })}
            >
              <Link to={`${notification.link}`}>
                <div className="title">
                  <p className="mb-1 font-15">
                    {notification.title[locale === "en-US" ? "en" : "ar"]}
                  </p>
                  <span className="text-muted font-14">
                    {new Date(notification.createdAt).toDateString()}
                    {` , `}
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </Link>
              <div className="user-views">
                <BsCheck2All
                  size="1.2rem"
                  className={
                    notification.isVisited ? "text-success" : "text-light-grey"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {state.fetching && <HLoading />}
    </div>
  );
};

export default Notification;

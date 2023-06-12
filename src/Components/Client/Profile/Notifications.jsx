import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { BsCheck2All } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import { useNotifications } from "../../Hooks/useNotifiation";
import { Empty, HLoading } from "../../Shared/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Notifications = () => {
  const { state, handleMarkAsRead } = useNotifications("all-notifications");
  const { locale } = useContext(LangContext);
  return (
    <>
      <Helmet>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <div className="col-lg-9 ">
        <div className="title border-bottom">
          <h3 className="fw-semi-bold">
            <FormattedMessage id="Notifications" />
          </h3>
        </div>
        <div className="notifications h-100 py-4">
          {state.loading ? (
            <HLoading />
          ) : state.notifications.length === 0 ? (
            <Empty title={<FormattedMessage id="NoNotification" />} />
          ) : (
            state.notifications.map((notification) => (
              <div
                key={notification._id}
                className="cursor-pointer notification border-bottom pb-3 mb-4 d-flex align-items-center justify-content-between"
                onClick={() =>
                  !notification.isVisited &&
                  handleMarkAsRead({ id: notification._id })
                }
              >
                <Link to={`${notification.link}`}>
                  <div className="title">
                    <p className="mb-1 font-15">
                      {locale === "en-US"
                        ? notification.title.en
                        : notification.title.ar}
                    </p>
                    <span className="text-muted font-14">
                      {new Date(notification.createdAt).toDateString()},
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </Link>
                <div className="user-views">
                  <BsCheck2All
                    size="1.2rem"
                    className={
                      notification.isVisited ? "text-success" : "text-dark-grey"
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;

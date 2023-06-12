import { BiShowAlt } from "react-icons/bi";
import { useAppointment } from "../../Hooks/useAppointment";
import { FormattedMessage, useIntl } from "react-intl";
import { Empty, HLoading } from "../../Shared/Loading";
import { Link } from "react-router-dom";
import AddToCalendar from "./AddToCalendar";
import DelFromCalendar from "./DelFromCalendar";
import DelAppointment from "./DelAppointment";

const Appointments = ({ auth }) => {
  const intl = useIntl();
  const { state } = useAppointment("my-appointments");
  return (
    <div className="col-lg-9 appointment-container">
      <div className="title border-bottom">
        <h3 className="fw-semi-bold">
          <FormattedMessage id="Appointments" />
        </h3>
      </div>
      <div className="py-4 h-100">
        {state.loading ? (
          <HLoading />
        ) : state.userAppointments.length === 0 ? (
          <Empty title={<FormattedMessage id="NoAppointments" />} />
        ) : (
          state.userAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border-bottom pb-3 mb-4 d-flex align-items-center justify-content-between flex-wrap"
            >
              <div className="title">
                <p className="mb-1 font-14">
                  <FormattedMessage id="AppCre" />
                  {auth.user._id === appointment.seller._id
                    ? appointment.buyer.fullname
                    : appointment.seller.fullname}
                </p>
                <span className="text-muted font-13">
                  <FormattedMessage id="Time" />{" "}
                  {new Date(appointment.time).toDateString()},
                  {new Date(appointment.time).toLocaleTimeString()}
                </span>
              </div>
              <div className="user-options">
                {((auth.user._id === appointment.seller._id &&
                  !appointment.calendar.seller) ||
                  (auth.user._id === appointment.buyer._id &&
                    !appointment.calendar.buyer)) && (
                  <AddToCalendar {...{ appointment, auth }} />
                )}

                {((auth.user._id === appointment.seller._id &&
                  appointment.calendar.seller) ||
                  (auth.user._id === appointment.buyer._id &&
                    appointment.calendar.buyer)) && (
                  <DelFromCalendar {...{ appointment, auth }} />
                )}

                <DelAppointment {...{ appointment }} />
                <div className="cursor-pointer font-14 bg-white text-muted text-white p-1 border-radius-5 d-flex align-items-center">
                  <Link to={`/Detail/${appointment.realty}`}>
                    <BiShowAlt
                      title={intl.formatMessage({ id: "View" })}
                      size="1.2rem"
                    />
                    <span className="mx-1">
                      <FormattedMessage id="ViewRealty" />{" "}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;

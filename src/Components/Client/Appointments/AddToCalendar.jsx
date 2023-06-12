import { Fragment, useState } from "react";
import { useAppointment } from "../../Hooks/useAppointment";
import { FormattedMessage, useIntl } from "react-intl";
import { AiOutlineCalendar } from "react-icons/ai";
import GoogleLogin from "react-google-login";
import Confirmation from "../../Modals/Confirmation";

const AddToCalendar = ({ appointment, auth }) => {
  const { handleAddToCalendar } = useAppointment();
  const [confAddCalendar, setConfAddCalendar] = useState(false);
  const intl = useIntl();
  return (
    <GoogleLogin
      render={(renderProps) => (
        <Fragment>
          <button
            onClick={() => setConfAddCalendar(true)}
            className="outline-0 border-0 my-1 cursor-pointer font-14 bg-white text-light-blue text-white p-1 border-radius-5 d-flex align-items-center"
          >
            <AiOutlineCalendar
              className="main-text"
              title={intl.formatMessage({
                id: "AddToCalendar",
              })}
              size="1.2rem"
            />{" "}
            <span className="mx-1">
              <FormattedMessage id="AddToCalendar" />
            </span>
          </button>
          <Confirmation
            confirmation={confAddCalendar}
            setConfirmation={setConfAddCalendar}
            messageBody={<FormattedMessage id="AddCalendarToGoogle" />}
            execute={renderProps.onClick}
          />
        </Fragment>
      )}
      clientId={import.meta.env.VITE_CLIENT_ID}
      onSuccess={(res) =>
        handleAddToCalendar({
          id: appointment._id,
          refreshToken: res.code,
          summary: `You Have Appointment With ${
            auth.user._id === appointment.seller._id
              ? appointment.buyer.fullname
              : appointment.seller.fullname
          }`,
          location: `https://lesoll.com/Detail/${appointment.realty}`,
          time: appointment.time,
          seller: appointment.seller._id,
          buyer: appointment.buyer._id,
        })
      }
      onFailure={(err) => console.log(err)}
      cookiePolicy="single_host_origin"
      responseType="code"
      accessType="offline"
      scope="openid email profile https://www.googleapis.com/auth/calendar"
    />
  );
};

export default AddToCalendar;

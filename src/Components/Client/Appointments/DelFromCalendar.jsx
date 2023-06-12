const DelFromCalendar = ({ appointment, auth }) => {
  const [confAddCalendar, setConfAddCalendar] = useState(false);
  const { mutateAsync } = deleteFromGoogleCalendar();
  return (
    <GoogleLogin
      render={(renderProps) => (
        <>
          <button className="outline-0 border-0 my-1 cursor-pointer bg-white text-light-blue text-white p-1 border-radius-5 d-flex align-items-center">
            <BsCalendarMinus
              className="text-danger"
              title="Remove From Google Calendar"
              size="1rem"
              onClick={() => setConfAddCalendar(true)}
            />
          </button>
          <Confirmation
            confirmation={confAddCalendar}
            setConfirmation={setConfAddCalendar}
            messageBody={<FormattedMessage id="DelCalendarFromGoogle" />}
            execute={renderProps.onClick}
          />
        </>
      )}
      clientId={import.meta.env.VITE_CLIENT_ID}
      onSuccess={(res) =>
        mutateAsync({
          id: appointment._id,
          refreshToken: res.code,
          seller: appointment.seller._id,
          buyer: appointment.buyer._id,
          eventId:
            appointment.seller._id === auth.user.userData._id
              ? appointment.calendar.sellerEventId
              : appointment.calendar.buyerEventId,
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

export default DelFromCalendar;

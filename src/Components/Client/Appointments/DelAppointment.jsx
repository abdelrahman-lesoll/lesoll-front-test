import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { FiTrash2 } from "react-icons/fi";
import { useAppointment } from "../../Hooks/useAppointment";
import Confirmation from "../../Modals/Confirmation";

const DelAppointment = ({ appointment }) => {
  const [confAddCalendar, setConfAddCalendar] = useState(false);
  const { handleDelAppointment } = useAppointment();
  return (
    <div className="cursor-pointer font-14 bg-white text-light-blue text-white p-1 border-radius-5 d-flex align-items-center">
      <div className="text-danger" onClick={() => setConfAddCalendar(true)}>
        <FiTrash2 title="Delete Appointment" size="1.2rem" />
        <span className="mx-1">
          <FormattedMessage id="DeleteAppointment" />
        </span>
      </div>
      <Confirmation
        confirmation={confAddCalendar}
        setConfirmation={setConfAddCalendar}
        messageBody={<FormattedMessage id="DelAppointment" />}
        execute={() =>
          handleDelAppointment({
            id: appointment._id,
            seller: appointment.seller._id,
            buyer: appointment.buyer._id,
            sellerEventId: appointment.calendar.sellerEventId,
            buyerEventId: appointment.calendar.buyerEventId,
          })
        }
      />
    </div>
  );
};
export default DelAppointment;

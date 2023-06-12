import { useMemo } from "react";
import { Columns } from "./Columns";
import { useAppointment } from "../../Hooks/useAppointment";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const Appointments = () => {
  const { state } = useAppointment("all-appointments");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.appointments, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "Appointments" }} />
      )}
    </div>
  );
};

export default Appointments;

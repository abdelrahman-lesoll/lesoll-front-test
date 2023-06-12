import { useMemo } from "react";
import { Columns } from "./Columns";
import { useRealty } from "../../Hooks/useRealty";
import { useParams } from "react-router-dom";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const RealtyStatus = () => {
  const { status } = useParams();
  const { state } = useRealty("realty-status", status);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.realtyStatus, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: `${status} Realties` }} />
      )}
    </div>
  );
};

export default RealtyStatus;

import { useMemo } from "react";
import { Columns } from "./Columns";
import { useFindServices } from "../../Hooks/useService";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const Services = () => {
  const { state } = useFindServices("all-services");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.services, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "Services" }} />
      )}
    </div>
  );
};

export default Services;

import { useMemo } from "react";
import { Columns } from "./Columns";
import { useFindGovernrates } from "../../Hooks/useGovernrate";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const AllGovernrates = () => {
  const { state } = useFindGovernrates("all-governrates");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.governrates, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "Governrates" }} />
      )}
    </div>
  );
};

export default AllGovernrates;

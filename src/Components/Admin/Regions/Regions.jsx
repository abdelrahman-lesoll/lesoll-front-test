import { useMemo } from "react";
import { Columns } from "./Columns";
import { useFindRegions } from "../../Hooks/useRegion";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const Regions = () => {
  const { state } = useFindRegions("all-regions");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.regions, [state]);
  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "Regions" }} />
      )}
    </div>
  );
};

export default Regions;

import { useMemo } from "react";
import { Columns } from "./Columns";
import { findAllProperties } from "../../../Api/Property";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const AllProperties = () => {
  const { data: Properties, isLoading } = findAllProperties();
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Properties, [Properties?.data.data]);

  return (
    <div className="p-5">
      {isLoading ? (
        <FullLoading />
      ) : (
        <Table
          {...{ data: data?.data.data, columns, title: "All Properties" }}
        />
      )}
    </div>
  );
};

export default AllProperties;

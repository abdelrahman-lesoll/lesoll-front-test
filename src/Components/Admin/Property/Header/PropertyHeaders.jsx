import { useMemo } from "react";
import { Columns } from "./Columns";
import { findAllPropHeaders } from "../../../../Api/Property";
import { FullLoading } from "../../../Shared/Loading";
import Table from "../../../Shared/Table";

const PropertyHeader = () => {
  const { data: Headers, isLoading } = findAllPropHeaders();
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Headers, [Headers?.data.data]);

  return (
    <div className="p-5">
      {isLoading ? (
        <FullLoading />
      ) : (
        <Table
          {...{ data: data?.data.data, columns, title: "Property Headers" }}
        />
      )}
    </div>
  );
};

export default PropertyHeader;

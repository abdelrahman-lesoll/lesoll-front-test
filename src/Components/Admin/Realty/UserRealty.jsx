import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Columns } from "./Columns";
import { findMyProperty } from "../../../Api/Realty";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const UserRealty = () => {
  const { user } = useParams();
  const { data: Realty, isLoading } = findMyProperty(user);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => Realty, [Realty?.data.data]);
  return (
    <div className="p-5">
      {isLoading ? (
        <FullLoading />
      ) : (
        <Table {...{ data: data?.data.data, columns, title: "User Realty" }} />
      )}
    </div>
  );
};

export default UserRealty;

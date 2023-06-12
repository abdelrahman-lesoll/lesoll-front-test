import { useMemo } from "react";
import { Columns } from "./Columns";
import { useFindContacts } from "../../Hooks/useContact";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const Contacts = () => {
  const { state } = useFindContacts("all-contacts");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.contacts, [state]);
  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "Contacts" }} />
      )}
    </div>
  );
};

export default Contacts;

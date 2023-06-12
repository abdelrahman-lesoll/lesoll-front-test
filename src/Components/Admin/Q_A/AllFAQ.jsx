import { useMemo } from "react";
import { Columns } from "./Columns";
import { useFindFaqs } from "../../Hooks/useFaq";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const AllFAQ = () => {
  const { state } = useFindFaqs("all-faqs");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.faqs, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "FAQS" }} />
      )}
    </div>
  );
};

export default AllFAQ;

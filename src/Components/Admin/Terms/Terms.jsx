import { useMemo } from "react";
import { Columns } from "./Columns";
import { useFindTerms } from "../../Hooks/useTerm";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const Terms = () => {
  const { state } = useFindTerms("all-terms");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.terms, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "Terms And Conditions" }} />
      )}
    </div>
  );
};

export default Terms;

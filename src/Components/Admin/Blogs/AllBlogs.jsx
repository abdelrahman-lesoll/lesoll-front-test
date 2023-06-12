import { useMemo } from "react";
import { Columns } from "./Columns";
import { useBlogs } from "../../Hooks/useBlog";
import { FullLoading } from "../../Shared/Loading";
import Table from "../../Shared/Table";

const AllBlogs = () => {
  const { state } = useBlogs("all-blogs");
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => state.blogs, [state]);

  return (
    <div className="p-5">
      {state.loading ? (
        <FullLoading />
      ) : (
        <Table {...{ data, columns, title: "All Blogs" }} />
      )}
    </div>
  );
};

export default AllBlogs;

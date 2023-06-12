import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { deleteTerm } from "../../../Api/Terms";

export const Columns = [
  {
    Header: "#",
    accessor: (_row, i) => i + 1,
  },
  {
    Header: "Title in English",
    accessor: "title.en",
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 25)} {value.length > 25 && "..."}
      </span>
    ),
  },
  {
    Header: "Title in Arabic",
    accessor: "title.ar",
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 25)} {value.length > 25 && "..."}
      </span>
    ),
  },
  {
    Header: "Date Created",
    accessor: "createdAt",
    Cell: ({ value }) => (
      <span className="text-icon">{new Date(value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Action",
    Cell: ({ row }) => <Action id={row.original._id} />,
  },
];

const Action = ({ id }) => {
  const { locale } = useContext(LangContext);
  // const { mutateAsync } = deleteTerm(id);
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Update-Term/${id}`}>
        <AiOutlineEdit
          size="1.3rem"
          className="mx-1 cursor-pointer text-muted"
        />
      </Link>
      <AiOutlineDelete
        size="1.3rem"
        className="mx-1 cursor-pointer text-danger"
        // onClick={() => mutateAsync()}
      />
    </div>
  );
};

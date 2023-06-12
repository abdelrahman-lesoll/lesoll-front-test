import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Columns = [
  {
    Header: "#",
    accessor: (_row, i) => i + 1,
  },
  {
    Header: "Question in English",
    accessor: "question.en",
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 30)}
        {value.length > 30 && "..."}
      </span>
    ),
  },
  {
    Header: "Qustion in Arabic ",
    accessor: "question.ar",
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 30)}
        {value.length > 30 && "..."}
      </span>
    ),
  },
  {
    Header: "Answers ",
    accessor: "answers.length",
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
    Cell: ({ row }) => <Action row={row} />,
  },
];

const Action = ({ row }) => {
  const { locale } = useContext(LangContext);
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Update-FAQ/${row.original._id}`}>
        <AiOutlineEdit
          size="1.3rem"
          className="mx-1 cursor-pointer text-muted"
        />
      </Link>
      <AiOutlineDelete
        size="1.3rem"
        className="mx-1 cursor-pointer text-danger"
      />
    </div>
  );
};

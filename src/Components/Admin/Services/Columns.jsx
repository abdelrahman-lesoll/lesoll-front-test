import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useFindServices } from "../../Hooks/useService";
import { Link } from "react-router-dom";

export const Columns = [
  {
    Header: "#",
    accessor: (_row, i) => i + 1,
  },
  {
    Header: "Title in English",
    accessor: "name.en",
  },
  {
    Header: "Title in Arabic",
    accessor: "name.ar",
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
  const { handleDeleteService } = useFindServices();
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Update-Service/${id}`}>
        <AiOutlineEdit
          size="1.3rem"
          className="mx-1 cursor-pointer text-muted"
        />
      </Link>
      <AiOutlineDelete
        size="1.3rem"
        className="mx-1 cursor-pointer text-danger"
        onClick={() => handleDeleteService({ id })}
      />
    </div>
  );
};

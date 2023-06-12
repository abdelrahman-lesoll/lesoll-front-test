import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Image from "../../Shared/Image";

export const Columns = [
  {
    Header: "#",
    accessor: (_row, i) => i + 1,
  },
  {
    Header: "Customer",
    accessor: "fullname",
    Cell: ({ row }) => (
      <Link
        to={`/Admin/Realties/User/${row.original._id}`}
        className="d-flex align-items-center justify-content-center"
      >
        <Image
          imageUrl={row.original.image}
          className="mw-100 table-img border-radius-5"
          height="40"
          width="40"
        />
        <div className="mx-2">
          <h6
            className="m-1 mb-0 font-13 main-text"
            title={row.original.fullname}
          >
            {row.original.fullname.slice(0, 15)}
          </h6>
          <span
            className="mb-0 font-11 text-dark-grey"
            title={row.original.email}
          >
            {row.original.email.slice(0, 20)}
          </span>
        </div>
      </Link>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={`shadow py-1 px-3 bg-light-grey rounded-pill text-white ${
          value === "Confirmed" ? "bg-success" : "bg-danger"
        } font-14`}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Realties",
    accessor: "numRealty",
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
      <Link to={`/Admin/User-Detail/${row.original._id}`}>
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

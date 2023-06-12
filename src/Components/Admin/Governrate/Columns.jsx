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
    Header: "Image",
    accessor: "image",
    Cell: ({ value }) => (
      <Image
        imageUrl={value}
        className="mw-100 table-img border-radius-5"
        height="40"
        width="40"
      />
    ),
  },
  {
    Header: "Title in English ",
    accessor: "title.en",
  },
  {
    Header: "Title in Arabic ",
    accessor: "title.ar",
  },
  {
    Header: "Realties",
    accessor: "realties.length",
  },
  {
    Header: "Action",
    Cell: ({ row }) => <Action id={row.original._id} />,
  },
];

const Action = ({ id }) => {
  const { locale } = useContext(LangContext);
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Update-Governrate/${id}`}>
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

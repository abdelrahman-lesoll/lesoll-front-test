import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatchContacts } from "../../Hooks/useContact";

export const Columns = [
  {
    Header: "#",
    accessor: (_row, i) => i + 1,
  },
  {
    Header: "Fullname",
    accessor: "fullname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Message",
    accessor: "message",
    Cell: ({ value }) => <span>{value.slice(0, 35)}</span>,
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
  const { handleDeleteContact } = useDispatchContacts();
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Contacts/${id}`}>
        <AiOutlineEye
          size="1.3rem"
          className="mx-1 cursor-pointer text-muted"
        />
      </Link>
      <AiOutlineDelete
        size="1.3rem"
        className="mx-1 cursor-pointer text-danger"
        onClick={() => handleDeleteContact({ id })}
      />
    </div>
  );
};

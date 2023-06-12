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
    Header: "Buyer",
    accessor: "buyer.fullname",
  },
  {
    Header: "Seller",
    accessor: "seller.fullname",
  },
  {
    Header: "Time",
    accessor: "time",
    Cell: ({ value }) => {
      return (
        <span className="text-icon">{`${new Date(
          value
        ).toDateString()} : ${new Date(value).toLocaleTimeString()}`}</span>
      );
    },
  },
  {
    Header: "Action",
    Cell: () => <Action />,
  },
];

const Action = () => {
  const { locale } = useContext(LangContext);
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to="#">
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

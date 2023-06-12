import { useContext, useState } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { useRealty } from "../../Hooks/useRealty";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Image from "../../Shared/Image";
import Confirmation from "../../Modals/Confirmation";
import { FormattedMessage } from "react-intl";

export const Columns = [
  {
    Header: "#",
    accessor: (_row, i) => i + 1,
  },
  {
    Header: "Image",
    accessor: "album[0].image",
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
    Header: "Title",
    accessor: "title",
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 25)}
        {`${value.length > 25 ? "..." : ""}`}
      </span>
    ),
  },
  {
    Header: "Offer",
    accessor: "offer",
    Cell: ({ value }) => (
      <span
        className={`shadow font-14 py-1 px-3 border-radius-5 text-white  ${
          value === "For Rent" ? "bg-icon" : "bg-dark-grey"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={`font-14 bg-white shadow rounded-pill py-1 px-4 ${
          value === "Pending"
            ? "text-primary"
            : value === "Confirmed"
            ? "text-success"
            : "text-danger"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Area",
    accessor: "area",
  },
  {
    Header: window.location.href.endsWith("/Deleted")
      ? "Deleted At"
      : "Date Created",
    accessor: window.location.href.endsWith("/Deleted")
      ? "deletedAt"
      : "createdAt",
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
  const [delConfirmation, setDelConfirmation] = useState(false);
  const { handleDeleteRealty } = useRealty();
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Realties/Detail/${row.original._id}`}>
        <AiOutlineEdit
          size="1.3rem"
          className="mx-1 cursor-pointer text-primary"
        />
      </Link>
      <AiOutlineDelete
        size="1.3rem"
        className="mx-1 cursor-pointer text-danger"
        onClick={() => setDelConfirmation(true)}
      />
      <Confirmation
        confirmation={delConfirmation}
        setConfirmation={setDelConfirmation}
        messageBody={<FormattedMessage id="DeleteRealtyConfirmation" />}
        execute={() =>
          handleDeleteRealty({
            id: row.original._id,
            user: row.original.user,
            album: row.original.album,
            oldGovernrate: row.original.governrate,
          })
        }
      />
    </div>
  );
};

import { LangContext } from "../../../Languages/LanguageProvider";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useContext } from "react";
import { useBlogs } from "../../Hooks/useBlog";
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
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 30)}
        {value.length > 30 ? "..." : ""}
      </span>
    ),
  },
  {
    Header: "Title in Arabic ",
    accessor: "title.ar",
    Cell: ({ value }) => (
      <span title={value}>
        {value.slice(0, 30)}
        {value.length > 30 ? "..." : ""}
      </span>
    ),
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    Cell: ({ value }) => (
      <span className="text-icon">{new Date(value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <Action id={row.original.slug} oldImage={row.original.image} />
    ),
  },
];

const Action = ({ id, oldImage }) => {
  const { locale } = useContext(LangContext);
  const { handleDeleteBlog } = useBlogs();
  return (
    <div className={locale === "en-US" ? "text-end" : "text-start"}>
      <Link to={`/Admin/Update-Blog/${id}`}>
        <AiOutlineEdit
          size="1.3rem"
          className="mx-1 cursor-pointer text-muted"
        />
      </Link>
      <AiOutlineDelete
        size="1.3rem"
        className="mx-1 cursor-pointer text-danger"
        onClick={() => handleDeleteBlog({ id, oldImage })}
      />
    </div>
  );
};

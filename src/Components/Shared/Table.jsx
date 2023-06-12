import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { TableCheckBox } from "./TableCheckBox";
import { GlobalFilter } from "./Filteration";
import { useContext } from "react";
import { LangContext } from "../../Languages/LanguageProvider";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const Table = ({ data, columns, title }) => {
  const { locale } = useContext(LangContext);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    selectedFlatRows,
  } = useTable(
    { data, columns },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <TableCheckBox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <TableCheckBox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );
  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap pb-2">
        <h4 className="mb-0">{title}</h4>
        <GlobalFilter
          filter={state.globalFilter}
          setFilter={setGlobalFilter}
          selectedFlatRows={selectedFlatRows}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-hover w-100" {...getTableProps()}>
          <thead className="bg-secondary bg-opacity-75 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`${
                      index === headerGroup.headers.length - 1
                        ? locale === "en-US"
                          ? "text-end"
                          : "text-start"
                        : index !== 0 && index !== 1 && "text-center"
                    }`}
                  >
                    <span>{column.render("Header")}</span>
                    <span className={`${index !== 0 && "ms-2"}`}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <AiOutlineSortDescending size="1.1rem" />
                        ) : (
                          <AiOutlineSortAscending size="1.1rem" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => (
                    <td
                      {...cell.getCellProps()}
                      className={`${
                        index !== 0 && index !== 1 && "text-center"
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="custom-table-pages">
            <span>Go To Page {` `}</span>
            <input
              type="number"
              className="outline-0 border py-1 px-3 border-radius-5 me-2 width-15 text-center"
              value={state.pageIndex + 1}
              onChange={(e) =>
                gotoPage(e.target.value ? Number(e.target.value) - 1 : 0)
              }
            />
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="outline-0 border bg-light-grey py-1 px-2 border-radius-5 me-2 text-dark-grey"
            >
              <BiChevronsLeft />
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="outline-0 border bg-light-grey py-1 px-2 border-radius-5 me-2 text-dark-grey"
            >
              <BiChevronLeft />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="outline-0 border bg-light-grey py-1 px-2 border-radius-5 me-2 text-dark-grey"
            >
              <BiChevronRight />
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="outline-0 border bg-light-grey py-1 px-2 border-radius-5 me-2 text-dark-grey"
            >
              <BiChevronsRight />
            </button>
          </div>
          <div className="custom-table-curent-page">
            Page {` `} {state.pageIndex + 1} of {pageOptions.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

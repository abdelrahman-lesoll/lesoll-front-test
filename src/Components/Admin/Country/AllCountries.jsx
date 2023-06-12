import { useCountry } from "../../Hooks/useCountry";
import { FullLoading } from "../../Shared/Loading";
import { Table, Pagination } from "react-bootstrap";
import { useState, Fragment } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "../../Shared/Image";

function AllCountries() {
  const [page, setPage] = useState(1);
  const { state, handleAdminCountry } = useCountry("admin-countries", { page });
  if (state.loading) {
    return <FullLoading />;
  }
  return (
    <div className="p-5">
      <h3>All Countries </h3>
      <Table responsive striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span>Image</span>
            </th>
            <th>
              <span>Title English</span>
            </th>
            <th>
              <span>Title Arabic</span>
            </th>
            <th>
              <span>Code</span>
            </th>
            <th>
              <span>Date Created</span>
            </th>
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {state.adminCountries.map((country, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Image
                  imageUrl={country.image}
                  height="35"
                  width="35"
                  className="border-radius-10 text-center"
                />
              </td>
              <td>
                <span>{country.title.en}</span>
              </td>
              <td>
                <span>{country.title.ar}</span>
              </td>
              <td>
                <span>{country.code}</span>
              </td>
              <td>
                <span>{new Date(country.createdAt).toLocaleDateString()}</span>
              </td>
              <td>
                <div>
                  <AiOutlineEdit
                    size="1.3rem"
                    className="mx-1 cursor-pointer text-muted"
                  />
                  <AiOutlineDelete
                    size="1.3rem"
                    className="mx-1 cursor-pointer text-danger"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          disabled={page === 1}
          onClick={() => {
            setPage(1);
            handleAdminCountry({ page: 1 });
          }}
        />
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
            handleAdminCountry({ page: page - 1 });
          }}
        />
        <Fragment>
          <Pagination.Item disabled>{page}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item
            disabled={page === state.nPages}
            onClick={() => {
              setPage(state.nPages);
              handleAdminCountry({ page: state.nPages });
            }}
          >
            {state.nPages}
          </Pagination.Item>
        </Fragment>
        <Pagination.Next
          disabled={page === state.nPages}
          onClick={() => {
            setPage(page + 1);
            handleAdminCountry({ page: page + 1 });
          }}
        />
        <Pagination.Last
          disabled={page === state.nPages}
          onClick={() => {
            setPage(state.nPages);
            handleAdminCountry({ page: state.nPages });
          }}
        />
      </Pagination>
    </div>
  );
}

export default AllCountries;

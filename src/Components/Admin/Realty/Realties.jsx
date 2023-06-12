import { useRealty } from "../../Hooks/useRealty";
import { FullLoading } from "../../Shared/Loading";
import { Link } from "react-router-dom";
import { Table, Pagination, Form } from "react-bootstrap";
import { useState, Fragment } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "../../Shared/Image";

const Realties = () => {
  const [page, setPage] = useState(1);
  const { state, handleFindAdminRealty } = useRealty("admin-realty");

  if (state.loading) {
    return <FullLoading />;
  }

  return (
    <div className="p-5">
      <h3>All Realties </h3>
      <Table responsive striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span>Image</span>
            </th>
            <th>
              <span>Title</span>
            </th>
            <th>
              <span>Offer</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>Area</span>
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
          {state.adminRealty.map((realty, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Image
                  imageUrl={realty.image}
                  height="35"
                  width="35"
                  className="border-radius-10 text-center"
                />
              </td>
              <td>
                <span title={realty.title}>
                  {realty.title.slice(0, 20)}
                  {realty.title.length >= 20 && "..."}
                </span>
              </td>
              <td>
                <span>{realty.offer}</span>
              </td>
              <td>
                <span>{realty.price}</span>
              </td>
              <td>
                <span>{realty.area}</span>
              </td>
              <td>
                <span>{new Date(realty.createdAt).toLocaleDateString()}</span>
              </td>
              <td>
                <div>
                  <Link to={`/Admin/Realties/Detail/${realty._id}`}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <Pagination style={{ marginBottom: "0" }}>
          <Pagination.First
            disabled={page === 1}
            onClick={() => {
              setPage(1);
              handleFindAdminRealty({ page: 1 });
            }}
          />
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              handleFindAdminRealty({ page: page - 1 });
            }}
          />
          <Fragment>
            <Pagination.Item disabled>{page}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item
              disabled={page === state.nPages}
              onClick={() => {
                setPage(state.nPages);
                handleFindAdminRealty({ page: state.nPages });
              }}
            >
              {state.nPages}
            </Pagination.Item>
          </Fragment>
          <Pagination.Next
            disabled={page === state.nPages}
            onClick={() => {
              setPage(page + 1);
              handleFindAdminRealty({ page: page + 1 });
            }}
          />
          <Pagination.Last
            disabled={page === state.nPages}
            onClick={() => {
              setPage(state.nPages);
              handleFindAdminRealty({ page: state.nPages });
            }}
          />
        </Pagination>
        <Form.Select
          style={{ width: "100px" }}
          onChange={(e) => {
            handleFindAdminRealty({ page: e.target.value });
            setPage(Number(e.target.value));
          }}
        >
          {[...Array(state.nPages).keys()].map((index) => (
            <option key={index} defaultValue={page} value={`${index + 1}`}>
              Page {index + 1}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};

export default Realties;
